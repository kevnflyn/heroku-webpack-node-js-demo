import { camelCase } from '../utils/lodash'
import legalCategoriesJson from './regulationGroups.json'

/*
* ToDo:
* Translate regulationGroups
*/

export const regulationGroups = () => Object.freeze(
  legalCategoriesJson
    .map(object => {
      /** format obj property names with camelcase */
      return Object
        .keys(object)
        .reduce((keys, key) => ({
          ...keys,
          [camelCase(key)]: object[key]
        }), {})
    })
    .reduce((accumulator, value) => ({
      /** return a map instead of an array */
      ...accumulator,
      [value.fullName]: value
    }), {})
)
