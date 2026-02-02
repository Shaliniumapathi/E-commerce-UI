import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Account() {
  return (
    <div className="container mx-auto p-4">
      <div className="md:flex md:gap-6">
        <aside className="md:w-1/4 mb-4 md:mb-0">
          <nav className="bg-white p-4 rounded shadow">
            <ul className="flex flex-col gap-2">
              <li><Link to="profile">Profile</Link></li>
              <li><Link to="orders">Orders</Link></li>
              <li><Link to="addresses">Addresses</Link></li>
            </ul>
          </nav>
        </aside>

        <section className="md:flex-1">
          <Outlet />
        </section>
      </div>
    </div>
  )
}
