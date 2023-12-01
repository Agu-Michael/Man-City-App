import React from 'react';
import Layout from './hoc/layout';
import { Switch } from 'react-router-dom';
import Home from './components/home'
import SignIn from './components/signin'
import Dashboard from './components/admin/Dashboard'
import PrivateRoute from './components/authRoutes/privateRoute';
import PublicRoute from './components/authRoutes/publicRoute';
import AdminMatches from './components/admin/matches';
import AddEditMatches from './components/admin/matches/addEdit';
import AddEditPlayers from './components/admin/players/addEditPlayer'
import AdminPlayers from './components/admin/players'   
const Routes = (props)=>{
    
    return(
        <div> 
            <Layout>
                <Switch>
                   <PrivateRoute exact component={AddEditPlayers} path='/admin_players/add_players' {...props}/>        
                    <PrivateRoute exact component={AddEditPlayers} path='/admin_players/add_players/:id' {...props}/>
                    <PrivateRoute exact component ={AdminPlayers} path='/admin_players' {...props}/>
                    <PrivateRoute exact component={AddEditMatches} path='/admin_matches/edit_match' {...props}/>        
                    <PrivateRoute exact component={AddEditMatches} path='/admin_matches/edit_match/:id' {...props}/>
                    <PrivateRoute exact component ={AdminMatches} path='/admin_matches' {...props}/>
                    <PrivateRoute exact component = {Dashboard} path ='/dashboard' {...props} />
                    <PublicRoute exact restricted= {true} component = {SignIn} path='/sign_in' {...props} />
                    <PublicRoute exact restricted= {false} component ={Home} path='/' {...props} />
                </Switch>
            </Layout>
        </div>  
    )
}
export default Routes;