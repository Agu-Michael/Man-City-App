import React, {Component} from 'react';
import AdminLayout from '../../../hoc/Adminlayout';
import {Link} from 'react-router-dom';
// imports from Material UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

//import progress bar from material ui
import { CircularProgress } from '@material-ui/core';

//import reference from firebase
import { firebaseMatches } from '../../../firebase';
//import from database library
import { onValue } from 'firebase/database';

//import from misc reuseable component
import { reverseArray } from '../../ui/misc';

class AdminMatches extends Component {
  state = {
    isLoading: true,
    matches: [],
  };


//the function below fetches the data from the database and reverses the array structure
  componentDidMount() {
    onValue(firebaseMatches, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const matches = Object.entries(data).map(([id, match])=>({
          id, 
          ...match
        }));
        this.setState({
          isLoading: false,
          matches: reverseArray(matches),
        });
      }
    });
  }

  render() {
    console.log(this.state)
    return (
      <AdminLayout>
        <div>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Match</TableCell>
                <TableCell>Result</TableCell>
                <TableCell>Final</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  {this.state.matches
                  ?
                  this.state.matches.map((match,i)=>(
                    <TableRow key={i}>
                      <TableCell>
                        {match.date}
                      </TableCell>
                      <TableCell>
                        <Link to ={`/admin_matches/edit_match/${match.id}`}>
                              {match.away} <strong>-</strong> {match.local}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {match.resultAway} <strong>-</strong> {match.resultLocal}
                      </TableCell>
                      <TableCell>
                          {match.final === 'Yes'
                          ?
                          <span className='matches_tag_red'>Final</span>
                          :
                          <span className='matches_tag_green'>Not played yet</span>                        
                          
                          }
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
      </AdminLayout>
    );
  }
};
export default AdminMatches;