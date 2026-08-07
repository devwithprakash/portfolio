const skillGroups = [
  {
    category: "LANGUAGES",
    skills: ["TypeScript", "JavaScript", "SQL"],
  },
  {
    category: "FRONTEND",
    skills: ["React", "Next.js", "shadcn/ui", "Tailwind CSS"],
  },
  {
    category: "BACKEND",
    skills: ["Node.js", "Express.js"],
  },
  {
    category: "DATABASE",
    skills: ["PostgreSQL", "MongoDB", "Prisma", "Drizzle", "Mongoose"],
  },
  {
    category: "TOOLS",
    skills: ["Docker", "Git", "Github", "Postman"],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="bg-[#0d0d0d] w-full"
      aria-label="Skills section"
    >
      <div className="max-w-4xl mx-auto px-5 py-8 border-b border-white/5">
        <h2 className="text-xl sm:text-2xl font-bold font-mono text-white mb-6">
          Skills
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
          {skillGroups.map((group) => (
            <div key={group.category}>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 flex-shrink-0" />
                <span className="text-[0.7rem] font-mono font-semibold tracking-widest text-white/40 uppercase">
                  {group.category}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm font-mono text-white/75 bg-transparent border border-white/12 rounded-md
                               hover:border-white/30 hover:text-white transition-all duration-200 cursor-default select-none"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
