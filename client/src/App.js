import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import auth from "./utils/auth"
import Login from "./components/Users/Login"
import Signup from './components/Users/Signup';
import AcceptInvite from './components/Users/AcceptInvite'

console.log("in react")
// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql'
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
    const token = auth.getToken()
    console.log("token",token)
  function choose(){if (token){
    return(<Home/>)
  }else{
    return(<Login/>)
  }
  }

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <div className="container">
            <Routes>
              <Route
                path='/invite/*'
                element={<AcceptInvite />} 
              />
              <Route
                path='/signup'
                element={<Signup />}
              />
              <Route 
                path="/*" 
                element={choose()} 
              />
            </Routes>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
