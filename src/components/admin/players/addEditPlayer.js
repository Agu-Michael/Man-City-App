import React, {Component} from 'react';
import AdminLayout from '../../../hoc/Adminlayout';
import FormField from '../../ui/formField';
import {validate} from '../../ui/misc';
import { firebaseTeams, database, firebase } from '../../../firebase';
import {get, ref, update} from 'firebase/database';
import Fileuploader from '../../ui/fileuploader';
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
                
            },
            image: {
              element : 'image', 
              value: '',
              validation: {
                required: true
              }, 
              valid: true

            }
        }
    
    }
    componentDidMount(){
      const playerId= this.props.match.params.Id;
      if(!playerId){
        this.setState({
          formType: 'Add Player'
        })
      }else{

      }
      
    }

    updateForm = (element) => {
      const newFormData = { ...this.state.formData };
      const newElement = { ...newFormData[element.id] };
      newElement.value = element.e.target.value;
      let validData = validate(newElement);
      newElement.valid = validData[0];
      newElement.validationMessage = validData[1];
  
      newFormData[element.id] = newElement;
  
      this.setState({
        formError: false,
        formData: newFormData,
      });
    };

    submitForm =async (e)=>{
      e.preventDefault();
      let dataToSubmit = {};
      let formIsValid = true;
      for (let key in this.state.formData) {
        dataToSubmit[key] = this.state.formData[key].value;
        formIsValid = this.state.formData[key].valid && formIsValid;
      }
     

      if (formIsValid) {
        //submit form
      } else {
        this.setState({
          formError: true,
        });
      }
    }
    //this function resets the image uploaded.
    resetImage(){

    }

    render(){
      
        return (
          <AdminLayout>
            <div className="editplayers_dialog_wrapper">
              <h2>{this.state.formType}</h2>

              <div>
                <form onSubmit={(e) => this.submitForm(e)}>

                  <Fileuploader
                   dir='players'
                   tag = {'Player image'}
                   defaultImg = {this.state.defaultImg}
                   defaultImgName= {this.state.formData.image.value}
                   resetImage = { ()=>this.resetImage()}
                   filename = {(filename)=>this.storeFileName(filename)}
                  />
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

                  <div className="success_label">{this.state.formSuccess}</div>
                  {this.state.formError ? (
                    <div className="error_label">Something is wrong</div>
                  ) : (
                    ""
                  )}
                  <div className="admin_submit">
                    <button onClick={(e) => this.submitForm(e)}>
                      {this.state.formType}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </AdminLayout>
        );
    }
}
export default AddEditPlayers;