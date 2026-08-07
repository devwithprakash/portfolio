import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { getFeaturedBlogs } from "@/lib/featuredBlogs";

export const revalidate = 3600;

export default async function BlogsPage() {
  const blogs = await getFeaturedBlogs();

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
              Blogs
            </h1>
            <p className="text-[0.65rem] sm:text-xs font-mono font-semibold tracking-widest text-white/35 uppercase">
              Things I&apos;ve written
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {blogs.map((blog) => (
              <Link
                key={blog.slug}
                href={`/blogs/${blog.slug}`}
                className="group relative overflow-hidden rounded-xl border border-white/8 bg-[#111] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-[#141414]"
              >
                {/* Top Row */}
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-white/30 uppercase tracking-wider">
                    <span>
                      {new Date(blog.pubDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>

                    <span>•</span>

                    <span>{blog.readTime}</span>
                  </div>

                  <span className="translate-x-0 text-white/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white">
                    →
                  </span>
                </div>

                {/* Title */}
                <h2 className="line-clamp-2 text-base font-semibold text-white transition-colors duration-300 group-hover:text-white">
                  {blog.title}
                </h2>

                {/* Description */}
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/45">
                  {blog.description}
                </p>

                {/* Tags */}
                {blog.categories.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {blog.categories.slice(0, 3).map((cat) => (
                      <span
                        key={cat}
                        className="rounded-md border border-white/10 px-2 py-1 text-[10px] font-mono text-white/40 transition-colors duration-300 group-hover:border-white/20"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
