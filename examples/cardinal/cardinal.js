module.exports = ({ locale }) => {
  const pluralize = new Intl.PluralRules(locale)

  return (rules, replace) => value =>
    rules[pluralize.select(value)].replace(replace, value)
}
