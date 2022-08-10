const paginateResult = (rows, total, size, offset) => ({
  result: rows,
  page: offset / (total / size),
  total
})

module.exports = {
  paginateResult
}
