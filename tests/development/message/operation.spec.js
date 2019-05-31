import operation from "../../../source/message/operation"

describe(`operation`, () => {
  it(`is a function`, () => {
    expect(operation).toEqual(expect.any(Function))
  })

  test(`'transformer'`, () => {
    expect(operation(`transformer`)).toEqual({
      name: `transformer`,
      args: [],
    })
  })

  test(`'transformer(a)'`, () => {
    expect(operation(`transformer(a)`)).toEqual({
      name: `transformer`,
      args: [`a`],
    })
  })

  test(`'transformer(a, b, c)'`, () => {
    expect(operation(`transformer(a, b, c)`)).toEqual({
      name: `transformer`,
      args: [`a`, `b`, `c`],
    })
  })

  test(`'transformer(a,b,c)'`, () => {
    expect(operation(`transformer(a,b,c)`)).toEqual({
      name: `transformer`,
      args: [`a`, `b`, `c`],
    })
  })
})
