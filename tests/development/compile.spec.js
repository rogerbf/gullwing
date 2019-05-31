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

  it(`compiles tree with alternate dynamic message syntax (_m)`, () => {
    const tree = compile({ a: { _m: `a` } })

    expect(tree.a()).toEqual(`a`)
  })

  it(`calls transformer with dynamic message variables declared with compact syntax (_v)`, () => {
    const fnInner = jest.fn(() => param => param)
    const fn = jest.fn(() => fnInner)
    const tree = compile(
      { a: { _m: `{{ a | fn(arg) }}`, _v: { arg: `a` } } },
      { fn },
    )

    tree.a()

    expect(fnInner).toHaveBeenCalledWith(`a`)
  })

  it(`compiles string values`, () => {
    const tree = compile({ a: `a` })

    expect(tree.a()).toEqual(`a`)
  })

  it(`compiles string values in trees with dynamic messages`, () => {
    const tree = compile({
      a: `a`,
      b: {
        c: {
          d: {
            _m: `d`,
          },
          e: `e`,
        },
      },
    })

    expect(tree.a()).toEqual(`a`)
    expect(tree.b.c.d()).toEqual(`d`)
    expect(tree.b.c.e()).toEqual(`e`)
  })
})
