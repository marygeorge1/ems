
import React, { useEffect, useState } from 'react';
import { listEmployees, deleteEmployee } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponent = () => {

    const [employees,setEmployees]=useState([]);
    const navigator=useNavigate();

    useEffect(()=>{
        console.log('Inside useEffect')
        getAllEmployees();
    },[]);

    function getAllEmployees(){
        listEmployees().then((response)=>{
            //console.log(response)
            setEmployees(response.data)
        }).catch((error)=>{console.error(error)})
    }

    function addNewEmployee(){
        navigator('/add-employee');
    }

    function updateEmployee(empId){
        navigator(`/edit-employee/${empId}`);
    }

   function deleteEmp(empId){
    deleteEmployee(empId).then((response)=>{
        getAllEmployees();
    });
    
   }

  return (
    <div className='container'>
        <h3 className='text-center'>List of Employees</h3>
        <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map((emp)=>
                    <tr key={emp.id}>
                        <td>{emp.id}</td>
                        <td>{emp.firstName}</td>
                        <td>{emp.lastName}</td>
                        <td>{emp.email}</td>
                        <td>
                            <button className='btn btn-success' onClick={()=>updateEmployee(emp.id)}>Update</button>&nbsp;
                            <button className='btn btn-danger' onClick={()=>deleteEmp(emp.id)}>Delete</button>
                        </td>
                    </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeeComponent
