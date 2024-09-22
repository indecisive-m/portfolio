import rss, { pagesGlobToRssItems } from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = getCollection("blog");
  return rss({
    title: "Astro Learner | Blog",
    description: "My journey learning Astro",
    items: posts.map((post) => ({
      title: post.data.title,
      publishDate: post.data.publishDate,
      description: post.data.description,
      link: `/posts/${post.slug}/`,
    })),
    site: context.site,
    customData: `<language>en-us</language>`,
    stylesheet: "/pretty-feed-v3.xsl",
  });
}
