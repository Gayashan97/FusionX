import React, { useEffect, useState } from 'react';
import { Table,Button,Empty,Modal,Input, TimePicker,Select,Form } from 'antd';
import { Label, Row, Col} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import {wareHouseSave ,viewWareHouseDetails} from './WareHouseAction';

const ViewWareHouse =({setFalse}) => {

  const dispatch = useDispatch();
  const wareHouseDetails = useSelector(state => state?.wareHouse?.viewWareHouseDetails?.data?.WareHouseItems || []);
  const authDetails = useSelector(state => state?.auth?.authDetails?.data?.Successful[0] || []);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [wareHouseInfo, setWareHouseDetails] = useState({
        quantity:'',
        itemName:'',
    });

    useEffect(()=>{
      dispatch(viewWareHouseDetails())
      setFalse();
    },[])

    const showModal = (id) => {
        setIsModalVisible(true);
    };
    console.log(wareHouseDetails)
    const handleOk = () => {
        setIsModalVisible(false);
        dispatch(wareHouseSave({
            ...wareHouseInfo,
            "wareHouseCategoryID":wareHouseDetails[0]?.wareHouseCategoryID ,
            "wareHouseId":wareHouseDetails[0]?.wareHouseId ,
            "createdUser": authDetails?.id,
        }))
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSignup = (e) => {
        const {name,value} = e.target
        setWareHouseDetails({
            ...wareHouseInfo,
            [name]:value
        })
    }

    const columns = [
        {
          title: 'Id',
          dataIndex: 'id',
        },
        {
          title: 'Item Name',
          dataIndex: 'itemName',
        },
        {
          title: 'Quantity',
          dataIndex: 'quantity',
        },
        {
          title: 'Created User',
          dataIndex: 'createdUser',
        },
        {
            title: 'Modified User:',
            dataIndex: 'modifiedUser',
        },
        {
          title: 'Modified Date',
          dataIndex: 'modifiedDate',
        },
        {
            title: 'Created Date',
            dataIndex: 'createdDate',
          },
      ];
      
    return (
        <div className="container">
            <div className="col-12 col-md-12">
                <h1>Ware-House Details</h1>
                <Button type="primary" className="btn-wrapper" onClick={(e) => showModal()}>Add</Button>
                {wareHouseDetails ?
                    <Table columns={columns} dataSource={wareHouseDetails} size="middle" />
                : Empty}
            </div>

            <Modal title="Add " visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form>
                    <Row className="form-group model-wrapper">
                        <Label md={{ size: 3, offset: 3 }} className="label-wrapper">Quntity</Label>
                        <Col md={{ size: 6, offset: 4 }}>
                            <Input
                                type="text"
                                name='quantity'
                                id="quantity"
                                onChange={handleSignup}
                                placeholder={"Enter Item Name"}
                                className="input-wrapper"
                            />
                        </Col>
                    </Row>

                    <Row className="form-group model-wrapper">
                        <Label md={{ size: 3, offset: 3 }} className="label-wrapper">Item Name</Label>
                        <Col md={{ size: 6, offset: 4 }}>
                            <Input
                                type="text"
                                name='itemName'
                                id="itemName"
                                onChange={handleSignup}
                                placeholder={"Enter Item Name"}
                                className="input-wrapper"
                            />
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    )
}

export default ViewWareHouse;