import { getFeaturedBlogs } from "@/lib/featuredBlogs";

export default async function BlogSection() {
  const blogs = await getFeaturedBlogs();

  return (
    <section className="grid gap-6 md:grid-cols-2">
      {blogs.map((blog) => (
        <article
          key={blog.link}
          className="rounded-xl border border-white/10 bg-[#111] p-5"
        >
          <h3 className="text-lg font-semibold">{blog.title}</h3>

          <p className="mt-3 text-white/60">{blog.description}</p>

          <a
            href={blog.link}
            target="_blank"
            className="mt-5 inline-flex text-sm hover:underline"
          >
            Read Article →
          </a>
        </article>
      ))}
    </section>
  );
}
