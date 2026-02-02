import React from 'react'
import '../index.css'
import Footer from '../Components/Footer.jsx'
import ProductGrid from '../Components/ProductGrid.jsx'
import { useDispatch } from 'react-redux';
import { setSearchCategory } from '../features/products/ProductSlice';





const Categories = [
  "All",
  'Western Wear',
  'Traditional Wear',
  'Kurties',
]

function Home() {
const dispatch = useDispatch();

  return (
    <div>
  <div className="bg h-screen flex items-top">
    <div>
    <h1 className="text-black text-xl">Happy  <span>Shopping</span></h1>
  </div>
  </div>
  <div className='container mx-auto my-10 px-4'>
    <div className='flex gap-4'>
      {Categories.map((cat)=>{
        return(
          
      <button className='bg-amber-400 py-2 px-4 rounded-md text-black active:scale-105 hover:bg-orange-400 transition-all ease-in'
       key={cat} onClick={() => dispatch(setSearchCategory(cat))}
       >
      {cat} 
      </button>
        );
        
      })}
    </div>
    <ProductGrid/>
  </div>
  <Footer/>
</div>


  )
}


export default Home