const operation = operation => {
  const args = (operation.match(/\((.*?)\)/) || [])[1]

  return {
    name: operation.match(/\w*/)[0],
    args: args ? args.split(`,`).map(arg => arg.trim()) : [],
  }
}

export default operation
