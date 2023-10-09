    import React from 'react';
    import { Route, Redirect } from 'react-router-dom';
    const PublicRoute = ({
        user, 
        component: Comp, 
        restricted,
        ...rest
    })=>{
        return <Route {...rest} component={(props)=>(
            restricted && user ?
                    <Redirect to ='/dashboard' /> 
                    : 
                    <Comp user={user} {...props}/>
          
        )} />
    };
    export default PublicRoute;