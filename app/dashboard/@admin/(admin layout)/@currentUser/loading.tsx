const LoadingCurrentUserBanners: React.FC = () => {
  return (
    <div role='status' className='animate-pulse w-full flex gap-4'>
      <div className='h-[96px] w-[300px] bg-gray-200 rounded-md dark:bg-gray-700'></div>
      <div className='h-[96px] w-[205px] bg-gray-200 rounded-md dark:bg-gray-700'></div>
      <div className='h-[96px] w-[205px] bg-gray-200 rounded-md dark:bg-gray-700'></div>
      <div className='h-[96px] w-[205px] bg-gray-200 rounded-md dark:bg-gray-700'></div>
    </div>
  )
}

export default LoadingCurrentUserBanners
