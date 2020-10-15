const { compile } = require("../../build/gullwing")
const cardinal = require("./cardinal")
const source = require("./data.json")

const messages = compile(source, { cardinal })

console.log(messages.requests({ count: 1 }))
// One request received.

console.log(messages.requests({ count: 6 }))
// 6 requests received.
