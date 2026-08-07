import { Mail } from "lucide-react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const socials = [
  {
    icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/devwithprakash",
  },
  {
    icon: FaXTwitter,
    label: "Twitter",
    href: "https://x.com/risewithprakash",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/devwithprakash",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:prakashjangid7357@gmail.com",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0d0d0d] w-full" aria-label="Site footer">
      <div className="max-w-4xl mx-auto px-5">
        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-5 py-10 flex flex-col items-center gap-6">
        <p className="text-xs font-mono text-white/30 tracking-wide">
          Built with curiosity by{" "}
          <span
            className="nav-logo text-sm  sm:text-lg font-bold tracking-tight hover:opacity-75 transition-opacity select-none"
            style={{ fontFamily: "var(--font-logo)" }}
          >
            Prakash
          </span>
        </p>

        <div className="flex items-center gap-1">
          {socials.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target={label === "Email" ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-white/30 hover:text-white hover:bg-white/8 transition-all duration-200"
            >
              <Icon size={15} />
            </a>
          ))}
        </div>

        <p className="text-[11px] font-mono text-white/18">© {year}</p>
      </div>
    </footer>
  );
}
