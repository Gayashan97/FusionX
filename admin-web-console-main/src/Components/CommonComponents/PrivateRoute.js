import React from 'react';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, isAuthenticated, redirectPath, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: redirectPath
            }}
          />
        )
      }
    />
  );
}


export default PrivateRoute;
