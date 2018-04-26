import { identifyTags } from "../src/identify-tags"

const template = `You have {{ additional | cldrCardinal }} (total: {{ | sum | cldrCardinal }}).`

describe(`identifyTags`, () => {
  it(`is defined`, () => expect(identifyTags).toBeDefined())

  it(`is a function`, () => expect(typeof identifyTags).toBe(`function`))

  it(`tags is an empty array`, () => {
    expect(identifyTags()).toEqual({ template: ``, tags: [] })
    expect(identifyTags({ template: `` })).toEqual({ template: ``, tags: [] })
  })

  it(`extracts tags from "${ template }"`, () => {
    const expected = {
      template,
      tags: [
        {
          tag: `{{ additional | cldrCardinal }}`,
          index: 9,
          parameter: `additional`,
          transforms: [ `cldrCardinal` ],
        },
        {
          tag: `{{ | sum | cldrCardinal }}`,
          index: 49,
          parameter: ``,
          transforms: [ `sum`, `cldrCardinal` ],
        },
      ],
    }

    expect(identifyTags({ template })).toEqual(expected)
  })

  it(`extracts tags from "{{ count }} is a number"`, () => {
    const template = `{{ count }} is a number`
    const expected = {
      template,
      tags: [
        {
          tag: `{{ count }}`,
          index: 0,
          parameter: `count`,
          transforms: [],
        },
      ],
    }

    expect(identifyTags({ template })).toEqual(expected)
  })
})
