type FooterProps = {
  githubUrl?: string;
};

export function Footer({ githubUrl }: FooterProps) {
  return (
    <footer className="border-t border-zinc-200 py-10 text-center text-xs text-zinc-500 dark:border-white/10">
      <p>Made with 💻, ☕, and Patience</p>
      {githubUrl ? (
        <p className="mt-3">
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="text-cyan-700 underline-offset-4 transition hover:text-cyan-600 hover:underline dark:text-cyan-500/80 dark:hover:text-cyan-400"
          >
            GitHub profile
          </a>
        </p>
      ) : null}
    </footer>
  );
}
