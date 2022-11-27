import React, { useEffect, useState } from 'react';
import { Table,Button,Empty,Modal,Input, DatePicker, TimePicker,Select } from 'antd';
import { Label, Row, Col} from 'reactstrap';
import { useHistory } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import {getActivityLogs, getActivityLogTypes, saveActivityLogTypes,getActivityEventTypes} from './ActivityAction';
import Form from 'antd/lib/form/Form';

const ActivityLogs =({setFalse,logId}) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const activityLogs = useSelector(state => state?.activity?.activityLogs?.data?.ActivityLogs || []);
  const activityLogTypes = useSelector(state => state?.activity?.activityLogTypes?.data?.ActivityLogTypes || []);
  const activityLogEventTypes = useSelector(state => state?.activity?.getActivityLogsByEvent?.data?.ActivityLogs || []);
  const authDetails = useSelector(state => state?.auth?.authDetails?.data?.Successful[0] || []);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [date, setDate] = useState('');
  const [activityLogId, setActivityLogId] = useState(null);
  const [comment, setComment] = useState(null);
  const { Option } = Select;  

    useEffect(()=>{
      dispatch(getActivityLogs(logId));  // calling the back end api's 
      dispatch(getActivityLogTypes());
      if(activityLogTypes){
        dispatch(getActivityEventTypes(activityLogs[0]?.id))
      }  
      setFalse();
    },[])

    const columns = [
        {
          title: 'Id',
          dataIndex: 'id',
        },
        {
          title: 'Logs Type Name',
          dataIndex: 'activityLogsTypeName',
        },
        {
          title: 'Activity Purpose',
          dataIndex: 'activityPurpose',
        },
        {
          title: 'Created User',
          dataIndex: 'createdUser',
        },
        {
          title: 'Created Date',
          dataIndex: 'createdDate',
        }
      ];

      const column = [
        {
          title: 'Id',
          dataIndex: 'id',
        },
        {
          title: 'Logs Type Name',
          dataIndex: 'activityLogsTypeName',
        },
        {
          title: 'Activity Purpose',
          dataIndex: 'activityPurpose',
        },
        {
          title: 'Created User',
          dataIndex: 'createdUser',
        },
        {
          title: 'Created Date',
          dataIndex: 'createdDate',
        },
      ]

      const showModal = (id) => {
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
        dispatch(saveActivityLogTypes({
          "activityLogsTypeId":activityLogId,
          "activityId": logId,
          "activityLogsTypeId": activityLogTypes[0]?.id,
          "createdDate":date ,
          "createdUser": authDetails?.id,
        }))
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };

      const logsArray = activityLogTypes?.map(item =>{
        return(
          <Option key={item.id} value={item.id}>{item.name}</Option>
        )
      });
    
      const onChangeTime = (value, dateString)=> {
        setDate(dateString);
      }

    return (
      <div className="container"><ToastContainer/>
        <div className="col-12 col-md-12">
          <h1>Log Details</h1>
          <Button type="primary" className="btn-wrapper" onClick={(e)=>showModal()}>Add</Button>
          {activityLogs ?
            <Table columns={columns} dataSource={activityLogs} size="middle"/>
            : Empty}
        </div>

        <div className="col-12 col-md-12">
          <h1>Activity Log Type Details</h1>
          {activityLogs ?
            <Table columns={column} dataSource={activityLogEventTypes} size="middle" />
            : Empty}
        </div>

        <Modal title="Add " visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <Form>
            <Row className="form-group model-wrapper">
              <Label md={{ size: 3, offset: 3 }} className="label-wrapper">Activity Log</Label>
              <Col md={{ size: 6, offset: 4 }}>
                <Select
                  showSearch
                  placeholder="Select Activity Log Type"
                  optionFilterProp="children"
                  onChange={(value)=>setActivityLogId(value)}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  className="model-select-wrapper"
                >
                  {logsArray}
                </Select>,
              </Col>
            </Row>

            <Row className="form-group model-wrapper">
              <Label md={{ size: 3, offset: 3 }} className="label-wrapper">Time</Label>
              <Col md={{ size: 6, offset: 4 }}>
                <DatePicker 
                  showTime 
                  onChange={onChangeTime} 
                  className="input-wrapper" 
                />
              </Col>
            </Row>

            <Row className="form-group model-wrapper">
              <Label md={{ size: 3, offset: 3 }} className="label-wrapper">Comment</Label>
              <Col md={{ size: 6, offset: 4 }}>
                <Input
                  type="text"
                  name='comment'
                  id="comment"
                  onChange={(value)=>setComment(value)}
                  label={'Comment'}
                  placeholder={"Enter Comment"}
                  className="input-wrapper"
                />
              </Col>
            </Row>
            </Form>
        </Modal>
      </div>
    )
}

export default ActivityLogs;