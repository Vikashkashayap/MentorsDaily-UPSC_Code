/**
 * Slugify title for URL-safe slug. Matches frontend slugify behavior.
 */
function slugify(text = '') {
  try {
    return String(text)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  } catch {
    return '';
  }
}

module.exports = { slugify };
