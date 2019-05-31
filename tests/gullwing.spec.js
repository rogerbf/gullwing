import { compile, applyParameters } from "../"

describe(`applyParameters`, () => {
  test(`applyParameters()`, () => {
    expect(applyParameters()).toEqual({})
  })

  test(`applyParameters(tree, parameters)`, () => {
    const fn = jest.fn(value => value)

    expect(
      applyParameters(
        {
          a: fn,
          b: {
            c: fn,
            d: fn,
          },
        },
        {
          a: `a`,
          b: {
            c: `c`,
            d: `d`,
          },
        },
      ),
    ).toEqual({
      a: `a`,
      b: {
        c: `c`,
        d: `d`,
      },
    })
  })
})

describe(`compile`, () => {
  test(`compile()`, () => {
    expect(compile()).toEqual({})
  })

  test(`example: things`, () => {
    const source = {
      things: {
        _message: `Things: {{ total }}`,
      },
      stuff: {
        _message: `Stuff`,
      },
    }

    const messages = compile(source)

    expect(messages.things({ total: 3 })).toEqual(`Things: 3`)
    expect(messages.things()).toEqual(`Things: `)
    expect(messages.stuff()).toEqual(`Stuff`)
  })

  test(`example: fruits`, () => {
    const source = {
      _configuration: {
        join: `, `,
      },
      fruits: {
        _message: `{{ types | property(prop) }} types of fruit: {{ types | join }}.`,
        _variables: {
          prop: `length`,
        },
      },
    }

    const property = () => propertyName => value => value[propertyName]

    const join = defaultSeparator => (separator = defaultSeparator) => list =>
      list.join(separator)

    const messages = compile(source, { join, property })

    expect(messages.fruits({ types: [`Apple`, `Pear`, `Mango`] })).toEqual(
      `3 types of fruit: Apple, Pear, Mango.`,
    )
  })
})
