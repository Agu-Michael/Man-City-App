import React from 'react';
import { Link } from 'react-router-dom';
import  ListItem from '@material-ui/core/ListItem';

import {getAuth, signOut} from 'firebase/auth'
import { firebaseApp } from '../../../firebase';

const AdminNav = () =>{
    const lists = [
        {
            title: 'Matches',
            linkTo: '/admin_matches'
        },
        {
            title: 'Add Match',
            linkTo: '/admin_matches/edit_match'
        },
        {
            title: 'Players',
            linkTo: '/admin_players'
        },
        {
            title: 'Add Player',
            linkTo: '/admin_players/add_player'
        }
    ];
    const style = {
        color: '#ffffff',
        fontWeight: '300',
        borderBottom: '1px solid #353535'
    };
    
    //This function below maps and returns the data in the array
    const renderItems = ()=>{
        
        return lists.map((list)=>(
            <Link to={list.linkTo} key={list.title}>
                <ListItem button style={style}>
                    {list.title}
                </ListItem>
            </Link>
        ))
    };

    // The function below handles the logout logic
    const logoutHandler = () =>{
        const auth = getAuth(firebaseApp);
        signOut(auth).then(()=>{
            console.log('logout successfull!')
         
        }).catch((error)=>{
            console.log('Error logging out', error)
        })
    } 

    return(
        <div>
            {renderItems()}
            <ListItem button style={style} onClick={()=>logoutHandler()}>Logout</ListItem>
        </div>
    )
};
export default AdminNav