module.exports = (obj, properties) => {
  properties.forEach(key => {
    delete obj[key]
  })
  return obj
}
