import React from 'react';
import { Route, Redirect} from 'react-router-dom'
const PrivateRoute = ({
    //These represent the props from the private route tag
    user, 
    component : Comp,
    ...rest
})=>{
    //This logic returns the route to the dashboard if authenticated and redirects if not
    return <Route {...rest} component ={(props)=>(
        user 
        ? <Comp {...props} user={user}/>
        :
        <Redirect to= '/sign_in'/>
    )}/>
};
export default PrivateRoute; 