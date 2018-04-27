import gullwing from "../src/main"

describe(`gullwing`, () => {
  it(`is defined`, () => expect(gullwing).toBeDefined())

  it(`is a function`, () => expect(typeof gullwing).toBe(`function`))

  it(`traverses objects with nested templates`, () => {
    const template = {
      year: 2018,
      calculation: {
        type: `basic`,
        stringified: {
          template: `{{ n1 }} + {{ n2 }} = {{ | sum }}`,
        },
      },
    }

    const dynamicTemplate = gullwing({
      template,
      transformers: {
        sum: ({ parameters }) =>
          Object.values(parameters).reduce((total, n) => total + n),
      },
    })

    expect(typeof dynamicTemplate).toBe(`object`)
    expect(dynamicTemplate.year).toBe(2018)
    expect(typeof dynamicTemplate.calculation).toBe(`object`)
    expect(dynamicTemplate.calculation.type).toBe(`basic`)
    expect(typeof dynamicTemplate.calculation.stringified).toBe(`function`)
    expect(dynamicTemplate.calculation.stringified({ n1: 1, n2: 2 })).toBe(
      `1 + 2 = 3`
    )
  })
})
