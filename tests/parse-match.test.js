import { parseMatch } from "../src/parse-match"
import { createMatcher } from "../src/create-matcher"

describe(`parseMatch`, () => {
  it(`returns the expected output`, () => {
    const matcher = createMatcher()
    const template = `You have {{ additional | cldrCardinal }} (total: {{ | sum | cldrCardinal }}).`

    expect(parseMatch(matcher.exec(template))).toEqual({
      tag: `{{ additional | cldrCardinal }}`,
      index: 9,
      parameter: `additional`,
      transformers: [ `cldrCardinal` ],
    })

    expect(parseMatch(matcher.exec(template))).toEqual({
      tag: `{{ | sum | cldrCardinal }}`,
      index: 49,
      parameter: ``,
      transformers: [ `sum`, `cldrCardinal` ],
    })
  })
})
