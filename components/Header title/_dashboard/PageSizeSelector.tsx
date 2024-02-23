import { type IFilter } from '@/interfaces/props/context props/IFilter'
import React from 'react'

interface PageSizeSelectorProps {
  filter: IFilter
  entityName: keyof IFilter
  entitiesCount: number
  handlePageSizeChange: (e: React.MouseEvent<HTMLDivElement>) => void
}

const PageSizeSelector: React.FC<PageSizeSelectorProps> = (props) => {
  const { filter, entitiesCount, handlePageSizeChange } = props

  const maxNumber = Math.min(entitiesCount, 20)
  const pageSizeOptions = Array.from(
    { length: maxNumber / 5 },
    (_, i) => (i + 1) * 5
  )

  return (
    <div className='flex items-center justify-center gap-4'>
      <div
        className='flex items-center justify-center gap-2'
        onClick={handlePageSizeChange}
      >
        {pageSizeOptions.map((pageSize) => (
          <span
            key={pageSize}
            style={{
              backgroundColor:
                filter[props.entityName].pageSize === pageSize.toString()
                  ? 'rgb(255, 80, 120)'
                  : '',
              color:
                filter[props.entityName].pageSize === pageSize.toString()
                  ? 'white'
                  : ''
            }}
            className='select-none flex items-center justify-center w-8 h-8 rounded-full cursor-pointer text-xs bg-theming-white100 dark:bg-theming-dark100'
          >
            {pageSize}
          </span>
        ))}
        {entitiesCount < 20 && ( // * If the entities count is less than 20, render the extra number as another option
          <span
            style={{
              backgroundColor:
                filter[props.entityName].pageSize === entitiesCount.toString()
                  ? 'rgb(255, 80, 120)'
                  : '',
              color:
                filter[props.entityName].pageSize === entitiesCount.toString()
                  ? 'white'
                  : ''
            }}
            className='select-none flex items-center justify-center w-8 h-8 rounded-full cursor-pointer text-xs bg-theming-white100 dark:bg-theming-dark100'
          >
            {entitiesCount}
          </span>
        )}
        <p>of {entitiesCount}</p>
      </div>
    </div>
  )
}

export default PageSizeSelector
