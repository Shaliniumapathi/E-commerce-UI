import React from 'react'
import Product from '../ProductsContent'
import ProductCard from './ProductCard.jsx'
import { useSelector } from 'react-redux';

function ProductGrid() {
  const products = useSelector((state) => state.products.filterItem);
  return (
    <>
    <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16 my-24'>
        {products.map((productItems)=>{
            return(
            <ProductCard key={productItems.id} product={productItems}/>
            )
        })}
    </div>
    </>
  )
}

export default ProductGrid