import React,{useEffect, useState} from 'react';
import { Button, Label, Row, Col } from 'reactstrap';
import { Form , Input, Select} from 'antd';
import '../../App.css';
import {updateThirdParty, clearThirdPartyDetails} from './ThirdPartyAction';
import {getThirdPartyUserById} from './ThirdPartyAction';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';

const UpdateThirdParty =({setFalse, thirdPartyId})=>{

    const thirdPartyById = useSelector(state => state?.thirdPartyUsers?.thirdPartyById?.data?.ThirdPartyUsers || []);
    // console.log("BBBBBBBBBBBBBBBBBBBBBBB", thirdPartyById)
    const dispatch = useDispatch();
    const saveSuccess = useSelector(state => state?.thirdPartyUsers?.thirdPartyDetails?.saveSuccess || false);
    const history = useHistory();
      
    useEffect(()=>{
        dispatch(getThirdPartyUserById(thirdPartyId))
    },[])
    const [thirdPartyDetails, setThirdPartyDetails] = useState({
        empId: '',
        name:'',
        age:'',
        contactNo:'',
        address:'',
        userName:'',
        email:'',
        thirdPartyId:'',
        thirdPartyName:'',
        // userRoleId:null
    });
    useEffect(()=>{
      const thirdParty = thirdPartyById[0];
    // console.log("AAAAAAAAAAAAAAAAA",thirdParty,thirdParty?.empId && thirdParty.empId)
      setFalse();
      if (thirdParty)
      setThirdPartyDetails(thirdParty)
    },[thirdPartyById])
    // const authDetails = useSelector(state => state?.auth?.authDetails?.data);
    const { Option } = Select;

    const handleSignup = (e) => {
        const {name,value} = e.target
        setThirdPartyDetails({
            ...thirdPartyDetails,
            [name]:value
        })
    }
    useEffect(()=>{
        setFalse();
    },[])

    useEffect(()=>{
        if (saveSuccess) {
            history.push("/dashboard/view-thirdParty");
        }
        console.log("aaaaaaa", saveSuccess);
        dispatch(clearThirdPartyDetails());
    },[saveSuccess])

    const updateThirdPartyDetails = async () => {
        // const thirdParty = {
        //     ...thirdPartyDetails,
        // }
        dispatch(updateThirdParty({
            ...thirdPartyDetails,
            "modifiedUser":1
        },thirdPartyId));
    }

    return (
        <div className="container">
            <h3>Update ThirdParty User</h3>
            <ToastContainer/>
            <div className="col-12 col-md-9">
                <Form>
                    <Row className="form-group">
                    <Label  md={{ size: 3, offset: 3 }} className="label-wrapper">Third Party User Id</Label>
                        <Col md={{ size: 6, offset: 4 }}>
                            <Input
                                // rules={username}
                                disabled
                                value={thirdPartyDetails.empId}
                                type="text"
                                onChange={handleSignup}
                                name="empId"
                                id="empId"
                                placeholder={"Enter User Id"}
                                className="input-wrapper"
                            />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label md={{ size: 3, offset: 3 }} className="label-wrapper">Third Party Company</Label>
                        <Col md={{ size: 6, offset: 4 }}>
                            <Select disabled defaultValue="Select the Company" value={thirdPartyDetails.thirdPartyName} id="thirdPartyId" name="thirdPartyId" className="select-wrapper" 
                            // onChange={handleSignup}
                            >
                                <Option value="1">LANKA FEIGHTERS</Option>
                                <Option value="2">IWS HOLDINGS</Option>
                                <Option value="3">Bakelmun & Sons</Option>
                                <Option value="4">Maxis Exporters</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row className="form-group">
                    <Label  md={{ size: 3, offset: 3 }} className="label-wrapper">Name</Label>
                        <Col md={{ size: 6, offset: 4 }}>
                            <Input
                                value={thirdPartyDetails.name}
                                type="text"
                                name='name'
                                id="name"
                                onChange={handleSignup}
                                label={'Name'}
                                placeholder={"Enter Name"}
                                className="input-wrapper"
                            />
                        </Col>
                    </Row>
                    <Row className="form-group">
                    <Label  md={{ size: 3, offset: 3 }} className="label-wrapper">Age</Label>
                        <Col md={{ size: 6, offset: 4 }}>
                            <Input
                                value={thirdPartyDetails.age}
                                type="text"
                                name='age'
                                id="age"
                                onChange={handleSignup}
                                placeholder={"Enter Age"}
                                className="input-wrapper"
                            />
                        </Col>
                    </Row>
                    <Row className="form-group">
                    <Label  md={{ size: 3, offset: 3 }} className="label-wrapper">Contact No:</Label>
                        <Col md={{ size: 6, offset: 4 }}>
                            <Input
                                value={thirdPartyDetails.contactNo}
                                type="text"
                                name='contactNo'
                                id="contactNo"
                                onChange={handleSignup}
                                placeholder={"Enter Contact No"}
                                className="input-wrapper"
                            />
                        </Col>
                    </Row>
                    <Row className="form-group">
                    <Label  md={{ size: 3, offset: 3 }} className="label-wrapper">Address</Label>
                        <Col md={{ size: 6, offset: 4 }}>
                            <Input
                                value={thirdPartyDetails.address}
                                type="text"
                                name='address'
                                id="address"
                                onChange={handleSignup}
                                placeholder={"Enter Address"}
                                className="input-wrapper"
                            />
                        </Col>
                    </Row>
                    <Row className="form-group">
                    <Label  md={{ size: 3, offset: 3 }} className="label-wrapper">Username</Label>
                        <Col md={{ size: 6, offset: 4 }}>
                            <Input
                                value={thirdPartyDetails.userName}
                                disabled
                                type="text"
                                name='userName'
                                id="userName"
                                onChange={handleSignup}
                                placeholder={"Enter Username"}
                                className="input-wrapper"
                            />
                        </Col>
                    </Row>
                    <Row className="form-group">
                    <Label  md={{ size: 3, offset: 3 }} className="label-wrapper">E-mail</Label>
                        <Col md={{ size: 6, offset: 4 }}>
                            <Input
                                value={thirdPartyDetails.email}
                                type="text"
                                name='email'
                                id="email"
                                onChange={handleSignup}
                                placeholder={"Enter E-mail"}
                                className="input-wrapper"
                            />
                        </Col>
                    </Row>
                    <Row className="form-group">
                    <Label  md={{ size: 3, offset: 3 }}></Label>
                        <Col md={{ size: 3, offset: 5 }}>
                            <Button className="button-wrapper primary"
                            onClick={updateThirdPartyDetails} 
                            >Update</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    )    
}

export default UpdateThirdParty;