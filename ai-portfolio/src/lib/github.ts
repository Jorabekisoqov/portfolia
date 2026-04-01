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

  let demo: string | null = null;
  if (repo.homepage) {
    try {
      const u = new URL(repo.homepage);
      if (u.protocol === "http:" || u.protocol === "https:") demo = repo.homepage;
    } catch {
      demo = null;
    }
  }

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

  const [repos, contributionsTotal] = await Promise.all([
    fetchAllRepos(username),
    fetchContributionsTotal(username, token),
  ]);

  const filtered = repos.filter(
    (r) =>
      !r.fork &&
      !r.archived &&
      !isLikelyProfileReadmeRepo(r, user.login)
  );

  const projects = filtered.map(repoToProject);

  return {
    profileUrl: user.html_url,
    projectCount: projects.length,
    contributionsTotal,
    yearsOnGitHub: fullYearsSince(user.created_at),
    projects,
  };
}
