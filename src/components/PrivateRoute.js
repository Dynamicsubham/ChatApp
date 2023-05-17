import React from 'react'
import {Redirect , Route } from 'react-router-dom';

const  PrivateRoute = ({children , ...routePropes}) => {

    const profile = false;

    if(!profile){
        return <Redirect to="/signin" />;
    }

  return <Route {...routePropes}>{children}</Route>;
};

export default PrivateRoute;
