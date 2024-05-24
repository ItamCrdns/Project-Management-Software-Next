import { getTimelineEvent } from '@/api-calls/getTimelineEvent'
import React from 'react'
import { determineColorByEventType } from '../../../(admin layout)/@timeline/determineColorByEventType'
import { EventText } from '../../../(admin layout)/@timeline/EventText'
import { EntityNotFound } from '@/components/UI/EntityNotFound'
import EmployeeCard from '@/components/employeecard/EmployeeCard'
import ProjectUI from '@/components/UI/ProjectUI/ProjectUI'
import TaskUI from '@/components/UI/TaskUI/TaskUI'
import IssueUI from '@/components/UI/IssueUI/IssueUI'
import { DateBadge } from '@/components/UI/ProjectUI/Badges/DateBadge'

const TimelineEvent: React.FC<{ eventId: string }> = async (props) => {
  const { eventId } = props
  const event = await getTimelineEvent(eventId)

  if (event.status !== 200 || event.data === null) {
    return (
      <div className='p-8'>
        <EntityNotFound entity='Timeline event' />
      </div>
    )
  }

  const timelineEvent = event.data

  return (
    <div className='flex gap-8 items-start m-8 '>
      <EmployeeCard
        employee={timelineEvent.employee}
        isProfile={false}
        redirectMe={true}
      />
      <div className='space-y-8'>
        <div className='p-8 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
          <div className='flex gap-4 items-center'>
            <div
              className={`${determineColorByEventType(
                timelineEvent?.type ?? 'Unassign'
              )} w-3 h-3 border-2 rounded-full z-10`}
            ></div>
            <div className='space-y-4'>
              <EventText event={timelineEvent} />
              <DateBadge
                date={timelineEvent.created}
                showCustomColor={true}
                text='Recorded'
              />
            </div>
          </div>
        </div>
        {timelineEvent?.project && (
          <ProjectUI
            project={timelineEvent.project}
            clientId={timelineEvent.project.company.companyId.toString()}
          />
        )}
        {timelineEvent?.task && <TaskUI task={timelineEvent.task} />}
        {timelineEvent?.issue && <IssueUI issue={timelineEvent.issue} />}
      </div>
    </div>
  )
}

export default TimelineEvent
