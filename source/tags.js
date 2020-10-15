export const tags = (input, regex = new RegExp(/{{(.*?)}}/g), matches = []) => {
  const match = regex.exec(input)

  const [parameter, ...operations] = match
    ? match[1].split("|").map((x) => x.trim())
    : []

  return match
    ? tags(
        input,
        regex,
        matches.concat({
          tag: match[0],
          parameter,
          operations,
        })
      )
    : matches
}
