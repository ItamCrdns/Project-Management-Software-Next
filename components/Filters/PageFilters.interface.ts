export interface PageFiltersProps {
  url: string // * Url to fetch data (employees) from, will be used to display the employees in the dropdown (select component). With no query params
  queryParams: URLSearchParams
}
