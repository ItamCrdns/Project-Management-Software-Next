export interface IHandlePageChangeProps {
  action: string
  currentPage: number
  url: string
  totalPages: number
  // ? Updates the current page and the url
  updateCurrentPage: (
    callback: (prevPage: number) => number,
    newUrl: string
  ) => void
}

export const handlePageChange = (props: IHandlePageChangeProps): void => {
  const { action, currentPage, url, totalPages, updateCurrentPage } = props

  if (action === 'previous' && currentPage > 1) {
    const pageParam = url.includes('?')
      ? `&page=${currentPage - 1}`
      : `?page=${currentPage - 1}`
    const newUrl = `${url}${pageParam}`
    updateCurrentPage((prevPage) => prevPage - 1, newUrl)
  } else if (action === 'next' && currentPage < totalPages) {
    const pageParam = url.includes('?')
      ? `&page=${currentPage + 1}`
      : `?page=${currentPage + 1}`
    const newUrl = `${url}${pageParam}`
    updateCurrentPage((prevPage) => prevPage + 1, newUrl)
  } else if (action === 'first' && currentPage > 1) {
    const pageParam = url.includes('?') ? '&page=1' : '?page=1'
    const newUrl = `${url}${pageParam}`
    updateCurrentPage(() => 1, newUrl)
  } else if (action === 'last' && currentPage < totalPages) {
    const pageParam = url.includes('?')
      ? `&page=${totalPages}`
      : `?page=${totalPages}`
    const newUrl = `${url}${pageParam}`
    updateCurrentPage(() => totalPages, newUrl)
  }
}
