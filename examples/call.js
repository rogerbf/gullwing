const { compile, call } = require("../")

const source = {
  captain: { _m: "At the helm: {{ name }}" },
  game: {
    score: {
      _m: "Current score is {{ count }}",
    },
    referee: {
      _m: "Referee is {{ name }}",
    },
  },
}

const messages = compile(source)

console.log(
  call(messages, {
    captain: { name: "Kathryn" },
    game: { score: { count: 5 }, referee: { name: "Tuvok" } },
  })
)
