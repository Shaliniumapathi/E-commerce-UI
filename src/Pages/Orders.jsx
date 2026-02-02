import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders } from '../features/user/ordersSlice'
import { Link } from 'react-router-dom'
import Stepper from '../Components/Stepper'

export default function Orders() {
  const dispatch = useDispatch()
  const orders = useSelector((s) => s.orders.items || [])
  const loading = useSelector((s) => s.orders.loading)

  useEffect(() => {
    const token = (window.localStorage.getItem('token')) || null
    dispatch(fetchOrders(token))
  }, [dispatch])

  if (loading) return <div className="p-6">Loading orders...</div>

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Orders</h2>
      <div className="grid gap-3">
        {orders.map((o) => (
          <Link key={o.id} to={`./${o.id}`} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <div className="font-semibold">Order #{o.id}</div>
              <div className="text-sm text-gray-500">{new Date(o.date).toLocaleString()} • ${o.total}</div>
            </div>
            <div style={{ minWidth: 220 }}>
              <Stepper steps={[ 'Placed', 'Packed', 'Shipped', 'Delivered' ]} current={o.statusIndex || 0} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
