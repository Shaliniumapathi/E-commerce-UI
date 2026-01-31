import React from 'react'
import { BrowserRouter, Routes as Routs, Route } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import ProductDetails from './Pages/ProductDetails.jsx'
import CardPage from './pages/CardPage.jsx'
import Navbar from './Components/Navbar.jsx'
import Login from './Pages/Login.jsx'
import About from './Pages/About.jsx' 
import FAQ from './Pages/FAQ.jsx'
import './App.css'
import { Provider } from 'react-redux'
import {store} from './App/Store.js'
import Contact from './Pages/Contact.jsx'


function App() {
 

  return (
    <Provider store={store}>
      <BrowserRouter>
    <Navbar/>
      <Routs>
        <Route path='/' element={<Home/>} />
        <Route path="/cart" element={<CardPage/>} />
        <Route path="/product/:id" element={<ProductDetails/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/faq" element={<FAQ/>}/>
       
      </Routs>
    </BrowserRouter>
    </Provider>
  )
}

export default App
