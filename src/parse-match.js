const parseMatch = match => {
  const [ parameter, ...transforms ] = match[0]
    .replace(/[{}\s]/g, ``)
    .trim()
    .split(`|`)

  return {
    tag: match[0],
    index: match.index,
    parameter,
    transforms,
  }
}

export { parseMatch }
