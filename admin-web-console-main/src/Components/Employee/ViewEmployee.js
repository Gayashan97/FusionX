import React, { useEffect, useState } from 'react';
import { Table,Button,Empty } from 'antd';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {viewEmployee} from './EmployeeAction';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';

const ViewEmployee =({setFalse, setToUpdate}) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const [empId ,setEmpId] = useState(null);
  const employeeDetails = useSelector(state => state?.employee?.allEmployeeDetails?.data?.Employees || []);

    useEffect(()=>{
      dispatch(viewEmployee())
      setFalse();
    },[])

    console.log(employeeDetails)
    const columns = [
        {
          title: 'Emp: Id',
          dataIndex: 'empId',
        },
        {
          title: 'Name',
          dataIndex: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
        },
        {
          title: 'Contact No:',
          dataIndex: 'contactNo',
        },
        {
          title: 'Email',
          dataIndex: 'email',
        }, 
        {
          title: 'Username',
          dataIndex: 'userName',
        },
        {
          title: 'Address',
          dataIndex: 'address',
        }, 
        {
          title: 'User Role',
          dataIndex: 'userRoleName',
        }, 
        {
          title: 'Department',
          dataIndex: 'departmentName',
        }, 
        {
          title: 'Action',
          dataIndex: 'address',
          render:(_, record) => (
          <Button type="primary" size="small" onClick={(e)=>handleClick(record.id)}>Update</Button>)
        },
      ];
  
        const handleClick= (id) => {
          history.push("/dashboard/update-employee");
          setToUpdate(id);
        }
      
    return (
        <div className="container">
        <ToastContainer/>
            <div className="col-12 col-md-12">
            <h1>Employee Details</h1>
              {employeeDetails ?
               <Table columns={columns} dataSource={employeeDetails} size="middle" />
              :Empty}
            </div>
        </div>
    )
}

export default ViewEmployee;