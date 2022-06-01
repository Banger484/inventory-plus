import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ENTERPRISE_BY_ID, QUERY_ALL_PRODUCTS } from '../utils/queries';
import auth from "../utils/auth"
import { Route, Routes } from 'react-router-dom'
//Style import
import './Home.css'

//Component Imports
//Layout
import Dashboard from '../components/Layout/Dashboard';
import Header from '../components/Layout/Header';
import Navbar from '../components/Layout/Navbar';
//Products
import ProductDashboard from '../components/Products/ProductDashboard';
import AddProduct from '../components/Products/AddProduct';
import ProductGuide from '../components/Products/ProductGuide';
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
import UserDashboard from '../components/Users/UserDashboard';
import Signup from '../components/Users/Signup';
import Login from '../components/Users/Login';
import AddUser from '../components/Users/AddUser';
import AcceptInvite from '../components/Users/AcceptInvite';
import Roster from "../components/Users/Roster"




const Home = () => {
    // getting logged in user
    const user = auth.getProfile()
    console.log(user)
    // making queries
    const { loading: productsLoading, data: productsData} = useQuery(QUERY_ALL_PRODUCTS)
    const { loading: enterpriseLoading, data: enterpriseData } = useQuery(GET_ENTERPRISE_BY_ID, {
    variables: { id: user.data.enterprise}
    })
    // setting variables to be passed through props
    let enterpriseName
    let orderGuide
    let products
    let enterpriseId
    console.log(enterpriseData)
    if(enterpriseData && productsData) {
      enterpriseName = enterpriseData.getEnterpriseById.name;
      enterpriseId = enterpriseData.getEnterpriseById._id
      orderGuide = enterpriseData.getEnterpriseById.orderGuide;
      products = productsData.allProducts
    }
  return (
    <>
    <Header user={ user.data.name } enterprise={enterpriseName}/>
    <Navbar />
    <main className='home-main-content'>
      <div>
        <div>
          {enterpriseLoading || productsLoading ? (
            <div>Loading...</div>
          ) : (
            <Routes>
               <Route
              path='/products'
              element={<ProductDashboard />} 
              />
               <Route
              path='/products/add-product'
              element={<AddProduct products={products}/>} 
              />
               <Route
              path='/products/product-guide'
              element={<ProductGuide products={products} />} 
              />
              <Route
              path='/orders'
              element={<OrderDashboard />}
               />
               <Route
              path='/orders/purchase-order'
              element={<OrderPurchase orderGuide={orderGuide} />}
               />
               <Route
              path='/orders/sell-order'
              element={<OrderSell orderGuide={orderGuide} />}
               />
               <Route
              path='/orders/order-fulfillment'
              element={<OrderFulfillment />}
               />
               <Route
              path='/orders/order-guide'
              element={<OrderGuide enterpriseId={enterpriseId} orderGuide={orderGuide} products={products}/>}
               />
               <Route
              path='/orders/order-history'
              element={<OrderHistory />}
               />
               <Route 
                path="/users" 
                element={<UserDashboard />} 
              />
              <Route 
                path="/users/add-user" 
                element={<AddUser />} 
              />
              <Route
              path="users/roster"
              element={<Roster/>}
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
                path="/invite/*" 
                element={<AcceptInvite />} 
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
