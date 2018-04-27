const parseMatch = match => {
  const [ parameter, ...transformers ] = match[0]
    .replace(/[{}\s]/g, ``)
    .trim()
    .split(`|`)

  return {
    tag: match[0],
    index: match.index,
    parameter,
    transformers,
  }
}

export { parseMatch }
