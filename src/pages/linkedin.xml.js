import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { toPlainText, escapeXml } from '../lib/plaintext.js';

/** MIME type from the file extension, so the enclosure is well-formed. */
function mimeFor(path) {
  const ext = path.split('.').pop().toLowerCase();
  return {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
    avif: 'image/avif',
    gif: 'image/gif',
  }[ext] ?? 'image/jpeg';
}

/**
 * The LinkedIn queue. Only posts where you ticked "Post to LinkedIn".
 * Make watches this feed and nothing else, so a post can go live on the
 * site without ever reaching LinkedIn.
 *
 * The feature image is carried as a standard <enclosure>, which Make's RSS
 * parser exposes as a first-class `enclosures[]` field — more reliable than
 * a custom element. Posts without an image still appear; the scenario routes
 * them to a plain text post instead.
 */
export async function GET(context) {
  const posts = (await getCollection('posts', ({ data }) => !data.draft && data.linkedin))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'The Interactive Designer — LinkedIn queue',
    description: 'Posts flagged for LinkedIn. Machine-readable; not for humans.',
    site: context.site,
    trailingSlash: true,
    items: posts.map((post) => {
      const imageUrl = post.data.image
        ? new URL(post.data.image, context.site).href
        : null;

      return {
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.standfirst ?? '',
        link: `/${post.id}/`,
        enclosure: imageUrl
          ? { url: imageUrl, type: mimeFor(post.data.image), length: 0 }
          : undefined,
        customData: [
          `<linkedintext>${escapeXml(toPlainText(post.body))}</linkedintext>`,
          post.data.imageAlt ? `<imagealt>${escapeXml(post.data.imageAlt)}</imagealt>` : '',
        ].join(''),
      };
    }),
    customData: '<language>en-gb</language>',
  });
}