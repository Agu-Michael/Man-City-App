import React, { Component } from "react";
import Fade from 'react-reveal/Fade';
import FormField from "../../ui/formField";
import { validate } from '../../ui/misc';
import { firebasePromotions } from "../../../firebase";
import { database } from '../../../firebase'
import { ref, query, set, equalTo, get, push, orderByChild } from 'firebase/database'

class Enroll extends Component {
  state={
    formError: false,
    formSuccess: '',
    formData: {
              email: {
                element: 'input',
                value: '',
                config: {
                  name: 'email_input',
                  type: 'text',
                  placeholder: 'Enter your email',

                },
                validation: {
                    required: true, 
                    email: true
                },
                valid: false,
                validationMessage: ''
              }
    }   
  };

  
//this function below copies the properties of the element email and replicates the values entered in the input
    updateForm =(element)=>{
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
    //This function clears the input field and displays form success message
    resetFormSuccess = (type) =>{
      const newFormData = {...this.state.formData};
      for(let key in newFormData){
          newFormData[key].value = '';
          newFormData[key].valid = false;
          newFormData[key].validationMessage = '';
      };
      this.setState({
        formError: false,
        formSuccess: type ? 'Congratulations!' : 'Already on the database!',
        
      });
      this.clearSuccessMessage();
    };


    clearSuccessMessage = ()=>{
      setTimeout(()=>{
        this.setState({
          formSuccess: ''
        })
      }, 2000)
    }


    //This function below is to submit the form. it scans the form data and sends just the id and email to console
    submitForm = async(e) =>{
      e.preventDefault();
      let dataToSubmit = {};
      let formIsValid = true
      for(let key in this.state.formData){
        dataToSubmit[key]= this.state.formData[key].value
        formIsValid = this.state.formData[key].valid && formIsValid
      }
      if(formIsValid){
       // This is the email input to be checked
       const emailToCheck = dataToSubmit.email; 

       //Check to see if the email input exists on the database promotions
       try{

        // Reference to promotions node on the database
        const promotionsRef = ref(database, 'promotions');
        // Query to filter  by email key for the emailToCheck
        const queryRef = query(promotionsRef, orderByChild('email'), equalTo(emailToCheck))

        //Fetch the filtered data from the database
        const snapshot = await get(queryRef);

        if(snapshot.exists()){

          //email already exists on the database
         this.resetFormSuccess(false)
        }else{
          //email doesn't exist, push to the database 
          const newEmailRef = push(firebasePromotions);
          await set(newEmailRef, dataToSubmit);
          //clear the form and display the success message
          this.resetFormSuccess(true);  
        }
       } catch(error){
        console.error('Error checking email', error);
        this.setState({
          formError: true,
          formSuccess: ''
        })
      }
      }else{
        this.setState({
         formError: true
        })
        
       }
        
    }
 
  render() {
        return(
            <Fade>
              <div className="enroll_wrapper">
                  <form onSubmit={(e)=>this.submitForm(e)}>
                      <div className="enroll_title">
                            Enter your email
                      </div>
                      <div className="enroll_input">
                              <FormField
                                  id = {'email'}
                                  formdata = {this.state.formData.email}
                                  change = {(element)=>this.updateForm(element)}
                              
                              />
                              {this.state.formError ?
                              <div className="error_label">
                                Something went wrong, try again!

                                </div> : null

                            }
                             
                              <div className='success_label'>{this.state.formSuccess}</div>
                           
                             

                             
                             
                                <button onClick={(e)=>this.submitForm(e)}>Enroll</button>
                                <div className="enroll_discl">Thank you for contacting us! We value your privacy and assure you that your email will be used solely for the purpose of communication with our team.</div>
                      </div>
                  </form>
              </div>

            </Fade>
        )
  }
}
export default Enroll
// form data refers to the entire setting of the element and the settings
//element refers to the individual members i.e: email of the form data
// id refers to the nature of the element i.e: email and its structural composition