import { type DictionaryResponse } from '../DictionaryResponse'

export interface ClientReturn<T> {
  data: DictionaryResponse<T> | null
  status: number
}
