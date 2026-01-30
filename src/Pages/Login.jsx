import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import image from "../assets/Images/off-saree.webp"
import image1 from "../assets/Images/top-1.webp"
import image2 from "../assets/Images/western-01.webp"

export default function LoginPage() {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const from = (location.state && location.state.from) || '/'
  const checkout = location.state && location.state.checkout

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please enter email and password')
      return
    }

    // dispatch login success — adapt to your auth flow
    dispatch({ type: 'user/loginSuccess', payload: { isLoggedIn: true, user: { email } } })

    // redirect back to where we came from or to checkout
    if (checkout) navigate('/checkout')
    else navigate(from)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden md:flex">
        <div className="hidden md:block md:w-1/2 theme-bg p-6 text-white">
          <div className="flex flex-col h-full justify-between">
            <div className="flex items-center gap-3">
              <img src={image} alt="thumb-1" className="w-24 h-24 rounded object-cover" />
              <img src={image1} alt="thumb-2" className="w-24 h-24 rounded object-cover" />
              <img src={image2} alt="thumb-3" className="w-24 h-24 rounded object-cover" />
              
            </div>
            <div className="mt-auto">
              <h3 className="text-3xl font-semibold">Great Quality<br/>Lowest prices<br/>Trust to Purchase</h3>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-2xl font-semibold mb-2">Sign Up to view your cart items</h2>
          <p className="text-sm text-gray-500 mb-4">Enter your email to continue.</p>

          {error && <div className="text-sm text-red-600 mb-2">{error}</div>}

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-xs text-gray-500">Country</label>
              <div className="mt-2 flex gap-2">
                <div className="flex items-center px-3 rounded border border-gray-200">email</div>
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" className="flex-1 border rounded px-3 py-2" />
              </div>
            </div>

            <div className="mt-4">
              <button type="submit" className="w-full py-3 rounded text-white theme-btn">Continue</button>
            </div>

            <div className="text-center text-sm text-gray-500">or sign in with phone number</div>

            <div className="mt-2 flex justify-end">
              <button type="button" onClick={() => navigate(from)} className="text-sm text-gray-700">Skip</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
