import React, { Suspense } from 'react'
import EmployeeBanner from '../../EmployeeBanner'
import AdminBanners from './AdminBanners'
import { LoadingBannersSkeleton } from './LoadingBannersSkeleton'

const UserPage: React.FC = () => {
  return (
    <section className='flex justify-center gap-4 h-24'>
      <Suspense fallback={<LoadingBannersSkeleton />}>
        <EmployeeBanner />
        <AdminBanners />
      </Suspense>
    </section>
  )
}

export default UserPage
