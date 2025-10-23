"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Send } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-3xl px-6 py-24 md:py-32">
      <h2 className="text-center text-3xl font-semibold text-white md:text-4xl">
        Contact
      </h2>

      <motion.form
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.4 }}
        className="mt-10 space-y-4 rounded-2xl border border-cyan-400/20 bg-white/5 p-6 backdrop-blur"
        onSubmit={(e) => {
          e.preventDefault();
          const data = Object.fromEntries(new FormData(e.currentTarget).entries());
          fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          })
            .then(() => alert("Thanks! I'll get back to you soon."))
            .catch(() => alert("Something went wrong."));
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm text-zinc-400">Name</label>
            <input
              name="name"
              required
              className="mt-1 w-full rounded-lg border border-cyan-400/20 bg-black/40 px-3 py-2 text-sm text-zinc-200 outline-none ring-cyan-300/30 backdrop-blur placeholder:text-zinc-500 focus:ring-2"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="text-sm text-zinc-400">Email</label>
            <input
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-lg border border-cyan-400/20 bg-black/40 px-3 py-2 text-sm text-zinc-200 outline-none ring-cyan-300/30 backdrop-blur placeholder:text-zinc-500 focus:ring-2"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div>
          <label className="text-sm text-zinc-400">Message</label>
          <textarea
            name="message"
            required
            rows={5}
            className="mt-1 w-full rounded-lg border border-cyan-400/20 bg-black/40 px-3 py-2 text-sm text-zinc-200 outline-none ring-cyan-300/30 backdrop-blur placeholder:text-zinc-500 focus:ring-2"
            placeholder="Tell me about your project..."
          />
        </div>
        <button
          type="submit"
          className="group inline-flex items-center gap-2 rounded-full bg-cyan-500/20 px-5 py-3 text-sm font-medium text-cyan-200 ring-1 ring-cyan-400/30 transition hover:bg-cyan-400/25 hover:text-white hover:ring-cyan-300/50"
        >
          Send message
          <Send size={16} className="transition group-hover:-translate-y-0.5" />
        </button>
      </motion.form>

      <div className="mt-8 flex justify-center gap-4">
        <a
          href="https://github.com/your-profile"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Github size={16} /> GitHub
        </a>
        <a
          href="https://linkedin.com/in/your-profile"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Linkedin size={16} /> LinkedIn
        </a>
        <a
          href="https://t.me/your-handle"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
          target="_blank"
          rel="noreferrer noopener"
        >
          @ Telegram
        </a>
      </div>
    </section>
  );
}
