/**
 * Strip markdown down to something LinkedIn will accept as-is.
 * Make drops this straight into the post body, so no links, no
 * headings, no syntax — just paragraphs.
 */
export function toPlainText(markdown) {
  return markdown
    .replace(/^---[\s\S]*?---\s*/, '')            // front matter, if present
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')          // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')       // links -> label
    .replace(/^#{1,6}\s+/gm, '')                   // headings
    .replace(/^>\s?/gm, '')                        // blockquotes
    .replace(/`{1,3}/g, '')                        // code ticks
    .replace(/\*\*([^*]+)\*\*/g, '$1')             // bold
    .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '$1')    // italic
    .replace(/^\s*[-*+]\s+/gm, '• ')               // bullets
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** Make lowercases custom RSS element names, so the element is lowercase too. */
export function escapeXml(s) {
  return s.replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[c]);
}
