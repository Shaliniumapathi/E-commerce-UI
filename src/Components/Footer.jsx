import React from 'react'
import Logo from '../Assets/Logo.png'
import { Facebook, Instagram, Twitter, Youtube, PhoneCall, MapPin , Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className='bg-slate-900 shadow-md'>
        <div className='container mx-auto px-4'>
            <div className='min-h-16'>
                <div className='flex justify-between items-center flex-col md:flex-row py-4'>
                    <h1 className='text-white text-4xl font-bold'>Subscribe Our NewsLetter</h1>
                    <form className='md:w-1/3 w-full mt-8 md:mt-0 relative bg-white'>
                        <input type="text" placeholder='Enter your Email' className='py-4 px-4 shadow-md w-full'/>
                        <button className="bg-amber-500 py-3 px-4 rounded-full absolute right-3 top-1  hover:bg-orange-400 transition-all ease-in">Submit</button>
                    </form>
                </div> 

            </div>
        </div>
        
        <div className='bg-slate-800 text-white py-8'>
            <div className='container mx-auto px-4'> 
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
                    <div>
                        <img src={Logo} alt="Logo" className='my-4 w-50'/>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste maiores quasi, unde aperiam accusamus porro minus, perspiciatis repellendus sapiente iure molestias blanditiis ullam eaque perferendis quis, aut id vero aspernatur!</p>
                     <div className='flex items-center gap-3 py-4'>
                        <Facebook size={40} className='bg-white text-black rounded-md p-2' />
                    
                        <Twitter size={40} className='bg-white text-black rounded-md p-2' />
                    
                        <Youtube size={40} className='bg-white text-black rounded-md p-2' />
                    
                        <Instagram size={40} className='bg-white text-black rounded-md p-2' />
                    </div>
                  
                    </div>
                   
                    <div className=' mx-auto'>
                        <h2 className='text-2xl font-semibold my-4 '>Pages</h2>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li>
                                <Link to="/FAQ's">FAQ'S</Link>
                            </li>
                            <li>
                                <Link to="/contact">Contact</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className='text-2xl font-semibold my-4 '>Categories</h2>
                        <ul>
                            <li>
                                <Link to="/">All</Link>
                            </li>
                            <li>
                                <Link to="/">Western Wear</Link>
                            </li>
                            <li>
                                <Link to="/">Traditional Wear</Link>
                            </li>
                            <li>
                                <Link to="/">Kurties</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className='text-2xl font-semibold my-4 '>Get In Touch</h2>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                           <PhoneCall size={18} /><a href="tel:9288254315">9288254315</a>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <MapPin size={80} strokeWidth={1.5} /> <p># No: 05 / x2 , Hari Om 2nd Street,Phase III,Sathuvachari, Vellore,Tamil Nadu, India-632009.Land Mark: Near Water Tank</p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Mail size={18}/><Link to="mailto:connect123@gmail.com">connect123@gmail.com</Link>
                        </div>
                    </div>
                </div>

            </div>

        </div>
        <div className='container mx-auto px-4 text-center text-white py-4'>
            <p>CopyRight &copy; 2025</p>
        </div>

    </footer>
  )
}

export default Footer