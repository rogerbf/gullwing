import { createDynamicTemplate } from "../src/create-dynamic-template"

describe(`createDynamicTemplate`, () => {
  it(`is a function`, () =>
    expect(typeof createDynamicTemplate).toBe(`function`))

  it(`returns a function`, () =>
    expect(typeof createDynamicTemplate()).toBe(`function`))

  it(`handles a simple case`, () => {
    const template = `{{ count }} is a cardinal number.`
    const dynamicTemplate = createDynamicTemplate({ template })

    const actual = dynamicTemplate({ count: 3 })
    const expected = `3 is a cardinal number.`

    expect(actual).toBe(expected)
  })

  it(`handles transforms`, () => {
    const template = `{{ initial }} + {{ additional }} = {{ | total }}`
    const total = ({ parameters }) =>
      Object.values(parameters).reduce((t, n) => t + n)

    const actual = createDynamicTemplate({ template, transforms: { total } })({
      initial: 1,
      additional: 2,
    })
    const expected = `1 + 2 = 3`

    expect(actual).toBe(expected)
  })
})
