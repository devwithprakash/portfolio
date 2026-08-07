import Parser from "rss-parser";
import readingTime from "reading-time";

type CustomItem = {
  "content:encoded"?: string;
  enclosure?: { url?: string };
};

const parser = new Parser<Record<string, unknown>, CustomItem>({
  customFields: {
    item: [["content:encoded", "content:encoded"], "enclosure"],
  },
});

const RSS_URL = "https://js-blogs.hashnode.dev/rss.xml";

export async function getBlogs() {
  const response = await fetch(RSS_URL, {
    next: {
      revalidate: 60 * 60,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch RSS feed");
  }

  const xml = await response.text();

  const feed = await parser.parseString(xml);

  return feed.items.map((item) => {
    const content = item["content:encoded"] ?? "";
    const stats = readingTime(content);

    return {
      title: item.title ?? "",
      description: item.contentSnippet ?? "",
      link: item.link ?? "",
      pubDate: item.pubDate ?? "",
      categories: item.categories ?? [],
      coverImage: item.enclosure?.url ?? "",
      content,
      slug: (item.link ?? "").split("/").pop() ?? "",
      readTime: stats.text,
      words: stats.words,
      minutes: stats.minutes, 
    };
  });
}

export type Blog = Awaited<ReturnType<typeof getBlogs>>[number];
