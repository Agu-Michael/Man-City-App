import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { TableContainer } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';  
import Paper from '@material-ui/core/Paper'
import AdminLayout from '../../../hoc/Adminlayout'

//import progress bar from material ui
import { CircularProgress } from '@material-ui/core';

//import references from firebase
import { firebasePlayers} from '../../../firebase'
//import from database library
import { onValue } from 'firebase/database';

//import from misc reuseable component
import { reverseArray } from '../../ui/misc';

class AdminPlayers extends Component {
  state = {
    isLoading: true,
    players: [],
  };
componentDidMount(){
    onValue(firebasePlayers, (snapshot)=>{
        const data = snapshot.val()
        if(data) {
            const players = Object.entries(data).map(([id, player])=>({
                id, 
                ...player
            }))
            this.setState({
                isLoading: false, 
                players: reverseArray(players)
            })
        }
    })

}
  render() {
    console.log(this.state)
    return <AdminLayout>
                <div>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Number</TableCell>
                <TableCell>Position</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  {this.state.players
                  ?
                  this.state.players.map((player,i)=>(
                    <TableRow key={i}>
                      <TableCell>
                        <Link to={`/admin_players/add_players/${player.id}`}>{player.name}</Link>
                      </TableCell>
                      <TableCell>
                      <Link to={`/admin_players/add_players/${player.id}`}>{player.lastname}</Link>
                      </TableCell>
                      <TableCell>
                        {player.number}
                      </TableCell>
                      <TableCell>
                        {player.position}
                      </TableCell>
                    </TableRow>
                  ))
                  :
                  null
                  }
              </TableBody>
            </Table>
          </Paper>

          <div className="admin_progress">
           {/*preloader*/}
            {this.state.isLoading ? (
              <CircularProgress thickness={7} style={{ color: "#98c5e9" }} />
            ) : null}
          </div>
        </div>




           </AdminLayout>;
  }
}

export default AdminPlayers;