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
import {themes} from "./themes"

// Admin
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { UsersAdmin } from './components/Admin/UsersAdmin';
import { ProductAdmin } from './components/Admin/ProductAdmin';
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
  function choose(){if (token){
    return(<Home handleThemeChange={handleThemeChange}/>)
  }else{
    return(<Login/>)
  }
  }


  const handleThemeChange = (e,isSettingInitialTheme)=>{
    let choice
    if(isSettingInitialTheme){
      choice = e
    }else {
      choice = e.target.value;

    }
    const theme = themes[choice]
    Object.entries(theme).forEach(([k,v])=>{
      console.log(k,v)
      document.documentElement.style.setProperty(k,v)
    })
    // mutate user
  }

  
// if (auth.getProfile().data.email==="npm inventoryplus.com"){
//   return <ApolloClient client={client}>
//     <Router>
//     <div className="flex-column justify-flex-start min-100-vh">
//           <div className="container">
//             <Routes>
//             {ifauth.getProfile.data.email==="admin@invetoryplus.com"?(
//               </div>
//               </div>
//     </Router>
//   </ApolloClient>
// }

const checkAdmin = ()=>{
  if (auth.loggedIn() && auth?.getProfile()?.data?.email==="admin@inventoryplus.com"){
return(<><Route
                path='/admin/users'
                element={<UsersAdmin />} 
              />
              <Route
                path='/admin/products'
                element={<ProductAdmin />}
              />
              <Route 
                path="/*" 
                element={<AdminDashboard/>} 
              /></>)
  }
}


  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <div className="container">
            <Routes>
              {checkAdmin()}
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
