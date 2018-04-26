import { parseMatch } from "./parse-match"
import { createMatcher } from "./create-matcher"

const identifyTags = ({
  template = ``,
  regex = createMatcher(),
  tags = [],
  ...rest
} = {}) => {
  const match = regex.exec(template)
  return match === null
    ? { ...rest, template, tags }
    : identifyTags({
        template,
        regex,
        tags: [ ...tags, parseMatch(match) ],
        ...rest,
      })
}

export { identifyTags }
