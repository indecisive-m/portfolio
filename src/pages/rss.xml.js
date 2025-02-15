import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";

const parser = new MarkdownIt();

export async function GET(context) {
  const posts = await getCollection("blog");
  return rss({
    title: "Mike Watkins' Blog",
    description: "My journey learning to code.",
    customData: `
      <image>
        <url>https://mikewatkins.dev/me.jpg</url>
        <title>Mike Watkins' Blog</title>
        <link>https://mikewatkins.dev/</link>
        <width>32</width>
        <height>32</height>
      </image>
    `,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
      content: sanitizeHtml(parser.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      }),
    })),
    site: context.site,
    stylesheet: "/pretty-feed-v3.xsl",
  });
}
