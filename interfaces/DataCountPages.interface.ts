// * Will replace DictionaryResponse.ts with DataCountPages.interface.ts

export interface DataCountPages<T> {
  data: T[]
  count: number
  pages: number
}
