import React from 'react'
import {Redirect , Route } from 'react-router-dom';

const  PublicRoute = ({children , ...routePropes}) => {

    const profile = false;

    if(profile){
        return <Redirect to="/" />;
    }

  return <Route {...routePropes}>{children}</Route>;
};

export default PublicRoute;
