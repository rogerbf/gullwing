const { compile, call } = require("../../build/gullwing")
const property = require("./property")
const join = require("./join")
const source = require("./data.json")

const messages = compile(source, { property, join })

console.log(messages.people.recent({ people: ["Beep"] }))
// 1 recent: Beep.
console.log(messages.people.recent({ people: ["Beep", "Wroom"] }))
// 2 recent: Beep and Wroom.
console.log(messages.people.recent({ people: ["Beep", "Wroom", "Boom"] }))
// 3 recent: Beep, Wroom and Boom.

console.log(
  JSON.stringify(
    call(messages, {
      people: {
        recent: { people: ["Jean Luc", "Data"] },
        family: { familyMembers: ["Riker", "Crusher"] },
      },
    }),
    null,
    2
  )
)
// {
//   "people": {
//     "recent": "2 recent: Jean Luc and Data.",
//     "family": "Riker and Crusher"
//   }
// }
