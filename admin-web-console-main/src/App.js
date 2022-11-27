import React, { useEffect } from 'react';
import HomePage from './HomePage';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Activity from './Components/ActivityList/ActivityList';
import { Layout,  } from 'antd';
import {BrowserRouter} from 'react-router-dom';
import {Switch, Route, Redirect, Link} from 'react-router-dom';
import {Provider} from 'react-redux';
import { useCookies } from 'react-cookie';
import {Store} from './Components/redux/Store';
import { useSelector } from 'react-redux';
import PrivateRoute from './Components/CommonComponents/PrivateRoute';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const { Header } = Layout;
  const store = Store();
  const authDetails = useSelector(state => state?.auth?.authDetails?.data?.Successful);
  const [cookies, setCookie] = useCookies(['authDetails']);

  useEffect(() => {
    if (authDetails) {
      setCookie('authDetails', authDetails, { path: '/' });
    }
  }, [authDetails]);

  return (

      // <BrowserRouter>
      //   <div className="App">
      //   <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        
      //     </nav>
      //   </div>
      // </BrowserRouter>
      <BrowserRouter>
    <div className="App">
      {/* <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
        </div>
      </nav> */}

      {/* <div className="outer">
        <div className="inner"> */}
            <Switch>
              {/* <Route path="/signup" component={() => <Signup />} /> */}
              <Route exact path="/" component={() => <Login />} />
              <PrivateRoute
                path="/dashboard"
                component={HomePage}
                isAuthenticated={cookies ? true : false}
                redirectPath="/"
              />
              <Redirect to="/dashboard" />
            </Switch>
        {/* </div>
      </div> */}
    </div></BrowserRouter>
  );
}

export default (App)
