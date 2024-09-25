import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection("blog");
  return rss({
    title: "Mike Watkins' Blog",
    description: "My journey learning to code.",
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
    })),
    site: context.site,
    customData: `<language>en-us</language>`,
    stylesheet: "/pretty-feed-v3.xsl",
  });
}
