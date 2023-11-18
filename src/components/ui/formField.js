import React from 'react';
const FormField = ({formdata, id, change, teams}) =>{
    //This function below is to check for error and display error messages
    const showError = ()=>{
        
        let errorMessage = <div className='error_label'>
            {
                formdata.validation && !formdata.valid ? 
                formdata.validationMessage
                : null
            }
        </div>
        return errorMessage
    }
    //This function below is render the reuseable template
    const renderTemplate = () =>{
        let formTemplate = null;    
        // Inside the renderOptions function
        const renderOptions = () =>
          teams
            ? teams.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))
            : null;


        switch(formdata.element){
            //this case handles input
            case('input'): 
                formTemplate = (
                  <div>
                    {formdata.showLabel ? (
                      <div className='label_inputs'>{formdata.config.label}</div>
                    ) : null}
                    <input
                      {...formdata.config}
                      value={formdata.value}
                      onChange={(e) => change({ e, id })}
                    />
                    {showError()}
                  </div>
                );
            break;
            //this case handles the select options with a default value of select one
           case ('select'):
            formTemplate = (
                <div>
                    {formdata.showLabel ? <div className='label_inputs'>{formdata.config.label}</div>:null}
                    <select
                        value = {formdata.value}
                        onChange = {(e) => change({e, id})}
                    >
                        <option value=''>Select one</option>
                        {formdata.config.options.map((item)=>(
                            <option key={item.key} value={item.key}>
                                {item.value}
                            </option>
                        ))}
                    </select>
                    {showError()}
                </div>
            );  
            break;
            default: 
                formTemplate = null 
        }
        return formTemplate;
    }


    return(
        <div>
            {renderTemplate()}
        </div>
    );
}
export default FormField;