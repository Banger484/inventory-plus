import React from 'react';
import { useQuery } from '@apollo/client';
import UserList from '../components/UserList';
import { QUERY_USERS } from '../utils/queries';
import auth from "../utils/auth"
import Dashboard from '../components/Layout/Dashboard';

const Home = () => {
  const { loading, data } = useQuery(QUERY_USERS);
  const users = data?.users || [];
  console.log(auth.loggedIn())
  console.log(auth.getToken())
  console.log(auth.getProfile())
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
            <Dashboard />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
