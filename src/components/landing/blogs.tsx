import Image from "next/image";
import Link from "next/link";
import { getFeaturedBlogs } from "@/lib/featuredBlogs";

export default async function Blogs() {
  const blogs = await getFeaturedBlogs();

  if (blogs.length === 0) return null;

  return (
    <section
      id="blogs"
      className="bg-[#0d0d0d] w-full"
      aria-label="Blogs section"
    >
      <div className="max-w-4xl mx-auto px-5 py-8 border-b border-white/5">
        <h2 className="text-xl sm:text-2xl font-bold font-mono text-white mb-1">
          Blogs
        </h2>
        <p className="text-[0.65rem] sm:text-xs font-mono font-semibold tracking-widest text-white/35 uppercase mb-6">
          Things I&apos;ve written
        </p>

        <div className="flex flex-col gap-3">
          {blogs.slice(0, 3).map((blog) => (
            <Link
              key={blog.slug}
              href={`/blogs/${blog.slug}`}
              className="group flex gap-4 items-center rounded-xl border border-white/10 bg-[#111] p-3 hover:border-white/20 transition-colors duration-300"
            >
              {blog.coverImage && (
                <div className="relative w-20 h-14 sm:w-24 sm:h-16 flex-shrink-0 rounded-lg overflow-hidden bg-[#0a0a0a]">
                  <Image
                    src={blog.coverImage}
                    alt={blog.title}
                    fill
                    sizes="96px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold font-mono text-white leading-snug mb-1 group-hover:text-white/80 transition-colors line-clamp-1">
                  {blog.title}
                </h3>
                <p className="text-white/40 text-xs leading-relaxed line-clamp-2">
                  {blog.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-5 flex justify-end">
          <Link
            href="/blogs"
            className="text-xs font-mono text-white/35 hover:text-white/70 transition-colors duration-200"
          >
            View all blogs →
          </Link>
        </div>
      </div>
    </section>
  );
}
