import React,{Component} from 'react';
import AdminLayout from '../../../hoc/Adminlayout';
import FormField from '../../ui/formField';
import {validate} from '../../ui/misc';
import { firebaseTeams, database, firebaseMatches } from '../../../firebase';
import {get, ref} from 'firebase/database';
class AddEditMatches extends Component{
    state ={
        matchId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        teams: [],
        formData: {
            date: {
                element: 'input',
                value: '',
                config: {
                    name: 'date_input',
                    type: 'date',
                    label: 'Enter date'
                },
                validation:{
                    required: true,
                    date: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            local: {
                element: 'select',
                value: '',
                config: {
                    name: 'select_local',
                    type: 'select',
                    label: 'Select a local team',
                    options: []
                },
                validation: {
                    required: true, 
                 },
                 valid: false, 
                 showLabel: false, 
                 validationMessage: ''
            },
            resultLocal: {
                element: 'input',
                value: '',
                config:{
                    name: 'result_local_input',
                    type: 'text',
                    label: 'Result local'
                },
                validation: {
                    required: true,

                },
                valid: false,
                validationMessage: '',
                showLabel: false

            },
            away: {
                element: 'select',
                value: '',
                config: {
                    name: 'select_away',
                    type: 'select',
                    label: 'Select an away team',
                    options: []
                },
                validation: {
                    required: true, 
                 },
                 valid: false, 
                 showLabel: false, 
                 validationMessage: ''
            },
            resultAway: {
                element: 'input',
                value: '',
                config:{
                    name: 'result_away_input',
                    type: 'text',
                    label: 'Result away'
                },
                validation: {
                    required: true,

                },
                valid: false,
                validationMessage: '',
                showLabel: false

            },
            referee:{
                element: 'input',
                value: '',
                config:{
                    name: 'referee_input',
                    type: 'text',
                    label: 'Referee'
                },
                validation: {
                    required: true, 

                },
                valid: false, 
                showLabel: true, 
                validationMessage: ''
            },
            stadium: {
                element: 'input',
                value: '', 
                config: {
                    name: 'stadium_input', 
                    type: 'text', 
                    label: 'Stadium'
                }, 
                validation: {
                    required: true, 

                },
                valid: false, 
                showLabel: true, 
                validationMessage: ''
            },
            result: {
                element: 'select',
                value: '',
                config: {
                    label: "Team Results",
                    name: 'select_result',
                    type: 'select', 
                    options: [
                        {key:'W', value: 'W'}, 
                        {key: 'L', value: 'L'}, 
                        {key: 'D', value: 'D'}, 
                        {key: 'N/A', value: 'N/A'}
                    ]
                },
                validation: {
                    required: true
                },
                valid: false, 
                validationMessage: '', 
                showLabel: true

            },
            final: {
                element: 'select',
                value: '',
                config: {
                    label: "Game played?",
                    name: 'select_played',
                    type: 'select', 
                    options: [
                        {key:'Yes', value: 'Yes'}, 
                        {key: 'No', value: 'No'}, 
                        
                    ]
                },
                validation: {
                    required: true
                },
                valid: false, 
                validationMessage: '', 
                showLabel: true

            }
        }
    }
    //this function below copies the properties of the element on the form and replicates the values entered in the input
    updateForm = (element)=>{
        const newFormData = {...this.state.formData};
        const newElement = {...newFormData[element.id]}
        newElement.value = element.e.target.value
        let validData = validate(newElement);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1]

        newFormData[element.id] = newElement;
      

        this.setState({ 
          formError: false,
          formData: newFormData
        })
    }


// Inside componentDidMount
componentDidMount() {
  const teamId = this.props.match.params.id;

  // Function to fetch teams
  const teamRef = ref(database, 'teams');
  get(teamRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const teams = snapshot.val();

        // Update state
        this.setState({ teams });

        console.log('Teams:', teams);
      } else {
        console.log('Teams not found');
      }
    })
    .catch((error) => console.error('Error fetching items', error));

