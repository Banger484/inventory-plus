import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USERS, QUERY_ALL_PRODUCTS } from '../utils/queries';
import auth from "../utils/auth"
import { Route, Routes } from 'react-router-dom'

//Component Imports
import Dashboard from '../components/Layout/Dashboard';
import Header from '../components/Layout/Header';
//Products
import ProductDashboard from '../components/Products/ProductDashboard';
import AddProduct from '../components/Products/AddProduct';
//Orders
import OrderDashboard from '../components/Orders/OrderDashboard';
import OrderFulfillment from '../components/Orders/OrderFulfillment'
import OrderPurchase from '../components/Orders/OrderPurchase'
import OrderSell from '../components/Orders/OrderSell'
import OrderGuide from '../components/Orders/OrderGuide'
import OrderHistory from '../components/Orders/OrderHistory'
//Reporting
import ReportingDashboard from '../components/Reporting/ReportingDashboard';


//Users
import UserList from '../components/UserList';
import Signup from './Signup';
import Login from './Login';





const Home = () => {
  console.log('in home');
  const { loading, data } = useQuery(QUERY_USERS);

  const users = data?.users || [];
  const userInfo = {
    enterpriseName: "Bret's shop"
  }
  // const userInfo = auth.getProfile()
  // console.log(userInfo);

  // console.log(auth.loggedIn())
  // console.log(auth.getToken())
  // console.log(auth.getProfile())
  return (
    <>
    <Header enterprise={userInfo.enterpriseName}/>
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Routes>
              <Route
              path='/users'
              element={<UserList
                users={users}
                title="Here's the current roster of users..."
              />}
               />
               <Route
              path='/products'
              element={<ProductDashboard />} 
              />
               <Route
              path='/products/add-product'
              element={<AddProduct />} 
              />
               <Route
              path='/products/update=product'
              element={<ProductDashboard />} 
              />
               <Route
              path='/products/product-guide'
              element={<ProductDashboard />} 
              />
              <Route
              path='/orders'
              element={<OrderDashboard />}
               />
               <Route
              path='/orders/purchase-order'
              element={<OrderPurchase />}
               />
               <Route
              path='/orders/sell-order'
              element={<OrderSell />}
               />
               <Route
              path='/orders/order-fulfillment'
              element={<OrderFulfillment />}
               />
               <Route
              path='/orders/order-guide'
              element={<OrderGuide />}
               />
               <Route
              path='/orders/order-history'
              element={<OrderHistory />}
               />
               <Route
              path='/reporting'
              element={<ReportingDashboard />}
               />
              <Route 
                path="/signup" 
                element={<Signup />} 
              />
              <Route 
                path="/login" 
                element={<Login />} 
              />
              <Route
              path='/'
              element={<Dashboard />} 
              />
            </Routes> 
          
          )}
        </div>
      </div>
    </main>
    
    </>
  );
};

export default Home;
