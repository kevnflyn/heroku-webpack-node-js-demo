const camcelcase = require('camelcase')

module.exports = object => (
  Object
    .keys(object)
    .reduce((camelCaseObject, key) => ({
      ...camelCaseObject,
      [camcelcase(key)]: object[key]
    }), {})
)
