import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';

const md = new MarkdownIt();

/**
 * The public feed. Every published post, for readers and crawlers.
 * This is NOT the feed Make watches — see linkedin.xml.js.
 */
export async function GET(context) {
  const posts = (await getCollection('posts', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'The Interactive Designer',
    description: 'Notes on interactive design, interfaces, and the craft of building them.',
    site: context.site,
    trailingSlash: true,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.standfirst ?? '',
      link: `/${post.id}/`,
      content: sanitizeHtml(md.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      }),
    })),
    customData: '<language>en-gb</language>',
  });
}
