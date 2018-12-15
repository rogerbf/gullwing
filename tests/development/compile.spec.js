import compile from "../../source/compile"

describe(`compile`, () => {
  it(`is a function`, () => {
    expect(compile).toEqual(expect.any(Function))
  })

  test(`compile()`, () => {
    expect(compile()).toEqual({})
  })

  test(`compiles tree`, () => {
    const tree = compile({
      a: {
        _message: `a`,
      },
      b: {
        _message: `b`,
      },
      c: {
        d: {
          _message: `d`,
        },
        e: {
          _message: `e`,
        },
      },
    })

    expect(tree).toEqual(expect.any(Object))
    expect(tree.a()).toEqual(`a`)
    expect(tree.b()).toEqual(`b`)
    expect(tree.c.d()).toEqual(`d`)
    expect(tree.c.e()).toEqual(`e`)
  })
})
