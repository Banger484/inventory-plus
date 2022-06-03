import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ENTERPRISE_BY_ID, QUERY_ALL_PRODUCTS,QUERY_ENT_USERS } from '../utils/queries';
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
import OrderReceived from '../components/Orders/OrderReceived';
//Reporting
import ReportingDashboard from '../components/Reporting/ReportingDashboard';


//Users
import UserDashboard from '../components/Users/UserDashboard';
import Signup from '../components/Users/Signup';
import Login from '../components/Users/Login';
import AddUser from '../components/Users/AddUser';
import AcceptInvite from '../components/Users/AcceptInvite';
import Roster from "../components/Users/Roster"
import ProductReport from '../components/Reporting/ProductReport';




const Home = () => {
    // getting logged in user
    const user = auth.getProfile()
    // console.log(user)
    // making queries
    const { loading: enterpriseLoading, data: enterpriseData, refetch: enterpriseRefetch } = useQuery(GET_ENTERPRISE_BY_ID, {
    variables: { id: user.data.enterprise}
    })
    console.log(QUERY_ENT_USERS)
    const {loading:rosterLoading,data:rosterData, refetch: rosterRefetch}=useQuery(QUERY_ENT_USERS,{
      variables:{ enterpriseId: user.data.enterprise}
  })



    // setting variables to be passed through props
    let enterpriseName
    let orderGuide
    let products
    let enterpriseId
    let roster
    if(enterpriseData && rosterData) {
      enterpriseRefetch()
      rosterRefetch()
      enterpriseName = enterpriseData.getEnterpriseById.name;
      enterpriseId = enterpriseData.getEnterpriseById._id
      orderGuide = enterpriseData.getEnterpriseById.orderGuide;
      roster = rosterData.getEnterpriseUsers
    }


  return (
    <>
    <Header user={ user.data.name } enterprise={enterpriseName}/>
    <Navbar />
    <main className='home-main-content'>
      <div>
        <div>
          {enterpriseLoading || rosterLoading? (
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
              element={<OrderPurchase user={user} enterpriseId={enterpriseId} orderGuide={orderGuide}/>}
               />
               <Route
              path='/orders/sell-order'
              element={<OrderSell user={user} enterpriseId={enterpriseId} orderGuide={orderGuide}/>}
               />
               <Route
              path='/orders/order-fulfillment'
              element={<OrderFulfillment enterpriseId={enterpriseId}/>}
               />
                <Route
              path='/orders/order-received'
              element={<OrderReceived enterpriseId={enterpriseId}/>}
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
              element={<Roster roster={roster}/>}
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
              path="/"
              />
              <Route
              path='/reporting/product'
              element={<ProductReport  enterpriseId={enterpriseId}/>} 
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
