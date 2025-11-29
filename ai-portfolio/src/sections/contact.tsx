"use client";

import { animate } from "animejs";
import { Github, Linkedin, Send } from "lucide-react";
import { useEffect, useRef } from "react";

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const socialLinksRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (!sectionRef.current || animatedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;

            // Animate title
            if (titleRef.current) {
              if (titleRef.current) {
                titleRef.current.style.opacity = "0";
                titleRef.current.style.transform = "translateY(-30px)";
                animate(titleRef.current, {
                  opacity: 1,
                  translateY: 0,
                  duration: 800,
                  ease: "outExpo",
                });
              }
            }

            // Animate form
            if (formRef.current) {
              const inputs = formRef.current.querySelectorAll("input, textarea, button");
              Array.from(inputs).forEach((input, i) => {
                const el = input as HTMLElement;
                el.style.opacity = "0";
                el.style.transform = "translateY(30px)";
                animate(input, {
                  opacity: 1,
                  translateY: 0,
                  duration: 800,
                  delay: 300 + i * 100,
                  ease: "outExpo",
                });
              });
            }

            // Animate social links
            if (socialLinksRef.current) {
              const links = socialLinksRef.current.querySelectorAll("a");
              Array.from(links).forEach((link, i) => {
                const el = link as HTMLElement;
                el.style.opacity = "0";
                el.style.transform = "scale(0.8)";
                animate(link, {
                  opacity: 1,
                  scale: 1,
                  duration: 600,
                  delay: 800 + i * 100,
                  ease: "outBack",
                });
              });
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Add input focus animations
  useEffect(() => {
    const inputs = formRef.current?.querySelectorAll("input, textarea");
    if (!inputs) return;

    inputs.forEach((input) => {
      const handleFocus = () => {
              animate(input, {
          scale: 1.02,
          duration: 200,
          ease: "outQuad",
        });
      };

      const handleBlur = () => {
              animate(input, {
          scale: 1,
          duration: 200,
          ease: "outQuad",
        });
      };

      input.addEventListener("focus", handleFocus);
      input.addEventListener("blur", handleBlur);

      return () => {
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("blur", handleBlur);
      };
    });
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative mx-auto max-w-3xl px-6 py-24 md:py-32">
      <h2
        ref={titleRef}
        className="text-center text-3xl font-semibold text-white md:text-4xl"
        style={{ opacity: 0 }}
      >
        Contact
      </h2>

      <form
        ref={formRef}
        className="mt-10 space-y-4 rounded-2xl border border-cyan-400/20 bg-white/5 p-6 backdrop-blur"
        onSubmit={(e) => {
          e.preventDefault();
          const data = Object.fromEntries(new FormData(e.currentTarget).entries());
          
          // Animate button on submit
          const button = e.currentTarget.querySelector("button[type='submit']");
          if (button) {
              animate(button, {
              scale: 0.95,
              duration: 100,
            });
              setTimeout(() => {
                animate(button, {
                  scale: 1,
                  duration: 100,
                });
              }, 100);
          }

          fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          })
            .then(() => {
              // Success animation
              if (button) {
                animate(button, {
                  backgroundColor: "#10b981",
                  duration: 300,
                });
                setTimeout(() => {
                  animate(button, {
                    backgroundColor: "rgba(34, 211, 238, 0.2)",
                    duration: 300,
                  });
                }, 2000);
              }
              alert("Thanks! I'll get back to you soon.");
            })
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
              style={{ opacity: 0 }}
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
              style={{ opacity: 0 }}
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
            style={{ opacity: 0 }}
          />
        </div>
        <button
          type="submit"
          className="group inline-flex items-center gap-2 rounded-full bg-cyan-500/20 px-5 py-3 text-sm font-medium text-cyan-200 ring-1 ring-cyan-400/30 transition hover:bg-cyan-400/25 hover:text-white hover:ring-cyan-300/50"
          style={{ opacity: 0 }}
        >
          Send message
          <Send size={16} className="transition group-hover:-translate-y-0.5" />
        </button>
      </form>

      <div ref={socialLinksRef} className="mt-8 flex justify-center gap-4">
        <a
          href="https://github.com/isoqovjorabek2"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
          target="_blank"
          rel="noreferrer noopener"
          style={{ opacity: 0 }}
          onMouseEnter={(e) => {
              animate(e.currentTarget, {
              scale: 1.1,
              rotate: 5,
              duration: 200,
            });
          }}
          onMouseLeave={(e) => {
              animate(e.currentTarget, {
              scale: 1,
              rotate: 0,
              duration: 200,
            });
          }}
        >
          <Github size={16} /> GitHub
        </a>
        <a
          href="https://linkedin.com/in/your-profile"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
          target="_blank"
          rel="noreferrer noopener"
          style={{ opacity: 0 }}
          onMouseEnter={(e) => {
              animate(e.currentTarget, {
              scale: 1.1,
              rotate: -5,
              duration: 200,
            });
          }}
          onMouseLeave={(e) => {
              animate(e.currentTarget, {
              scale: 1,
              rotate: 0,
              duration: 200,
            });
          }}
        >
          <Linkedin size={16} /> LinkedIn
        </a>
        <a
          href="https://t.me/your-handle"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
          target="_blank"
          rel="noreferrer noopener"
          style={{ opacity: 0 }}
          onMouseEnter={(e) => {
              animate(e.currentTarget, {
              scale: 1.1,
              rotate: 5,
              duration: 200,
            });
          }}
          onMouseLeave={(e) => {
              animate(e.currentTarget, {
              scale: 1,
              rotate: 0,
              duration: 200,
            });
          }}
        >
          @ Telegram
        </a>
      </div>
    </section>
  );
}
