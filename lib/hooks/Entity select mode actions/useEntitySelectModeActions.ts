import { entitySelectModeSlice } from '@/lib/features/entity select mode/entitySelectModeSlice'
import { useAppDispatch } from '../hooks'

export const useEntitySelectModeActions = () => {
  const dispatch = useAppDispatch()

  const setEnabled = (entity: string) => {
    dispatch(entitySelectModeSlice.actions.setEntityEnabled(entity))
  }

  const setDisabled = () => {
    dispatch(entitySelectModeSlice.actions.setEntityDisabled())
  }

  const setId = (id: number) => {
    dispatch(entitySelectModeSlice.actions.setId(id))
  }

  const clearSelectedIds = () => {
    dispatch(entitySelectModeSlice.actions.clearSelectedIds())
  }

  return { setEnabled, setDisabled, setId, clearSelectedIds }
}
