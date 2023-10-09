import React, { Component } from 'react';
import FormField from '../ui/formField';
import {validate} from '../ui/misc'
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {firebaseApp} from '../../firebase';
//The importation below helps the .history.push work
import {withRouter} from 'react-router-dom';
class SignIn extends Component{
    state = {
        formError: false, 
        formSuccess: '',
        formData: {
            email: {
                element: 'input', 
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true, 
                    email: true
                },
                valid: false, 
                validationMessage: ''
            }, 
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input', 
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                validation: {
                    required: true
                },
                valid: false, 
                validationMessage: ''
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


    //This function below is to submit the form. it scans the form data and sends just the id and email to console
    submitForm =async (e)=>{
        e.preventDefault();
        let dataToSubmit = {};
        let formIsValid = true
        for(let key in this.state.formData){
          dataToSubmit[key]= this.state.formData[key].value
          formIsValid = this.state.formData[key].valid && formIsValid
        }
        if(formIsValid){
           // get the authentication instance here
            const auth = getAuth(firebaseApp);
            const email = dataToSubmit.email;
            const password = dataToSubmit.password
            // Function to signin with email and password
        //     const authenticate = (email, password) =>{
        //         return signInWithEmailAndPassword(auth, email, password)
        //         .then(()=>{
        //             console.log('User is authenticated');
        //            // this pushes the user to the dashboard because of the routes
        //            this.props.history.replace('/dashboard')
        //         })
        //         .catch((error)=>{
        //             //handle signin error
        //             console.error('Error signing in', error);
        //             this.setState({     
        //                 formError: true
        //             })
        //         })
        //     }
        //     authenticate(email, password);

        // }else{
        //   this.setState({
        //    formError: true
        //   })
          
        //  }
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('User is authenticated');
            this.props.history.replace('/dashboard')
        } catch(error){
            console.error('Error signing in', error);
            this.setState({
                formError: true
            });
        }
    
    }else{
        this.setState({
            formError: true
        })
    };
    }
    render(){
        return(
            <div className='container'>
                <div className='signin_wrapper' style={{margin: '100px'}}> 
                    <form onSubmit={(e)=>this.submitForm(e)}>
                        <h2>Please Login</h2>
                        <FormField
                            id ={'email'}
                            change = {(element)=>this.updateForm(element)}
                            formdata = {this.state.formData.email}
                        
                        />
                        <FormField
                            id = {'password'}
                            change = {(element)=>this.updateForm(element)}
                            formdata = {this.state.formData.password}
                        />
                        {this.state.formError ?
                              <div className="error_label">
                                Something went wrong, try again!

                                </div> : null

                            }
                             
                        <button onClick={(e)=>this.submitForm(e)}>Login</button>
                    </form>
                </div>
            </div>
        )
    }
}
export default withRouter(SignIn);