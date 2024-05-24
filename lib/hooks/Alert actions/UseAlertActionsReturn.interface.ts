import { type Alert } from '@/lib/features/alert/alert.interface'

export interface UseAlertActionsReturn {
  setAlert: (alert: Alert) => void
  hideAlert: (id: string) => void
  hideAllAlerts: () => void
}
