import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AvatarUploader from '../Components/AvatarUploader'
import { updateProfileLocal } from '../features/user/userSlice'
import { notify } from '../Components/Toast'

export default function Profile() {
  const dispatch = useDispatch()
  const profile = useSelector((s) => s.user && s.user.profile) || {}
  const [form, setForm] = useState({ name: '', email: '', phone: '', avatar: '' })

  useEffect(() => { setForm({ name: profile.name || '', email: profile.email || '', phone: profile.phone || '', avatar: profile.avatar || '' }) }, [profile])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Basic validation
    if (!form.name || !form.email) return notify('Name and email required', 'error')
    dispatch(updateProfileLocal(form))
    notify('Profile updated')
    // TODO: call API to persist
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Profile</h2>

      <form onSubmit={handleSubmit} className="grid gap-3 max-w-lg">
        <div className="flex items-center gap-4">
          <AvatarUploader src={form.avatar} onUploaded={(data) => setForm((s) => ({ ...s, avatar: data }))} />
        </div>

        <label>
          Name
          <input value={form.name} onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} className="w-full border rounded px-2 py-1 mt-1" />
        </label>

        <label>
          Email
          <input value={form.email} onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))} className="w-full border rounded px-2 py-1 mt-1" />
        </label>

        <label>
          Phone
          <input value={form.phone} onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))} className="w-full border rounded px-2 py-1 mt-1" />
        </label>

        <div className="flex gap-2">
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Save</button>
        </div>
      </form>
    </div>
  )
}
