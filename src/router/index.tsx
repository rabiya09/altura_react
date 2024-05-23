import React from 'react'
import { Routes , Route, Navigate, Outlet } from 'react-router-dom';
import Footer from '../pages/common/Footer';
import Header from '../pages/common/Header';
import Nav from '../pages/common/Nav';
import Cart from '../pages/components/Cart';
import Chairs from '../pages/components/Categories/Chairs';
import Lighting from '../pages/components/Categories/Lighting';
import Sofas from '../pages/components/Categories/Sofas';
import Tables from '../pages/components/Categories/Tables';
import Checkout from '../pages/components/Checkout';
import Home  from '../pages/components/Home';
import ProductList from '../pages/components/ProductList';
import ProductShopPage from '../pages/components/ProductShopPage';
import ShopBedRoomProducts from '../pages/components/ShopBedRoomProducts';
import ShopHomeOfficeProducts from '../pages/components/ShopHomeOfficeProducts';
import NewIn from '../pages/components/NewIn';
import OrderConfirmation from '../pages/components/OrderConfirmation';
import OrderReview from '../pages/components/OrderReview';
import SelectPayment from '../pages/components/SelectPayment';
import { LoginPage } from '../pages/components/LoginPage';
import RegistrationForm from '../pages/components/RegistrationForm';
import ProtectedRoutes from '../pages/common/PrivateRoute'
import Dashboard from '../pages/components/Dashboard';
import BedRoom from '../pages/components/BedRoom';

const Routers = () => {
    return (<Routes> 
            <Route path="/header" element={<Header/>} />
            <Route path="/nav" element={<Nav/>} />
            <Route path="/" element={<Home/>} />
            <Route path="/bed-room" element={<BedRoom title={''} description={''} readmore={''}/>} />
            <Route path="/product-list" element={<ProductList/>} />     
            <Route path="/product-details/:id" element={<ProductShopPage />} />   
            <Route path="/cart" element={<Cart />} />
            <Route path="/nav" element={<Nav />} />
            <Route path="/new-in" element={<NewIn />} />
            <Route path="/sofas" element={<Sofas />} />
            <Route path="/chairs" element={<Chairs />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/lighting" element={<Lighting />} />
            <Route path="/login" element={<LoginPage />} />  
            <Route path="/" element={<ProtectedRoutes lvps="/checkout"/>}>
                <Route path="/checkout" element={<Checkout />} />  
            </Route> 
            <Route path="/register" element={<RegistrationForm />} />   
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/select-payment" element={<SelectPayment />} />
            <Route path="/order-review" element={<OrderReview />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/shop-all-home-office" element={<ShopHomeOfficeProducts />} />
            <Route path="/shop-all-bed-room" element={<ShopBedRoomProducts />} />
            <Route path="/footer" element={<Footer/>} />          
            </Routes>
    )
}

export default Routers;