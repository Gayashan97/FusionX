import React, { useEffect, useState } from 'react';
import { Table, Button, Empty } from 'antd';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {activitySuccess} from './ActivityAction';

const ActivityList =({setFalse, sendIdToParent}) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const [logId ,setLogId] = useState(null);
  const activityDetails = useSelector(state => state?.activity?.activityDetails?.data?.Activities || []);

    useEffect(()=>{
      dispatch(activitySuccess())
      setFalse();
    },[])

    const columns = [
        {
          title: 'Container Given Id',
          dataIndex: 'containerGivenID',
        },
        {
          title: 'Shipping Line',
          dataIndex: 'name',
        },
        {
          title: 'Purpose',
          dataIndex: 'purpose',
        },
        {
          title: 'Clearing Date',
          dataIndex: 'expectedClearingDate',
        },
        {
          title: 'Created Date',
          dataIndex: 'createdDate',
        },
        {
          title: 'Action',
          dataIndex: 'address',
          render:(_, record) => (
          <Button type="primary" onClick={(e)=>handleClick(record.id)}>More</Button>)
        },
      ];

      const handleClick= (id) => {
        history.push("/dashboard/logs");
        setLogId(id);
        sendIdToParent(id);
      }
      
    return (
        <div className="container">
            <div className="col-12 col-md-12">
            <h1>Container Log Details</h1>
              {activityDetails ?
               <Table columns={columns} dataSource={activityDetails} size="middle" />
              :Empty}
            </div>
        </div>
    )
}

export default ActivityList;