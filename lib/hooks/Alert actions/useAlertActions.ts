import { type Alert } from '@/lib/features/alert/alert.interface'
import { useAppDispatch } from '../hooks'
import { alertSlice } from '@/lib/features/alert/alertSlice'
import { type UseAlertActionsReturn } from './UseAlertActionsReturn.interface'

export const useAlertActions = (): UseAlertActionsReturn => {
  const dispatch = useAppDispatch()

  const setAlert = (alert: Alert): void => {
    dispatch(alertSlice.actions.setAlert(alert))
  }

  const hideAlert = (): void => {
    dispatch(alertSlice.actions.hideAlert())
  }

  return {
    setAlert, hideAlert
  }
}
