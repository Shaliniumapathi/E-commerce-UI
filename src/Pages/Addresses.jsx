import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addAddress, removeAddress, updateAddress, setDefaultAddress, setAddresses } from '../features/user/addressesSlice'
import { notify } from '../Components/Toast'

function validate(addr) {
  if (!addr.name || !addr.line1 || !addr.city || !addr.postal) return false
  return true
}

export default function Addresses() {
  const dispatch = useDispatch()
  const items = useSelector((s) => s.addresses.items || [])
  const [form, setForm] = useState({ id: null, name: '', line1: '', line2: '', city: '', postal: '', country: '' })

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('addresses') || '[]') || []
    dispatch(setAddresses(stored))
  }, [dispatch])

  useEffect(() => { localStorage.setItem('addresses', JSON.stringify(items)) }, [items])

  const edit = (a) => setForm(a)

  const save = () => {
    if (!validate(form)) return notify('Please fill required fields', 'error')
    if (form.id) dispatch(updateAddress(form))
    else dispatch(addAddress({ ...form, id: Date.now() }))
    setForm({ id: null, name: '', line1: '', line2: '', city: '', postal: '', country: '' })
    notify('Saved')
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Addresses</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="bg-white p-4 rounded shadow">
            <label className="block">Name <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border rounded px-2 py-1 mt-1" /></label>
            <label className="block mt-2">Address Line 1 <input value={form.line1} onChange={(e) => setForm({ ...form, line1: e.target.value })} className="w-full border rounded px-2 py-1 mt-1" /></label>
            <label className="block mt-2">Address Line 2 <input value={form.line2} onChange={(e) => setForm({ ...form, line2: e.target.value })} className="w-full border rounded px-2 py-1 mt-1" /></label>
            <label className="block mt-2">City <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full border rounded px-2 py-1 mt-1" /></label>
            <label className="block mt-2">Postal <input value={form.postal} onChange={(e) => setForm({ ...form, postal: e.target.value })} className="w-full border rounded px-2 py-1 mt-1" /></label>
            <label className="block mt-2">Country <input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="w-full border rounded px-2 py-1 mt-1" /></label>

            <div className="mt-3 flex gap-2">
              <button onClick={save} className="bg-indigo-600 text-white px-4 py-2 rounded">Save</button>
              <button onClick={() => setForm({ id: null, name: '', line1: '', line2: '', city: '', postal: '', country: '' })} className="px-4 py-2 border rounded">Cancel</button>
            </div>
          </div>
        </div>

        <div>
          <div className="space-y-3">
            {items.map((a) => (
              <div key={a.id} className="bg-white p-3 rounded shadow flex justify-between items-start">
                <div>
                  <div className="font-semibold">{a.name} {a.isDefault ? <span className="text-sm text-indigo-600">(Default)</span> : null}</div>
                  <div className="text-sm mt-1">{a.line1}{a.line2 ? ', ' + a.line2 : ''}</div>
                  <div className="text-sm">{a.city} {a.postal} {a.country}</div>
                </div>
                <div className="flex flex-col gap-2">
                  <button onClick={() => dispatch(setDefaultAddress(a.id))} className="text-sm text-indigo-600">Set default</button>
                  <button onClick={() => edit(a)} className="text-sm">Edit</button>
                  <button onClick={() => dispatch(removeAddress(a.id))} className="text-sm text-red-600">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
