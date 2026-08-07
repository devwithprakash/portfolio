import { Award, ExternalLink } from "lucide-react";

const certificates = [
  {
    title: "Web Dev Cohort 2026",
    issuer: "ChaiCode",
    date: "July 2026",
    href: "/images/web-dev-cohort.png",
  },
];

export default function Certificates() {
  return (
    <section
      id="certificates"
      className="bg-[#0d0d0d] w-full"
      aria-label="Certificates section"
    >
      <div className="max-w-4xl mx-auto px-5 py-8 border-b border-white/5">
        <h2 className="text-xl sm:text-2xl font-bold font-mono text-white mb-1">
          Certificates
        </h2>
        <p className="text-[0.65rem] sm:text-xs font-mono font-semibold tracking-widest text-white/35 uppercase mb-6">
          Courses &amp; credentials
        </p>

        <div className="flex flex-col divide-y divide-white/5">
          {certificates.map((cert) => (
            <div
              key={cert.title}
              className="cert-row group py-4 flex items-center gap-4 -mx-2 px-2 rounded-lg transition-colors duration-200"
            >
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-amber-400/12 border border-amber-400/30 text-amber-400 group-hover:bg-amber-400/20 group-hover:border-amber-400/50 transition-all duration-200">
                  <Award size={17} strokeWidth={1.8} />
                </div>
                <span className="absolute inset-0 rounded-xl bg-amber-400/10 blur-sm group-hover:bg-amber-400/20 transition-all duration-200 -z-10" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="cert-title text-sm font-medium font-mono transition-colors truncate">
                  {cert.title}
                </p>
                <p className="cert-issuer text-xs mt-0.5 font-mono truncate">
                  {cert.issuer}
                </p>
              </div>

              <div className="flex-shrink-0 flex items-center gap-3">
                <span className="cert-date hidden sm:block text-xs font-mono">
                  {cert.date}
                </span>
                <a
                  href={cert.href}
                  aria-label={`View certificate: ${cert.title}`}
                  className="cert-link w-7 h-7 flex items-center justify-center rounded-md transition-all duration-200"
                >
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
