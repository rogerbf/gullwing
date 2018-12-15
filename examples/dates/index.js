const { compile } = require(`../../build/gullwing`)
const source = require(`./data.json`)
const toLocaleString = require(`./to-locale-string`)

const messages = compile(source, { toLocaleString })

console.log(
  messages.launches.falcon({ launchDate: `2018-12-04T18:38:00.000Z` })
)
// Falcon 9 launches at 12/4/2018, 7:38:00 PM
