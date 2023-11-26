export interface ISelectAuthorProps {
  toggle: boolean
  showPictures?: boolean
  getAuthorsIDValues: (values: number[]) => void
  clearAuthorsIDValues: boolean // ? Check if the filter.authorIds is empty
}

export interface IParams {
  client?: [string, string]
}
