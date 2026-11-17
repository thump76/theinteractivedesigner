import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';

const md = new MarkdownIt();

/**
 * Press releases feed, for news desks and aggregators.
 * Separate from rss.xml (posts) and NOT watched by Make.
 */
export async function GET(context) {
  const releases = (await getCollection('press', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    title: 'The Interactive Designer: press releases',
    description: 'Press releases for apps, websites, shops and hardware by Philip Brumpton.',
    site: context.site,
    trailingSlash: true,
    items: releases.map((r) => ({
      title: r.data.headline,
      pubDate: r.data.date,
      description: r.data.standfirst,
      link: `/press/${r.id}/`,
      content: sanitizeHtml(md.render(r.body)),
    })),
    customData: '<language>en-gb</language>',
  });
}
