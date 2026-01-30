import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function Contact() {
  const submit = (e) => {
    e.preventDefault()
  }
  const [email, setEmail] = React.useState('')
  
  return (
    <>
    <div className='m-4  border-gray-300 rounded-lg p-4'>
      <div className='w-200  h-200 border m-auto rounded-2xl shadow-2xl'>
      <form onSubmit={submit} className="space-y-4">
        <h2 className="text-xl font-bold  ">Feed Back</h2>
            <div>
              <div className="mt-2 flex gap-2">
                <div className="flex items-center px-3 rounded  mx-6">Name :</div>
                <input type='text' onChange={(e) => setEmail(e.target.value)} placeholder="Enter Name" className="flex-1 border rounded px-3 py-2 mx-5" />
              </div>
              <div className="mt-2 flex gap-2">
                <div className="flex items-center px-3 rounded  mx-6">Email ID</div>
                <input type='email' onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email ID" className="flex-1 border rounded px-3 py-2 mx-5" />
              </div>
              <div className="mt-2 flex gap-2">
                <div className="flex items-center px-3 rounded  mx-6">Feed Back</div>
                <textarea onChange={(e) => setEmail(e.target.value)} placeholder="Enter Feed Back" className="flex-1 border rounded px-3 py-2 mx-5" />
              </div>
            </div>
            <div className="m-auto center">
              <button type="submit" className="w-90 py-3 rounded-3xl text-white theme-btn mx-5">Continue</button>
            </div>

          </form>
          </div>
      
    </div>
    </>
  )
}

export default Contact