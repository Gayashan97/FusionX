import React, { useEffect, useState } from 'react';
import { Table,Button,Empty } from 'antd';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {viewThirdParty} from './ThirdPartyAction';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';

const ViewThirdParty =({setFalse, setToUpdate}) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const [empId ,setEmpId] = useState(null);
  const thirdPartyDetails = useSelector(state => state?.thirdPartyUsers?.allThirdPartyDetails?.data?.ThirdPartyUsers || []);

    useEffect(()=>{
      dispatch(viewThirdParty())
      setFalse();
    },[])

    console.log(thirdPartyDetails)
    const columns = [
        {
          title: 'User Id',
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
          title: 'Third Party Company',
          dataIndex: 'thirdPartyName',
        },
        {
          title: 'Address',
          dataIndex: 'address',
        }, 
        {
          title: 'Action',
          dataIndex: 'address',
          render:(_, record) => (
          <Button type="primary" size="small" onClick={(e)=>handleClick(record.id)}>Update</Button>)
        },
      ];
  
        const handleClick= (id) => {
          history.push("/dashboard/update-thirdParty");
          setToUpdate(id);
        }
      
    return (
        <div className="container">
        <ToastContainer/>
            <div className="col-12 col-md-12">
            <h1>Third Party User Details</h1>
              {thirdPartyDetails ?
               <Table columns={columns} dataSource={thirdPartyDetails} size="middle" />
              :Empty}
            </div>
        </div>
    )
}

export default ViewThirdParty;