const toCamelCaseObject = require('./toCamelCaseObject')

module.exports = list => list.map(item => toCamelCaseObject(item))
