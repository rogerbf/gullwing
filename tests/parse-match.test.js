import { parseMatch } from "../src/parse-match"
import { createMatcher } from "../src/create-matcher"

const template = `You have {{ additional | cldrCardinal }} (total: {{ | sum | cldrCardinal }}).`

describe(`parseMatch`, () => {
  it(`returns the expected output`, () => {
    const matcher = createMatcher()

    expect(parseMatch(matcher.exec(template))).toEqual({
      tag: `{{ additional | cldrCardinal }}`,
      index: 9,
      parameter: `additional`,
      transforms: [ `cldrCardinal` ],
    })

    expect(parseMatch(matcher.exec(template))).toEqual({
      tag: `{{ | sum | cldrCardinal }}`,
      index: 49,
      parameter: ``,
      transforms: [ `sum`, `cldrCardinal` ],
    })
  })
})
