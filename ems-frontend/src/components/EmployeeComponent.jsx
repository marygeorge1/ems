import React, { useState, useEffect } from 'react';
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {

   const [firstName,setFirstName]= useState('');
   const [lastName,setLastName]= useState('');
   const [email,setEmail]= useState('');

   const [errors,setErrors]=useState({
            firstName:'',
            lastName:'',
            email:''
   });

   const navigator=useNavigate();
   const {id}=useParams();

   useEffect(()=>{
    console.log('Value of Id '+id);
    if(id){
        getEmployee(id).then((response)=>{
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setEmail(response.data.email);
        }).catch((error)=>{
            console.log(error);
        })
    }

   },[id]);
   

   function saveOrUpdateEmployee(event){

        event.preventDefault();
        
        if(validateForm()){

            const employee={
                firstName,
                lastName,
                email
            };
            console.log(employee)

            if(id){

                updateEmployee(id,employee).then((response)=>{
                    navigator('/employees');
                }).catch((error)=>{
                    console.log(error);
                })

            }else{

                createEmployee(employee).then((response)=>{
                    navigator('/employees');
                }); 

            }

        }
           
   }

   function validateForm(){
    let valid=true;
    const errorsCopy={...errors};

    if(firstName.trim()){
        errorsCopy.firstName='';
    }
    else{
        errorsCopy.firstName='First name is required';
        valid=false;
    }

    if(lastName.trim()){
        errorsCopy.lastName='';
    }
    else{
        errorsCopy.lastName='Last name is required';
        valid=false;
    }

    if(email.trim()){
        errorsCopy.email='';
    }
    else{
        errorsCopy.email='Email is required';
        valid=false;
    }

    setErrors(errorsCopy);
    return valid;

   }

   function pageTitle(){
        if(id){
            return <h3 className='text-center'> Update Employee</h3>;
        }
        else{
            return <h3 className='text-center'> Add Employee</h3>;
        }
   }

  return (
    <div className='container'>
        <br></br>
        <div className='row'>
            <div className='card col-sm-6 offset-sm-3'>
                {pageTitle()}
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                        <label className='form-label'>First Name</label>
                        <input type='text' placeholder='Enter employee first name' name='firstName' value={firstName} className={`form-control ${errors.firstName?'is-invalid':''}`} onChange={(event)=>setFirstName(event.target.value)}></input>
                        {errors.firstName&&<div className='invalid-feedback'>{errors.firstName}</div>}
                        </div>
                        <div className='form-group mb-2'>
                        <label className='form-label'>Last Name</label>
                        <input type='text' placeholder='Enter employee last name' name='lastName' value={lastName} className={`form-control ${errors.lastName?'is-invalid':''}`} onChange={(event)=>setLastName(event.target.value)}></input>
                        {errors.lastName&&<div className='invalid-feedback'>{errors.lastName}</div>}
                        </div>
                        <div className='form-group mb-2'>
                        <label className='form-label'>Email</label>
                        <input type='text' placeholder='Enter employee email' name='email' value={email} className={`form-control ${errors.email?'is-invalid':''}`} onChange={(event)=>setEmail(event.target.value)}></input>  
                        {errors.email&&<div className='invalid-feedback'>{errors.email}</div>}
                        </div>
                        <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmployeeComponent