import { createSlice } from '@reduxjs/toolkit'

const addressesSlice = createSlice({
  name: 'addresses',
  initialState: { items: [] },
  reducers: {
    setAddresses(state, action) { state.items = action.payload },
    addAddress(state, action) { state.items.push(action.payload) },
    updateAddress(state, action) {
      const idx = state.items.findIndex((a) => String(a.id) === String(action.payload.id))
      if (idx > -1) state.items[idx] = action.payload
    },
    removeAddress(state, action) { state.items = state.items.filter((a) => String(a.id) !== String(action.payload)) },
    setDefaultAddress(state, action) {
      state.items = state.items.map((a) => ({ ...a, isDefault: String(a.id) === String(action.payload) }))
    }
  }
})

export const { setAddresses, addAddress, updateAddress, removeAddress, setDefaultAddress } = addressesSlice.actions
export default addressesSlice.reducer
