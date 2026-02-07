import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {UserRound, ShoppingCart, Search, X , Heart} from 'lucide-react'
import Logo from '../assets/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerms } from '../features/products/ProductSlice';
import { clearSearch } from '../features/products/ProductSlice';





function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const searchTerm = useSelector((state) => state.products.searchTerms); 
    const suggestions = useSelector((state) => state.products.suggestions);

    //user toggle function
    const handleUser =()=>{
        setIsOpen(!isOpen);
    }

    
  return (
    <header className='bg-white shadow-md'>
        <>
        <div className='py-4 shadow-md'>
            <ul className='container mx-auto flex flex-wrap justify-between md:flex-row px-4 md:px-2 items-center'>
               <div className='flex gap-4'>
                 <li>
                    <Link to="/">Home</Link>
                 </li>
                 <li>
                    <Link to="/about">About</Link>
                 </li>
                 <li>
                    <Link to="/faq">FAQ'S</Link>
                 </li>
                 <li>
                    <Link to="/contact">Contact</Link>
                 </li>
               </div>
               <div className={`${isOpen ? "flex flex-col right-0 absolute md:right-4 top-12 z-0 bg-zinc-100 p-4 gap-4" : "hidden"}`}>
                <li>
                    <Link to="/">Sign In</Link>
                </li>
                <li>
                    <Link to="/account">My Account</Link>
                </li>
               </div>
               <UserRound size={40} className='bg-gray-200 p-2 text-black rounded-4xl cursor-pointer'  onClick={handleUser}/>
            </ul>
        </div>
        <nav className='flex justify-between items-center container mx-auto py-8 md:py-6'>
            <div className='flex items-center'>
                <Link to="/" className='bg-gray-700 rounded py-2 px-4'>
                <img src={Logo} alt="Logo" width={150}/>
                </Link>
            </div>
          <form className="w-1/2 sm:block hidden relative">
  <div className="relative w-full">
    {/* Search Icon */}
    <Search
      size={18}
      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
    />

    <input
      type="text"
      placeholder="Search Products"
      className="bg-zinc-100 rounded-md border border-zinc-200
                 focus:outline-none py-3 pl-10 pr-12 w-full"
      value={searchTerm}
      onChange={(e) => dispatch(setSearchTerms(e.target.value))}
    />

    {/* Clear Button */}
    <button
      type="button"
      onClick={() => dispatch(clearSearch())}
      className={`absolute right-3 top-1/2 -translate-y-1/2 transition-opacity
        ${searchTerm ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <X size={16} className="text-gray-600" />
    </button>
  </div>

  {/* Suggestions Dropdown */}
  {searchTerm && (
    <div className="absolute top-full left-0 w-full bg-white border
                    border-gray-200 rounded-md shadow-lg mt-1 z-50">
      {suggestions.length > 0 ? (
        suggestions.slice(0, 8).map((item) => (
          <div
            key={item.id}
            onClick={() => dispatch(setSearchTerms(item.title))}
            className="flex items-center gap-3 px-4 py-3 cursor-pointer
                       hover:bg-gray-100"
          >
            <Search size={16} className="text-gray-400" />
            <span>{item.title}</span>
            <span className="text-xs text-gray-500 ml-auto">
              {item.category}
            </span>
          </div>
        ))
      ) : (
        <div className="px-4 py-3 text-gray-500">
          No results found
        </div>
      )}
    </div>
  )}
</form>


            <div className="flex items-center gap-3">
  <Link to="/cart">
    <ShoppingCart
      size={54}
      className="bg-gray-100 rounded-full cursor-pointer px-3 py-2"
    />
  </Link>

  <Link to="/wishlist">
    <Heart
      size={54}
      className="bg-gray-100 rounded-full cursor-pointer px-3 py-2 text-red-500"
    />
  </Link>
</div>
        </nav>
        </>
    </header>
  )
}


export default Navbar