import React, { useEffect, useState } from 'react';
import { Table,Button,Empty } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {viewEmployee} from './EmployeeAction';

const ViewEmployee =({setFalse}) => {

  const dispatch = useDispatch();
  const employeeDetails = useSelector(state => state?.employee?.allEmployeeDetails?.data?.Employees || []);

    useEffect(()=>{
      dispatch(viewEmployee())
      setFalse();
    },[])

    console.log(employeeDetails)
    const columns = [
        {
          title: 'Id',
          dataIndex: 'id',
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
          title: 'Username',
          dataIndex: 'userName',
        },
        {
          title: 'User Type Name',
          dataIndex: 'userTypeName',
        },
        {
            title: 'Address',
            dataIndex: 'address',
          },
      ];
      
    return (
        <div className="container">
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