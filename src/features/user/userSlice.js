import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Example async thunk - replace URL with real API endpoints
export const fetchProfile = createAsyncThunk('user/fetchProfile', async (token) => {
  const res = await fetch('/api/profile', { headers: { Authorization: `Bearer ${token}` } })
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
})

const initialState = {
  profile: null,
  token: null,
  loading: false,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload
    },
    logout(state) {
      state.token = null
      state.profile = null
    },
    updateProfileLocal(state, action) {
      state.profile = { ...(state.profile || {}), ...action.payload }
    },
    setProfile(state, action) {
      state.profile = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchProfile.fulfilled, (state, action) => { state.loading = false; state.profile = action.payload })
      .addCase(fetchProfile.rejected, (state, action) => { state.loading = false; state.error = action.error.message })
  }
})

export const { setToken, logout, updateProfileLocal, setProfile } = userSlice.actions
export default userSlice.reducer
