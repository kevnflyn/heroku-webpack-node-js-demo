const removeSensitiveUserData = require('../serverUtils/removeSensitiveUserData')

module.exports.handleDbResponse = (dbRes = {}, properties) => {
  const rows = (
    dbRes.rows &&
    dbRes.rows.map(row => removeSensitiveUserData(row, properties))
  )
  return { rows }
}
