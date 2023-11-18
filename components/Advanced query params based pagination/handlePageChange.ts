export interface IHandlePageChangeProps {
  currentPage: number
  url: string
  // ? Updates the current page and the url
  updateCurrentPage: (
    callback: (prevPage: number) => number,
    newUrl: string
  ) => void
}

export const handlePageChange = (props: IHandlePageChangeProps): void => {
  const { currentPage, url, updateCurrentPage } = props

  const pageParam = url.includes('?')
    ? `&page=${currentPage}`
    : `?page=${currentPage}`
  const newUrl = `${url}${pageParam}`
  updateCurrentPage(() => currentPage, newUrl)
}
