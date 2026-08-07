"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Send, ArrowLeft, CheckCircle2, Loader2, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";

type FormState = "idle" | "loading" | "success" | "error";

const socials = [
  {
    icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/devwithprakash",
  },
  { icon: FaXTwitter, label: "Twitter", href: "https://x.com/risewithprakash" },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/devwithprakash",
  },
  { icon: Mail, label: "Email", href: "mailto:prakashjangid7357@gmail.com" },
];

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const validate = () => {
    const errs: Partial<typeof form> = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email.";
    if (!form.message.trim()) errs.message = "Message is required.";
    return errs;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setFormState("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (data.success) {
        setFormState("success");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name as keyof typeof errors])
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  return (
    <main className="min-h-screen bg-[#0d0d0d] flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col pt-14">
        <div className="max-w-4xl mx-auto w-full px-5 py-10 sm:py-14 flex-1 flex flex-col">
          <Link
            href="/"
            className="contact-back inline-flex items-center gap-1.5 text-xs font-mono transition-colors duration-200 mb-10 group w-fit"
          >
            <ArrowLeft
              size={12}
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            Back home
          </Link>

          {formState === "success" ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full border border-emerald-400/25 bg-emerald-400/8 flex items-center justify-center mb-5">
                <CheckCircle2 size={22} className="text-emerald-400" />
              </div>
              <h1 className="contact-heading text-xl sm:text-2xl font-bold font-mono mb-2">
                Message sent!
              </h1>
              <p className="contact-sub text-sm font-mono max-w-xs leading-relaxed mb-6">
                I&apos;ll get back to you shortly.
              </p>
              <button
                onClick={() => {
                  setFormState("idle");
                  setForm({ name: "", email: "", message: "" });
                }}
                className="contact-link text-xs font-mono underline underline-offset-4 transition-colors duration-200"
              >
                Send another message
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 flex-1 items-start md:items-center">
              <div className="flex flex-col gap-6">
                <div>
                  <p className="contact-eyebrow text-[0.65rem] font-mono font-semibold tracking-widest uppercase mb-2">
                    Get in touch
                  </p>
                  <h1 className="contact-heading text-2xl sm:text-3xl font-bold font-mono leading-tight">
                    Let&apos;s connect.
                  </h1>
                  <p className="contact-sub text-sm font-mono leading-relaxed mt-3 max-w-xs">
                    Open to internships, freelance work, and interesting ideas.
                    Drop me a line — I read every message.
                  </p>
                </div>

                <div className="flex flex-col gap-2.5">
                  {socials.map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-social inline-flex items-center gap-2.5 text-xs font-mono transition-colors duration-200 group w-fit"
                    >
                      <span className="contact-social-icon w-7 h-7 flex items-center justify-center rounded-md border transition-all duration-200">
                        <Icon size={13} />
                      </span>
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-name"
                      className="contact-label text-xs font-mono tracking-wide"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      className={`contact-input w-full border rounded-lg px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-1 transition-all duration-200 ${
                        errors.name
                          ? "border-red-400/40 focus:ring-red-400/25"
                          : "focus:ring-white/15 focus:border-white/20"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[0.7rem] font-mono text-red-400/80">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-email"
                      className="contact-label text-xs font-mono tracking-wide"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className={`contact-input w-full border rounded-lg px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-1 transition-all duration-200 ${
                        errors.email
                          ? "border-red-400/40 focus:ring-red-400/25"
                          : "focus:ring-white/15 focus:border-white/20"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[0.7rem] font-mono text-red-400/80">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-message"
                      className="contact-label text-xs font-mono tracking-wide"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      placeholder="What's on your mind?"
                      value={form.message}
                      onChange={handleChange}
                      className={`contact-input w-full border rounded-lg px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-1 transition-all duration-200 resize-none ${
                        errors.message
                          ? "border-red-400/40 focus:ring-red-400/25"
                          : "focus:ring-white/15 focus:border-white/20"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[0.7rem] font-mono text-red-400/80">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-4 pt-1">
                    <button
                      type="submit"
                      id="contact-submit-btn"
                      disabled={formState === "loading"}
                      className="contact-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold font-mono active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {formState === "loading" ? (
                        <>
                          <Loader2 size={13} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={13} />
                          Send Message
                        </>
                      )}
                    </button>
                    {formState === "error" && (
                      <p className="text-xs font-mono text-red-400/80">
                        Something went wrong. Try again.
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
