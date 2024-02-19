import getProject from '@/api-calls/getProject'
import styles from './new-task.module.scss'
import RippleButton from '@/components/ripplebutton/RippleButton'

interface NewTaskProps {
  params: { projectId: string }
}

// Todo: here we can make a call to get more info about the project before doing a new task
const NewTask: React.FC<NewTaskProps> = async (props) => {
  const { projectId } = props.params

  const { data } = await getProject(projectId)

  const project = data?.entity

  const notParticipantOrOwner = data?.isOwner === false && !data?.isParticipant

  return (
    <section className={styles.newtaskwrapper}>
      <div className={styles.newtask}>
        <h1>Create new task for {project?.name}</h1>
        {notParticipantOrOwner && (
          <>
            <p>You do not participate or own this project.</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <RippleButton
                text='Request to participate'
                backgroundColor='var(--blue)'
                textColor='white'
              />
              <RippleButton
                text='Return'
                backgroundColor='var(--darker-banner-color)'
              />
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default NewTask
