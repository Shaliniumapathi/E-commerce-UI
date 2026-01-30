import React from 'react'
import Hero from '../assets/banner-image.avif'
import Img1 from '../assets/Images/co-order-set-1.avif'
import Img2 from '../assets/Images/shopping1.webp'
import Img3 from '../assets/Images/off-saree-1.webp'
import Img4 from '../assets/Images/lehanga.webp'
import VerticalCarouselV2 from '../Components/VerticalCarouselV2'
import { Link } from 'react-router-dom'
import Footer from '../Components/Footer.jsx'
import '../App.css';

export default function About() {
  return (
    <>
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Clean Hero */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden md:flex items-stretch">
          <div className="md:w-1/2 relative">
            <img src={Hero} alt="hero" className="w-full h-72 md:h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
          </div>
          <div className="p-10 md:w-1/2 flex flex-col justify-center space-y-4">
            <h1 className="text-4xl font-extrabold leading-tight">About Our Brand</h1>
            <p className="text-gray-600 max-w-xl">Curating beautiful, high-quality products with care. We combine timeless design with thoughtful sourcing to bring you collections that last.</p>
            <div className="flex gap-4">
              <Link to="/contact" className="inline-block">
                <button className="px-5 py-3 rounded-lg theme-btn text-white shadow">Get In Touch</button>
              </Link>
              <Link to="/" className="inline-block">
                <button className="px-5 py-3 rounded-lg border hover:bg-gray-50">Shop Collections</button>
              </Link>
            </div>
          </div>
        </div>

        {/* Since section: text left, images right (replaces single image box) */}
        <section className="mt-12 bg-white rounded-lg p-6 shadow-sm">
          <div className="md:flex md:items-center md:gap-8">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4">Since 2010 — Our Story</h2>
              <p className="text-gray-600 mb-4">What started as a small boutique has grown into a carefully curated marketplace. We focus on quality, ethical sourcing, and designs that resonate with real life.</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-3"><span className="font-semibold">•</span> Thoughtful curation across categories</li>
                <li className="flex items-start gap-3"><span className="font-semibold">•</span> Transparent, sustainable sourcing</li>
                <li className="flex items-start gap-3"><span className="font-semibold">•</span> Customer-first policies and support</li>
              </ul>
            </div>

            <div className="md:w-1/2 mt-6 md:mt-0">
              {/* Vertical carousel uses one visible card at a time, supports scroll and touch */}
              <VerticalCarouselV2 images={[Img1, Img2, Img3, Img4]} height={184} autoplay={false} />
            </div>
          </div>
        </section>

        {/* Why choose us */}
        <section className="mt-12 bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Why customers choose us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded border hover:shadow-md transition">
              <h4 className="font-semibold mb-2">Curated Selection</h4>
              <p className="text-gray-600">Only the best pieces make it to our store — quality over quantity.</p>
            </div>
            <div className="p-6 rounded border hover:shadow-md transition">
              <h4 className="font-semibold mb-2">Customer First</h4>
              <p className="text-gray-600">Fast support and hassle-free returns keep customers happy.</p>
            </div>
            <div className="p-6 rounded border hover:shadow-md transition">
              <h4 className="font-semibold mb-2">Secure Payments</h4>
              <p className="text-gray-600">Multiple payment options with secure checkout.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="mt-10 text-center">
          <h3 className="text-2xl font-semibold">Ready to explore?</h3>
          <p className="text-gray-600 mb-6">Browse our latest collections and discover your next favorite item.</p>
          <Link to="/">
            <button className="px-6 py-3 rounded-lg theme-btn text-white shadow-lg">Start Shopping</button>
          </Link>
        </div>
      </div>
    </div>
     <Footer/>
     </>
  )
}
