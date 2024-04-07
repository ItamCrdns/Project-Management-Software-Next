const LoadingBannersSkeleton: React.FC = () => {
  return (
    <div role='status' className='animate-pulse w-full flex gap-4'>
      <div className='h-[96px] bg-gray-200 rounded-md dark:bg-gray-700 w-[375px]'></div>
      <div className='h-[96px] bg-gray-200 rounded-md dark:bg-gray-700 w-[205px]'></div>
      <div className='h-[96px] bg-gray-200 rounded-md dark:bg-gray-700 w-[205px]'></div>
      <div className='h-[96px] bg-gray-200 rounded-md dark:bg-gray-700 w-[205px]'></div>
    </div>
  )
}

export { LoadingBannersSkeleton }
