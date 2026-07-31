import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { transform } from "ultrahtml";
import sanitize from "ultrahtml/transformers/sanitize";
import MarkdownIt from "markdown-it";

const parser = new MarkdownIt(); // 1. Define the safe elements list (replicates sanitizeHtml defaults + img)

const allowedBlogTags = [
  "p",
  "b",
  "i",
  "em",
  "strong",
  "a",
  "img",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "ul",
  "ol",
  "li",
  "code",
  "pre",
  "blockquote",
  "hr",
];

export async function GET(context) {
  const posts = await getCollection("blog");

  const resolvedItems = await Promise.all(
    posts.map(async (post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      tags: post.data.tags,
      draft: post.data.draft,
      link: `/blog/${post.id}`,
      content: await transform(parser.render(post.body), [
        sanitize({
          allowElements: allowedBlogTags,
          allowAttributes: {
            src: ["img"],
            alt: ["img"],
            title: ["img"],
            href: ["a"],
            target: ["a"],
          },
        }),
      ]),
    })),
  );

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
    items: resolvedItems,
    site: context.site,
    stylesheet: "/pretty-feed-v3.xsl",
  });
}