    if (!teamId) {
        // add match
        this.setState({ formType: 'Add Match' });
      } else {
        const matchRef = ref(database, `teams/${teamId}`);
        get(matchRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const team = snapshot.val();
              console.log(team);
      
              // Set the formType for editing
              this.setState({ formType: 'Edit Match' });
            } else {
              console.log('Team not found');
            }
          })
          .catch((error) => console.error('Error fetching data:', error));

         
      }
      
}


    // componentDidMount(){
    //     const teamId = this.props.match.params.id
    //     // function to fetch teams
    //     const teamRef = ref(database, 'teams')
    //     get(teamRef).then(((snapshot)=>{
    //         if (snapshot.exists()){
    //             const teams = snapshot.val();

    //             //update state
    //             this.setState({ teams });

    //             console.log('Teams:', teams)
    //         }else{
    //             console.log('teams not found')
    //         }
    //     })).catch((error)=>console.errror('error fetching items', error));

    //     if(!teamId){
    //         //add match
    //     }else{
    //         const matchRef = ref(database, `teams/${teamId}`)
    //         get(teamRef).then((snapshot)=>{
    //             if(snapshot.exists()){
    //                 const match = snapshot.val();
    //                 console.log(team);
    //             }else{
    //                 console.log("Match not found");
    //             }
    //         }).catch((error)=> console.error("Error fetching data:", error))
    //         }
    //     };
    
    render(){
      
        return (
          <AdminLayout>
            <div className="editmatch_dialog_wrapper">
              <h2>{this.state.formType}</h2>
              <div>
                <form onSubmit={(e) => this.submitForm(e)}>
                  <FormField
                    id={"date"}
                    change={(element) => this.updateForm(element)}
                    formdata={this.state.formData.date}
                  />

                  <div className=
                  "select_team_layout">
                    <div className="label_inputs">Local</div>
                    <div className="wrapper">
                      <div className="left">
                        <FormField
                          id={"local"}
                          change={(element) => this.updateForm(element)}
                          formdata ={this.state.formData.local}
                          teams = {this.state.teams}
                        
                        />
                      </div>
                      <div>
                        <FormField
                          id={"resultLocal"}
                          change={(element) => this.updateForm(element)}
                          formdata ={this.state.formData.resultLocal}
                        />
                      </div>
                      
                    </div>
                  </div>

                  <div className="select_team_layout">
                    <div className="label_inputs">Away</div>
                    <div className="wrapper">
                      <div className="left">
                        <FormField
                          id={"away"}
                          change={(element) => this.updateForm(element)}
                          formdata={this.state.formData.away}
                          teams= {this.state.teams}
                        />
                      </div>
                      <div>
                        <FormField
                          id={"resultAway"}
                          change={(element) => this.updateForm(element)}
                          formdata={this.state.formData.resultAway}
                        />
                      </div>
                      
                    </div>
                  </div>

                  <div className='split_fields'>
                        <FormField
                            id = {'referee'}
                            change={(element)=>this.updateForm(element)}
                            formdata= {this.state.formData.referee}
                        />

                        <FormField
                            id={'stadium'}
                            change={(element)=>this.updateForm(element)}
                            formdata={this.state.formData.stadium}
                        />
                  </div>
                  <div className='split_fields last'>
                        <FormField
                            id = {'result'}
                            change={(element)=>this.updateForm(element)}
                            formdata= {this.state.formData.result}
                        />

                        <FormField
                            id={'final'}
                            change={(element)=>this.updateForm(element)}
                            formdata={this.state.formData.final}
                        />
                  </div>
                  
                  <div className='success_label'>{this.state.formSuccess}</div>
                  {this.state.formError ? 
                    <div className='error_label'>
                        Something is wrong
                    </div>  
                    :
                    ''
                }
                <div className='admin_submit'>
                    <button onClick={(e)=>this.submitForm(e)}>{this.state.formType}</button>
                </div>
                </form>
              </div>
            </div>
          </AdminLayout>
        );
    }
};
export default AddEditMatches;