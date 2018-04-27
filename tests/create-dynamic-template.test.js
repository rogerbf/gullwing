import { createDynamicTemplate } from "../src/create-dynamic-template"

describe(`createDynamicTemplate`, () => {
  it(`is a function`, () =>
    expect(typeof createDynamicTemplate).toBe(`function`))

  it(`returns a function`, () =>
    expect(typeof createDynamicTemplate()).toBe(`function`))

  it(`returns the template unchanged`, () =>
    expect(createDynamicTemplate({ template: `testing` })()).toBe(`testing`))

  it(`handles a simple case`, () => {
    const template = `{{ count }} is a cardinal number.`
    const dynamicTemplate = createDynamicTemplate({ template })

    const actual = dynamicTemplate({ count: 3 })
    const expected = `3 is a cardinal number.`

    expect(actual).toBe(expected)
  })

  it(`handles a single transform`, () => {
    const template = `{{ initial }} + {{ additional }} = {{ | total }}`
    const total = ({ parameters }) =>
      Object.values(parameters).reduce((t, n) => t + n)

    const actual = createDynamicTemplate({ template, transformers: { total } })(
      {
        initial: 1,
        additional: 2,
      }
    )
    const expected = `1 + 2 = 3`

    expect(actual).toBe(expected)
  })

  it(`handles multiple transforms`, () => {
    const template = `I had {{ initial | cardinal }}, then I received {{ additional | cardinal }}, nu har jag {{ | sum | cardinal }}.`

    const options = {
      cardinal: {
        one: `# apple`,
        other: `# apples`,
      },
    }

    const cardinal = jest.fn()
    const sum = jest.fn()

    const parameters = {
      initial: 1,
      additional: 2,
    }

    const actual = createDynamicTemplate({
      template,
      options,
      transformers: { cardinal, sum },
    })(parameters)

    expect(cardinal).toHaveBeenCalledTimes(3)

    expect(sum).toHaveBeenCalledTimes(1)
    expect(sum).toHaveBeenCalledWith({
      options: undefined,
      parameters,
      parameter: ``,
      value: undefined,
    })
  })
})
