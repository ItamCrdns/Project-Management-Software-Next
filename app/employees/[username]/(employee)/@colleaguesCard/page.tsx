import { Colleagues } from './Colleagues'

const ColleaguesCard: React.FC<{ params: { username: string } }> = async (
  props
) => {
  const { username } = props.params
  return <Colleagues username={username} />
}

export default ColleaguesCard
