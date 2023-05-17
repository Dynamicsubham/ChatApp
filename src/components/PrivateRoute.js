import React from 'react';
import {Redirect , Route } from 'react-router-dom';
import { Container, Loader } from 'rsuite';
import { useProfile } from '../context/profile.context';


const  PrivateRoute = ({children , ...routePropes}) => {

    const {profile , loading} = useProfile();

    if(loading && !profile){
      return <Container>
        <Loader center vertical size="md" content="Loading" speed="slow" />
      </Container>
    }

    if(!profile && !loading){
        return <Redirect to="/signin" />;
    }

  return <Route {...routePropes}>{children}</Route>;
};

export default PrivateRoute;
