import { ApiResponse } from '@/interfaces/apiResponse'
import { OperationResult } from '@/interfaces/return/OperationResult'
import { useState } from 'react'

// This hook is used to show a dialog, get a response from it, and handle the loading state.
// Useful for Create, Update, Delete operations.

export const useDialogShowAndResponse = () => {
  const [response, setResponse] = useState<ApiResponse<
    OperationResult<number>
  > | null>(null)
  const [showCreatedDialog, setShowCreatedDialog] = useState<boolean>(false)
  const [btnClicked, setBtnClicked] = useState<boolean>(false) // Used for loading

  const handleSetResponse = (
    response: ApiResponse<OperationResult<number>> | null
  ): void => {
    setResponse(response)
  }

  const handleSetShowCreatedDialog = (value: boolean): void => {
    setShowCreatedDialog(value)
  }

  const handleSetBtnClicked = (value: boolean): void => {
    setBtnClicked(value)
  }

  return {
    response,
    showCreatedDialog,
    btnClicked,
    handleSetResponse,
    handleSetShowCreatedDialog,
    handleSetBtnClicked
  }
}
