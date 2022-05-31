import React from 'react';
import { useQuery } from '@apollo/client';
import UserList from '../components/UserList';
import { QUERY_USERS, QUERY_ALL_PRODUCTS } from '../utils/queries';
import auth from "../utils/auth"
import Dashboard from '../components/Layout/Dashboard';
import Order from '../components/Orders/Order';
import AddProduct from '../components/Products/AddProduct';


const Home = () => {
  const { loading, data } = useQuery(QUERY_USERS);

  const users = data?.users || [];

  console.log(auth.loggedIn())
  console.log(auth.getToken())
  console.log(auth.getProfile())
  // localStorage.setItem("enterpriseId",auth.getProfile().
  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
          //   <UserList
          //   users={users}
          //   title="Here's the current roster of users..."
          // />
            // <Order />
            // <Dashboard />
            <AddProduct />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
