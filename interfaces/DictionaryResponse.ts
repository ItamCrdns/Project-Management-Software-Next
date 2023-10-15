/**
 * A dictionary response object that contains a count and a dictionary of key-value pairs.
 * @template T The type of the values in the dictionary.
 */
export interface DictionaryResponse<T> {
  /** We could do this but i find it really bad */
  // [key: string]: T[] | null | number
  data: T[] | null // This is more readable, although it's not that declarative as the above one since now all endpoints should return a dictionary with "data" and "count" instead of returning just returning "entity" and "count"
  /** The number of items in the dictionary. */
  count: number
  pages: number
}
