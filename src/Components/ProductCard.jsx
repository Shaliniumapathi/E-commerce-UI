import React from 'react'
import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  const thumb = (product.images && product.images[0]) || product.image || null

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className='bg-white shadow rounded-md cursor-pointer overflow-hidden hover:shadow-md transition-shadow'>
        {thumb ? (
          <img src={thumb} alt={product.title} className='w-full h-72 object-cover' />
        ) : (
          <div className='w-full h-72 bg-zinc-100 flex items-center justify-center text-gray-500'>No Image</div>
        )}

        <div className='bg-gray-50 p-4'>
          <h2 className='text-lg font-semibold my-2'>{product.title.length > 40 ? product.title.substring(0, 40) + '...' : product.title}</h2>
          <p className='text-sm text-zinc-500 border-b-2 pb-4'>{product.description ? (product.description.length > 70 ? product.description.substring(0, 70) + '...' : product.description) : ''}</p>
          <div className='flex justify-between mt-4 items-center'>
            <p className='text-lg font-semibold'>${product.price}</p>
            <p className='text-sm text-indigo-600'>View Details</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard