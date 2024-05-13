import { createSlice } from '@reduxjs/toolkit'
import { EntitySelectMode } from './entitySelectMode.interface'

const initialState: EntitySelectMode = {
  entity: '',
  selectedIds: []
}

export const entitySelectModeSlice = createSlice({
  name: 'editEntity',
  initialState,
  reducers: {
    setEntityEnabled: (state, action) => {
      state.entity = action.payload
    },
    setEntityDisabled: (state) => {
      state.entity = ''
    },
    setId: (state, action) => {
      const selectedIds = state.selectedIds

      if (selectedIds.some((x) => x === action.payload)) {
        state.selectedIds = selectedIds.filter((x) => x !== action.payload)
      } else {
        state.selectedIds = [...selectedIds, action.payload]
      }
    },
    clearSelectedIds: (state) => {
      state.selectedIds = []
    }
  }
})

export default entitySelectModeSlice.reducer

// export const { setEntityEnabled, setEntityDisabled, setId, clearSelectedIds } =
//   entitySelectModeSlice.actions
