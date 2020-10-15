module.exports = (defaultLocale) => (locale = defaultLocale) => (utcDate) =>
  new Date(utcDate).toLocaleString(locale)
