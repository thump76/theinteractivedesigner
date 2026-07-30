import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { toPlainText, escapeXml } from '../lib/plaintext.js';

/**
 * The LinkedIn queue. Only posts where you ticked "Post to LinkedIn".
 * Make watches this feed and nothing else, so a post can go live on the
 * site without ever reaching LinkedIn.
 *
 * A post appears here the moment you tick the box — including an old post
 * you decide to share later. Make treats it as new because it has not seen
 * that URL in this feed before.
 */
export async function GET(context) {
  const posts = (await getCollection('posts', ({ data }) => !data.draft && data.linkedin))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'The Interactive Designer — LinkedIn queue',
    description: 'Posts flagged for LinkedIn. Machine-readable; not for humans.',
    site: context.site,
    trailingSlash: true,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.standfirst ?? '',
      link: `/${post.id}/`,
      customData: `<linkedintext>${escapeXml(toPlainText(post.body))}</linkedintext>`,
    })),
    customData: '<language>en-gb</language>',
  });
}
