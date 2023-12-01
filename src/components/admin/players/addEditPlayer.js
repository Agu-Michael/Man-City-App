import React, {Component} from 'react';
import AdminLayout from '../../../hoc/Adminlayout';
import FormField from '../../ui/formField';
import {validate} from '../../ui/misc';
import { firebaseTeams, database, firebase } from '../../../firebase';
import {get, ref, update} from 'firebase/database';
class AddEditPlayers extends Component{
    state = {
        playerId: '',
        formType: '',
        formError: false, 
        formSuccess: '',
        defaultImg: '',
        formData: {
            name: {
                element: "input",
                value: "",
                config: {
                  name: "name_input",
                  type: "text",
                  label: "Player Name",
                },
                validation: {
                  required: true,   
                  
                },
                valid: false,
                validationMessage: "",
                showLabel: true,
              },
              lastName: {
                element: "input",
                value: "",
                config: {
                  name: "lastname_input",
                  type: "text",
                  label: "Player Last name",
                },
                validation: {
                  required: true,   
                  number: true
                },
                valid: false,
                validationMessage: "",
                showLabel: true,
              },
              number: {
                element: "input",
                value: "",
                config: {
                  name: "number_input",
                  type: "number ",
                  label: "Player Number",
                },
                validation: {
                  required: true,   
                  number: true,
                },
                valid: false,
                validationMessage: "",
                showLabel: true,
              },

            position: {
                element:'select',
                value: '',
                config: {
                    name: 'select_position',
                    type: 'select',
                    label: 'Select a Position',
                    options: [
                        {key: 'Keeper', value: 'Keeper'},
                        {key: 'Defence', value: 'Defence'},
                        {key: 'Midfield', value: 'Midfield'},
                        {key: 'Striker', value: 'Striker'},
                    ]
                },
                validation: {
                    required: true,
                    number: true
                },
                valid: false,  
                validationMessage: '',
                showLabel: true
                
            }
        }
    
    }

    render(){
        return (
          <AdminLayout>
            <div className="editplayers_dialog_wrapper">
              <h2>{this.state.formType}</h2>

              <div>
                <form onSubmit={(e) => this.submitForm(e)}>
                  <FormField
                    id={"name"}
                    change={(element) => this.updateForm(element)}
                    formdata={this.state.formData.name}
                  />
                  <FormField
                    id={"lastname"}
                    change={(element) => this.updateForm(element)}
                    formdata={this.state.formData.lastName}
                  />
                   <FormField
                    id={"number"}
                    change={(element) => this.updateForm(element)}
                    formdata={this.state.formData.number}
                  />
                   <FormField
                    id={"position"}
                    change={(element) => this.updateForm(element)}
                    formdata={this.state.formData.position}
                  />
                </form>
              </div>
            </div>
          </AdminLayout>
        );
    }
}
export default AddEditPlayers;