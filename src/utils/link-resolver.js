/**
 * Prismic link resolver
 */
const linkResolver = (doc) => {
  if (doc.uid) {
    return `/${doc.uid}`;
  }
  return "/";
};

module.exports = linkResolver;
