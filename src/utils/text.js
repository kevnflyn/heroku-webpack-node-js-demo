export const getRegexForFindingKeywords = keywords => new RegExp(
  `(${keywords
    .filter(truthyValue => truthyValue)
    .map(keyword => keyword)
    .join('|')})`,
  'gi')
