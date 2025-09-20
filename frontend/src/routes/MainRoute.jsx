import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Products from '../pages/Products'
import Login from '../pages/Login'
import Register from '../pages/register'
import CreateProduct from '../pages/admin/CreateProduct'
import UpdateProduct from '../pages/admin/UpdateProduct'
import ProductDetails from '../pages/ProductDetails'
import UserProfile from '../pages/user/UserProfile'
import Default from '../pages/Default'
import AuthWrapper from './AuthWrapper'
import Cart from '../pages/Cart'

const MainRoute = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />


        <Route
         path="/admin/create-product" 
         element={
         <AuthWrapper>
          <CreateProduct />
         </AuthWrapper>
        } 
         />
        <Route path="/admin/update-product/:id" element={<UpdateProduct />} />
        <Route path="/products/:id" element={<ProductDetails />} />
         <Route path="/profile" element={<UserProfile />} />
           <Route path="*" element={<Default />} />

    </Routes>
  )
}

export default MainRoute