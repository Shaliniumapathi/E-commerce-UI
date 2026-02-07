import React from 'react'
import { BrowserRouter, Routes as Routs, Route } from 'react-router-dom'
import Home from './Pages/Home.jsx'   
import ProductDetails from './Pages/ProductDetails.jsx'
import CardPage from './Pages/CardPage.jsx'
import Navbar from './Components/Navbar.jsx'
import Login from './Pages/Login.jsx'
import About from './Pages/About.jsx' 
import Wishlist from './Pages/Wishlist.jsx' 
import FAQ from './Pages/FAQ.jsx'
import Account from './Pages/Account.jsx'
import Profile from './Pages/Profile.jsx'
import Orders from './Pages/Orders.jsx'
import OrderDetails from './Pages/OrderDetails.jsx'
import Addresses from './Pages/Addresses.jsx'
import ProtectedRoute from './Components/ProtectedRoute.jsx'
import ToastContainer from './Components/Toast.jsx'
import './App.css'
import { Provider } from 'react-redux'
import {store} from './App/Store.js'
import Contact from './Pages/Contact.jsx'
// import { useEffect } from "react";
// import Kursor from "kursor";
// import "kursor/dist/kursor.css";

// function App() {
//   useEffect(() => {
//     new Kursor({
//       type: 4,
//     });
//   }, []);}

function App() {
 

  return (
    <Provider store={store}>
      <BrowserRouter>
    <Navbar/>
    <ToastContainer />
      <Routs>
        <Route path='/' element={<Home/>} />
        <Route path="/cart" element={<CardPage/>} />
        <Route path="/wishlist" element={<Wishlist/>} />
        <Route path="/product/:id" element={<ProductDetails/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/account" element={<Account/>}>
          <Route index element={<Profile/>} />
          <Route path="profile" element={<Profile/>} />
          <Route path="orders" element={<Orders/>} />
          <Route path="orders/:id" element={<OrderDetails/>} />
          <Route path="addresses" element={<Addresses/>} />
        </Route>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/faq" element={<FAQ/>}/>
       
      </Routs>
    </BrowserRouter>
    </Provider>
  )
}


export default App
