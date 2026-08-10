"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  href: string;
  repo: string;
}

const projects: Project[] = [
  {
    title: "Kanso",
    description:
      "Kanso is a modern form builder built with a monorepo and tRPC, offering a clean, intuitive interface to create forms with beautiful themes.",
    tags: ["Next.js", "Postgres", "TypeScript", "tRPC"],
    image: "/images/kanso-ss.png",
    href: "https://kanso.prakashjangid.in",
    repo: "https://github.com/devwithprakash/kanso",
  },
  {
    title: "Miraivote",
    description:
      "MiraiVote is a real-time polling application built with WebSockets for instant vote updates and seamless user interaction.",
    tags: ["React", "Nodejs", "MongoDB", "Socket.IO"],
    image: "/images/miraivote-ss.png",
    href: "https://miraivote.vercel.app",
    repo: "https://github.com/devwithprakash/miraivote",
  },
  {
    title: "Orion",
    description:
      "AI-powered productivity workspace that integrates Gmail and Google Calendar, allowing users to manage emails, schedule events, and interact with an AI agent from a unified interface.",
    tags: ["Next.js", "PostgreSQL", "Prisma", "Corsair"],
    image: "/images/orion-ss.png",
    href: "https://orion.prakashjangid.in",
    repo: "https://github.com/devwithprakash/Orion",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="bg-[#0d0d0d] w-full"
      aria-label="Projects section"
    >
      <div className="max-w-4xl mx-auto px-5 py-8 border-b border-white/5">
        <h2 className="text-xl sm:text-2xl font-bold font-mono text-white mb-1">
          Projects
        </h2>
        <p className="text-[0.65rem] sm:text-xs font-mono font-semibold tracking-widest text-white/35 uppercase mb-6">
          Things I&apos;ve built
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((project) => (
            <article
              key={project.title}
              className="project-card group flex flex-col rounded-xl border overflow-hidden transition-all duration-300"
            >
              <div className="relative w-full aspect-video overflow-hidden project-card-img-wrap">
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col flex-1 p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="project-card-title text-sm font-semibold font-mono leading-snug">
                    {project.title}
                  </h3>
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
                    <span
                      key={tag}
                      className="project-card-tag px-2 py-0.5 text-[10px] font-mono border rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-5 flex justify-end">
          <a
            href="/projects"
            className="text-xs font-mono text-white/35 hover:text-white/70 transition-colors duration-200"
          >
            View all projects →
          </a>
        </div>
      </div>
    </section>
  );
}
