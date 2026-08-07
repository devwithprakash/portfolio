export default function Quote() {
  return (
    <section
      id="quote"
      className="bg-[#0d0d0d] w-full"
      aria-label="Quote section"
    >
      <div className="max-w-4xl mx-auto px-5 py-8 border-b border-white/5 flex flex-col items-center text-center">
        <blockquote className="relative max-w-xl">
          <span
            className="block text-6xl font-serif text-white/8 select-none leading-none mb-1"
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <p className="font-mono text-sm sm:text-base text-white/65 leading-relaxed italic -mt-2">
            There&apos;s no such thing as useless effort
          </p>

          <footer className="mt-4 flex items-center justify-center gap-2.5">
            <span className="w-6 h-px bg-white/15" />
            <cite className="not-italic text-[0.65rem] sm:text-xs font-mono text-white/35 tracking-wide">
              Taiga Kagami
            </cite>
            <span className="w-6 h-px bg-white/15" />
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
