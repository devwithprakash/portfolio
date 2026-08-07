import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { getFeaturedBlogs } from "@/lib/featuredBlogs";
import BlogContent from "@/components/blog/blog-content";

export const revalidate = 3600;

export async function generateStaticParams() {
  const blogs = await getFeaturedBlogs();
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blogs = await getFeaturedBlogs();
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) return {};
  return {
    title: `${blog.title} — Prakash Jangid`,
    description: blog.description,
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blogs = await getFeaturedBlogs();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) notFound();

  return (
    <main className="min-h-screen bg-[#0d0d0d]">
      <Navbar />

      <div className="pt-14">
        <div className="max-w-3xl mx-auto px-5 py-10">
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-white/35 hover:text-white/70 transition-colors duration-200"
            >
              <ArrowLeft size={13} />
              All blogs
            </Link>
            <a
              href={blog.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-white/35 hover:text-white/70 transition-colors duration-200"
            >
              Read on Hashnode
              <ExternalLink size={12} />
            </a>
          </div>

          {blog.coverImage && (
            <div className="relative w-full aspect-[2/1] rounded-xl overflow-hidden bg-[#0a0a0a] mb-8">
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="mb-6">
            <div className="flex flex-wrap gap-1.5 mb-4">
              {blog.categories.map((cat) => (
                <span
                  key={cat}
                  className="px-2 py-0.5 text-[10px] font-mono text-white/40 border border-white/10 rounded"
                >
                  {cat}
                </span>
              ))}
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-mono text-white leading-snug mb-3">
              {blog.title}
            </h1>

            <p className="text-[10px] font-mono text-white/25">
              {new Date(blog.pubDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              {" · "}Prakash Jangid
            </p>
          </div>

          <BlogContent content={blog.content} />
        </div>
      </div>

      <Footer />
    </main>
  );
}
