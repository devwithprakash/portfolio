"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";

interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  href: string;
  repo: string;
  featured?: boolean;
}

const allProjects: Project[] = [
  {
    title: "Kanso",
    description:
      "Kanso is a modern form builder built with a monorepo and tRPC, offering a clean, intuitive interface to create forms with beautiful themes.",
    tags: ["Next.js", "Postgres", "TypeScript", "tRPC"],
    image: "/images/kanso-ss.png",
    href: "https://kanso.prakashjangid.in",
    repo: "https://github.com/devwithprakash/kanso",
    featured: true,
  },
  {
    title: "Miraivote",
    description:
      "MiraiVote is a real-time polling application built with WebSockets for instant vote updates and seamless user interaction.",
    tags: ["React", "Nodejs", "MongoDB", "Socket.IO"],
    image: "/images/miraivote-ss.png",
    href: "https://miraivote.vercel.app",
    repo: "https://github.com/devwithprakash/miraivote",
    featured: true,
  },
];

export default function ProjectsPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? allProjects.filter((p) => p.tags.includes(activeTag))
    : allProjects;

  return (
    <main className="min-h-screen bg-[#0d0d0d]">
      <Navbar />

      <div className="pt-14">
        <div className="max-w-4xl mx-auto px-5 py-10">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-white/35 hover:text-white/70 transition-colors duration-200 mb-6"
            >
              <ArrowLeft size={13} />
              Back to home
            </Link>

            <h1 className="text-xl sm:text-2xl font-bold font-mono text-white mb-1">
              All Projects
            </h1>
            <p className="text-[0.65rem] sm:text-xs font-mono font-semibold tracking-widest text-white/35 uppercase">
              Things I&apos;ve built
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((project) => (
              <article
                key={project.title}
                className="project-card group flex flex-col rounded-xl border overflow-hidden transition-all duration-300"
              >
                {/* Image */}
                <div className="relative w-full aspect-video overflow-hidden project-card-img-wrap">
                  <Image
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col flex-1 p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h2 className="project-card-title text-sm font-semibold font-mono leading-snug">
                      {project.title}
                    </h2>
                    <div className="flex items-center gap-1 flex-shrink-0 -mt-0.5">
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} repository`}
                        className="project-card-icon w-7 h-7 flex items-center justify-center rounded-md transition-all duration-200"
                      >
                        <FaGithub size={16} />
                      </a>
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} live demo`}
                        className="project-card-icon w-7 h-7 flex items-center justify-center rounded-md transition-all duration-200"
                      >
                        <ExternalLink size={15} />
                      </a>
                    </div>
                  </div>

                  <p className="project-card-desc text-xs sm:text-[0.8rem] leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() =>
                          setActiveTag(activeTag === tag ? null : tag)
                        }
                        className={`project-card-tag px-2 py-0.5 text-[10px] font-mono border rounded transition-colors duration-200 ${
                          activeTag === tag
                            ? "!opacity-100 !border-white/30 !text-white/80"
                            : ""
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-white/30 text-xs font-mono py-16">
              No projects match this filter.
            </p>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
