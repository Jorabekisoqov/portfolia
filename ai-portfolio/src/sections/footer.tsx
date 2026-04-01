type FooterProps = {
  githubUrl?: string;
};

export function Footer({ githubUrl }: FooterProps) {
  return (
    <footer className="border-t border-white/10 py-10 text-center text-xs text-zinc-500">
      <p>Made with 💻, ☕, and Patience</p>
      {githubUrl ? (
        <p className="mt-3">
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="text-cyan-500/80 underline-offset-4 transition hover:text-cyan-400 hover:underline"
          >
            GitHub profile
          </a>
        </p>
      ) : null}
    </footer>
  );
}
