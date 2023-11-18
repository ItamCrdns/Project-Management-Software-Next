export interface IHandlePageChangeProps {
  currentPage: number
  currentPageSize: number
  url: string
  // ? Updates the current page and the url
  updateCurrentPage: (
    callback: (prevPage: number) => number,
    newUrl: string
  ) => void
}

export const handlePageChange = (props: IHandlePageChangeProps): void => {
  const { currentPage, currentPageSize, url, updateCurrentPage } = props

  const pageParam = url.includes('?')
    ? `&page=${currentPage}&pagesize=${currentPageSize}`
    : `?page=${currentPage}&pagesize=${currentPageSize}`
  const newUrl = `${url}${pageParam}`
  updateCurrentPage(() => currentPage, newUrl)
}
