import { Suspense } from 'react'
import { Projects } from './Projects'
import { type SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'
import DataHeader from '@/components/Data Header/DataHeader'
import { projectSortValues } from '@/components/Data Header/sortValues'
import { LoadingProjectsSkeleton } from './LoadingProjectsSkeleton'
import ProjectsHint from './ProjectsHint'
import { cookies } from 'next/headers'

const ProjectsPage: React.FC<{ searchParams: SearchParamsPageSize }> = async (
  props
) => {
  const key =
    props.searchParams.page +
    props.searchParams.pagesize +
    props.searchParams.secondpagesize

  const configCookie = cookies().get('config')?.value

  return (
    <main className='flex flex-col justify-center gap-8 rounded-md p-8'>
      <h1 className='text-xl font-semibold text-center'>Projects overview</h1>
      <section className='flex flex-col items-center justify-center'>
        <div className='flex flex-col'>
          <ProjectsHint config={configCookie} />
          <div className='space-y-8'>
            <DataHeader
              width='300px'
              entity='projectsfromcompany'
              pushSearchParams={false}
              sortValues={projectSortValues}
            />
            <Suspense
              key={key}
              fallback={
                <LoadingProjectsSkeleton
                  clientsSkeletonsCount={Number(props.searchParams.pagesize)}
                  projectsSkeletonsCount={Number(
                    props.searchParams.secondpagesize
                  )}
                />
              }
            >
              <Projects searchParams={props.searchParams} />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ProjectsPage
