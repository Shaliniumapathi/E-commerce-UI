import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrderById } from '../features/user/ordersSlice'
import Stepper from '../Components/Stepper'

export default function OrderDetails() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const order = useSelector((s) => s.orders.current)

  useEffect(() => {
    const token = window.localStorage.getItem('token') || null
    dispatch(fetchOrderById({ id, token }))
  }, [dispatch, id])

  if (!order) return <div className="p-6">Loading...</div>

  return (
    <div>
      <h2 className="text-xl font-semibold">Order #{order.id}</h2>
      <div className="mt-3 bg-white p-4 rounded shadow">
        <div className="mb-4">Date: {new Date(order.date).toLocaleString()}</div>
        <div className="mb-4">Total: ${order.total}</div>
        <div className="mb-4">Status: {order.status}</div>
        <Stepper steps={[ 'Placed', 'Packed', 'Shipped', 'Delivered' ]} current={order.statusIndex || 0} />

        <h3 className="mt-4 font-semibold">Items</h3>
        <ul className="mt-2">
          {(order.items || []).map((it) => (
            <li key={it.id} className="flex justify-between border-b py-2">{it.title} <span>${it.price} × {it.quantity}</span></li>
          ))}
        </ul>
      </div>
    </div>
  )
}
