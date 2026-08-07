import { getBlogs } from "@/lib/hashnode";
import { featuredBlogs } from "@/data/featuredBlogs";

export async function getFeaturedBlogs() {
  const blogs = await getBlogs();

  return blogs.filter((blog) => featuredBlogs.includes(blog.title));
}

