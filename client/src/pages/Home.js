import React from "react";
import { useQuery } from "@apollo/client";
import { groupOrders, groupSales } from "../utils/remodeledData";
import {
  GET_ENTERPRISE_BY_ID,
  QUERY_ALL_PRODUCTS,
  QUERY_ENT_USERS,
  GET_INCOMING_ITEMS,
  GET_OPEN_SALES,
} from "../utils/queries";
import auth from "../utils/auth";
import { Route, Routes } from "react-router-dom";
//Style import
import "./Home.css";

//Component Imports
//Layout
import Dashboard from "../components/Layout/Dashboard";
import Header from "../components/Layout/Header";
import Navbar from "../components/Layout/Navbar";
//Products
import ProductDashboard from "../components/Products/ProductDashboard";
import AddProduct from "../components/Products/AddProduct";
import ProductGuide from "../components/Products/ProductGuide";
//Orders
import OrderDashboard from "../components/Orders/OrderDashboard";
import OrderFulfillment from "../components/Orders/OrderFulfillment";
import OrderPurchase from "../components/Orders/OrderPurchase";
import OrderSell from "../components/Orders/OrderSell";
import OrderGuide from "../components/Orders/OrderGuide";
import StockGuide from "../components/Orders/StockGuide";
import OrderReceived from "../components/Orders/OrderReceived";
//Reporting
import ReportingDashboard from "../components/Reporting/ReportingDashboard";
import ProductReport from "../components/Reporting/ProductReport";
import { MonthlyAnalysis } from "../components/Reporting/MonthlyAnalysis";

//Users
import UserDashboard from "../components/Users/UserDashboard";
import Signup from "../components/Users/Signup";
import AddUser from "../components/Users/AddUser";
import Roster from "../components/Users/Roster";
import { Settings } from "../components/Users/Settings";

const Home = ({ handleThemeChange }) => {
  // getting logged in user
  const user = auth.getProfile();
  console.log("user info here", user.data.enterprise);
  // making queries
  const {
    loading: enterpriseLoading,
    data: enterpriseData,
    refetch: enterpriseRefetch,
  } = useQuery(GET_ENTERPRISE_BY_ID, {
    variables: { id: user.data.enterprise },
  });
  const {
    loading: rosterLoading,
    data: rosterData,
    refetch: rosterRefetch,
  } = useQuery(QUERY_ENT_USERS, {
    variables: { enterpriseId: user.data.enterprise },
  });
  const {
    loading: productsLoading,
    data: productsData,
    refetch: productsRefetch,
  } = useQuery(QUERY_ALL_PRODUCTS);
  const {
    loading: incomingItemsLoading,
    data: incomingItemsData,
    refetch: incomingItemsRefetch,
  } = useQuery(GET_INCOMING_ITEMS, {
    variables: { enterpriseId: user.data.enterprise },
  });
  const {
    loading: salesLoading,
    data: salesData,
    refetch: salesRefetch,
  } = useQuery(GET_OPEN_SALES, {
    variables: { enterpriseId: user.data.enterprise },
  });

  // setting variables to be passed through props
  let enterpriseName;
  let orderGuide;
  let products;
  let enterpriseId;
  let roster;
  let incomingOrders;
  let incomingOrderCount;
  let outgoingSales;
  let salesCount;

  if (
    enterpriseData &&
    rosterData &&
    productsData &&
    incomingItemsData &&
    salesData
  ) {
    productsRefetch();
    enterpriseRefetch();
    rosterRefetch();
    incomingItemsRefetch();
    salesRefetch();
    enterpriseName = enterpriseData.getEnterpriseById.name;
    enterpriseId = enterpriseData.getEnterpriseById._id;
    orderGuide = enterpriseData.getEnterpriseById.orderGuide;
    roster = rosterData.getEnterpriseUsers;
    products = productsData.allProducts;
    incomingOrders = groupOrders(incomingItemsData.getOrderedItems);
    incomingOrderCount = incomingOrders.length;
    outgoingSales = groupSales(salesData.getOpenSales);
    salesCount = outgoingSales.length;
  }

  return (
    <>
      <Header user={user.data.name} enterprise={enterpriseName} />
      <Navbar />
      <main className="home-main-content">
        <div>
          <div>
            {enterpriseLoading ||
            rosterLoading ||
            productsLoading ||
            incomingItemsLoading ||
            salesLoading ? (
              <div>Loading...</div>
            ) : (
              <Routes>
                <Route path="/products" element={<ProductDashboard />} />
                <Route
                  path="/products/add-product"
                  element={
                    <AddProduct
                      productsRefetch={productsRefetch}
                      products={products}
                    />
                  }
                />
                <Route
                  path="/products/product-guide"
                  element={
                    <ProductGuide
                      productsRefetch={productsRefetch}
                      products={products}
                    />
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <OrderDashboard
                      incomingOrderCount={incomingOrderCount}
                      incomingItemsRefetch={incomingItemsRefetch}
                      salesCount={salesCount}
                      salesRefetch={salesRefetch}
                    />
                  }
                />
                <Route
                  path="/users/settings"
                  element={<Settings handleThemeChange={handleThemeChange} />}
                />
                <Route
                  path="/orders/purchase-order"
                  element={
                    <OrderPurchase
                      user={user}
                      enterpriseId={enterpriseId}
                      orderGuide={orderGuide}
                      enterpriseRefetch={enterpriseRefetch}
                      enterprise={enterpriseData}
                    />
                  }
                />
                <Route
                  path="/orders/sell-order"
                  element={
                    <OrderSell
                      user={user}
                      enterpriseId={enterpriseId}
                      orderGuide={orderGuide}
                      enterpriseRefetch={enterpriseRefetch}
                      enterprise={enterpriseData}
                    />
                  }
                />
                <Route
                  path="/orders/order-fulfillment"
                  element={
                    <OrderFulfillment
                      enterpriseRefetch={enterpriseRefetch}
                      enterpriseId={enterpriseId}
                    />
                  }
                />
                <Route
                  path="/orders/order-received"
                  element={
                    <OrderReceived
                      enterpriseRefetch={enterpriseRefetch}
                      enterpriseId={enterpriseId}
                      incomingItemsData={incomingItemsData}
                      incomingItemsRefetch={incomingItemsRefetch}
                      incomingOrders={incomingOrders}
                    />
                  }
                />

                <Route
                  path="/orders/order-guide"
                  element={
                    <OrderGuide
                      enterpriseRefetch={enterpriseRefetch}
                      enterpriseId={enterpriseId}
                      orderGuide={orderGuide}
                      products={products}
                      productsRefetch={productsRefetch}
                    />
                  }
                />
                <Route
                  path="/orders/stock-guide"
                  element={
                    <StockGuide
                      orderGuide={orderGuide}
                      enterpriseId={enterpriseId}
                    />
                  }
                />
                <Route path="/users" element={<UserDashboard />} />
                <Route path="/users/add-user" element={<AddUser />} />
                <Route
                  path="users/roster"
                  element={
                    <Roster rosterRefetch={rosterRefetch} roster={roster} />
                  }
                />
                <Route path="/reporting" element={<ReportingDashboard />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Dashboard />} />
                <Route
                  path="/reporting/product"
                  element={<ProductReport enterpriseId={enterpriseId} />}
                />
                <Route
                  path="/reporting/month-to-month-report"
                  element={<MonthlyAnalysis enterpriseId={enterpriseId} />}
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
