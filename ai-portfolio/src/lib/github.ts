export type PortfolioProject = {
  title: string;
  description: string;
  stack: string[];
  github: string;
  demo: string | null;
};

type GitHubUser = {
  login: string;
  html_url: string;
  public_repos: number;
  created_at: string;
};

type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  fork: boolean;
  archived: boolean;
  updated_at: string;
  owner: { login: string };
};

const GITHUB_API = "https://api.github.com";

function githubHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

function parseNextUrl(linkHeader: string | null): string | null {
  if (!linkHeader) return null;
  const parts = linkHeader.split(",");
  for (const part of parts) {
    const m = part.match(/<([^>]+)>;\s*rel="next"/);
    if (m) return m[1];
  }
  return null;
}

function humanizeRepoName(name: string): string {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function isLikelyProfileReadmeRepo(repo: GitHubRepo, login: string): boolean {
  return (
    repo.name === login &&
    (repo.description?.toLowerCase().includes("config") ||
      repo.description?.toLowerCase().includes("github profile") ||
      repo.topics.includes("github-config"))
  );
}

/** Coursework / labs / assignments — excluded from the portfolio grid and LOC sum. */
function isLikelyAssignmentOrLab(repo: GitHubRepo): boolean {
  const n = repo.name.toLowerCase();
  const d = (repo.description ?? "").toLowerCase();

  const nameHints =
    /^lab\d+/i.test(repo.name) ||
    /\blab\d+\b/i.test(n) ||
    /(^|_)lab($|_)/i.test(n) ||
    /\bcs\d{3}\b/i.test(n) ||
    /assignment|homework|coursework|midterm|_hw\d|\bhw\d/i.test(n) ||
    /^mp[_-]?lab/i.test(n) ||
    /\bweek\d+\b.*assign/i.test(n);

  if (nameHints) return true;

  const descHints =
    /\bfor the course\b|\bcourse called\b|\bweek \d+ assignment\b|\bhomework \d/i.test(
      d
    ) ||
    /this repository designed to create/i.test(d) ||
    /\bassignment\b.*\bcourse\b/i.test(d);

  return descHints;
}

function repoToProject(repo: GitHubRepo): PortfolioProject {
  const description =
    repo.description?.trim() ||
    "Open-source repository on GitHub.";
  const stack =
    repo.topics.length > 0
      ? repo.topics.slice(0, 5)
      : repo.language
        ? [repo.language]
        : ["GitHub"];

  const isIeltsMock =
    /^ielts[-_]?mock/i.test(repo.name) ||
    /ielts.*mock.*platform/i.test(repo.name);

  const demo: string | null = isIeltsMock ? "https://examuz.uz" : null;

  return {
    title: humanizeRepoName(repo.name),
    description,
    stack,
    github: repo.html_url,
    demo,
  };
}

function fullYearsSince(isoDate: string): number {
  const start = new Date(isoDate);
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  const m = now.getMonth() - start.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < start.getDate())) years -= 1;
  return Math.max(1, years);
}

async function fetchAllRepos(username: string): Promise<GitHubRepo[]> {
  const headers = githubHeaders();
  const out: GitHubRepo[] = [];
  let url: string | null =
    `${GITHUB_API}/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated&type=owner`;

  while (url) {
    const res = await fetch(url, { headers, next: { revalidate: 3600 } });
    if (!res.ok) {
      throw new Error(`GitHub repos fetch failed: ${res.status}`);
    }
    const page = (await res.json()) as GitHubRepo[];
    out.push(...page);
    url = parseNextUrl(res.headers.get("Link"));
  }

  return out;
}

async function fetchRepoLanguageBytes(
  owner: string,
  repo: string,
  headers: HeadersInit
): Promise<number> {
  const res = await fetch(
    `${GITHUB_API}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/languages`,
    { headers, next: { revalidate: 3600 } }
  );
  if (!res.ok) return 0;
  const langs = (await res.json()) as Record<string, number>;
  return Object.values(langs).reduce((sum, b) => sum + b, 0);
}

/** ~bytes per line of source (heuristic for GitHub language byte totals). */
const BYTES_PER_LINE = 42;

function formatLinesStat(approxLines: number): { displayEnd: number; suffix: string } {
  const lines = Math.max(0, Math.round(approxLines));
  if (lines < 1) return { displayEnd: 0, suffix: "" };
  if (lines >= 1_000_000) {
    return {
      displayEnd: Math.max(1, Math.round(lines / 1_000_000)),
      suffix: "M+",
    };
  }
  if (lines >= 1_000) {
    return {
      displayEnd: Math.max(1, Math.round(lines / 1_000)),
      suffix: "K+",
    };
  }
  return { displayEnd: lines, suffix: "" };
}

async function fetchContributionsTotal(
  login: string,
  token: string | undefined
): Promise<number | null> {
  if (!token) return null;

  const query = `
    query ($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
          }
        }
      }
    }
  `;

  const res = await fetch(`${GITHUB_API}/graphql`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { login } }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;

  const body = (await res.json()) as {
    data?: {
      user?: {
        contributionsCollection?: {
          contributionCalendar?: { totalContributions?: number };
        };
      };
    };
    errors?: unknown;
  };

  if (body.errors) return null;

  const total =
    body.data?.user?.contributionsCollection?.contributionCalendar
      ?.totalContributions;
  return typeof total === "number" ? total : null;
}

export type GitHubPortfolioData = {
  profileUrl: string;
  projectCount: number;
  contributionsTotal: number | null;
  yearsOnGitHub: number;
  linesDisplayEnd: number;
  linesDisplaySuffix: string;
  projects: PortfolioProject[];
};

export async function getGitHubPortfolioData(): Promise<GitHubPortfolioData> {
  const username =
    process.env.GITHUB_USERNAME?.trim() || "isoqovjorabek2";
  const token = process.env.GITHUB_TOKEN?.trim();

  const userRes = await fetch(`${GITHUB_API}/users/${encodeURIComponent(username)}`, {
    headers: githubHeaders(),
    next: { revalidate: 3600 },
  });

  if (!userRes.ok) {
    throw new Error(`GitHub user fetch failed: ${userRes.status}`);
  }

  const user = (await userRes.json()) as GitHubUser;

  const headers = githubHeaders();

  const [repos, contributionsTotal] = await Promise.all([
    fetchAllRepos(username),
    fetchContributionsTotal(username, token),
  ]);

  const filtered = repos.filter(
    (r) =>
      !r.fork &&
      !r.archived &&
      !isLikelyProfileReadmeRepo(r, user.login) &&
      !isLikelyAssignmentOrLab(r)
  );

  const byteTotals = await Promise.all(
    filtered.map((r) =>
      fetchRepoLanguageBytes(r.owner.login, r.name, headers)
    )
  );
  const totalBytes = byteTotals.reduce((a, b) => a + b, 0);
  const approxLines = totalBytes / BYTES_PER_LINE;
  const { displayEnd: linesDisplayEnd, suffix: linesDisplaySuffix } =
    formatLinesStat(approxLines);

  const projects = filtered.map(repoToProject);

  return {
    profileUrl: user.html_url,
    projectCount: projects.length,
    contributionsTotal,
    yearsOnGitHub: fullYearsSince(user.created_at),
    linesDisplayEnd,
    linesDisplaySuffix,
    projects,
  };
}
