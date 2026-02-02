import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (token) => {
  const res = await fetch('/api/orders', { headers: { Authorization: `Bearer ${token}` } })
  if (!res.ok) throw new Error('Failed to fetch orders')
  return res.json()
})

export const fetchOrderById = createAsyncThunk('orders/fetchOrderById', async ({ id, token }) => {
  const res = await fetch(`/api/orders/${id}`, { headers: { Authorization: `Bearer ${token}` } })
  if (!res.ok) throw new Error('Failed to fetch order')
  return res.json()
})

const ordersSlice = createSlice({
  name: 'orders',
  initialState: { items: [], current: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (s) => { s.loading = true; s.error = null })
      .addCase(fetchOrders.fulfilled, (s, a) => { s.loading = false; s.items = a.payload })
      .addCase(fetchOrders.rejected, (s, a) => { s.loading = false; s.error = a.error.message })
      .addCase(fetchOrderById.pending, (s) => { s.loading = true; s.error = null })
      .addCase(fetchOrderById.fulfilled, (s, a) => { s.loading = false; s.current = a.payload })
      .addCase(fetchOrderById.rejected, (s, a) => { s.loading = false; s.error = a.error.message })
  }
})

export default ordersSlice.reducer
