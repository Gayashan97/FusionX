import React,{useEffect, useState} from 'react';
import { Button, Label, Row, Col } from 'reactstrap';
import { Form , Input, Select} from 'antd';
import '../../App.css';
import { useSelector, useDispatch } from 'react-redux';
import {username,emailValidation,requiredField } from '../Validation/Validation';
// import {saveEmployee} from './EmployeeAction';

const SaveWareHouse =({setFalse})=>{
    const [employeeDetails, setEmployeeDetails] = useState({
        empId:'',
        name:'',
        age:'',
        contactNo:'',
        address:'',
        userName:'',
        email:'',
        // userRoleId:null
    });
    const dispatch = useDispatch();
    const { Option } = Select;

    const handleSignup = (e) => {
        const {name,value} = e.target
        setEmployeeDetails({
            ...employeeDetails,
            [name]:value
        })
    }
    useEffect(()=>{
        setFalse();
    },[])

    const saveEmployeeDetails = async () => {
        // dispatch(saveEmployee({
        //     ...employeeDetails,
        //     "userRoleId":1,
        //     "createdUser":1
        // }));
    }

    return (
        <div className="container">
            <h3>Add Employee</h3>
            <div className="col-12 col-md-9">
                <Form>
                    <Row className="form-group">
                    <Label  md={{ size: 3, offset: 3 }} className="label-wrapper">Quantity</Label>
                        <Col md={{ size: 6, offset: 4 }}>
                            <Input
                                type="text"
                                onChange={handleSignup}
                                name="empId"
                                id="empId"
                                placeholder={"Enter Employee Id"}
                                className="input-wrapper"
                            />
                        </Col>
                    </Row>
                    <Row className="form-group">
                    <Label  md={{ size: 3, offset: 3 }} className="label-wrapper">Name</Label>
                        <Col md={{ size: 6, offset: 4 }}>
                            <Input
                                rule={username}
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
                                type="text"
                                name='address'
                                id="address"
                                rule={requiredField}
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
                                type="text"
                                name='userName'
                                id="userName"
                                rule={requiredField}
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
                                type="text"
                                name='email'
                                id="email"
                                rule={emailValidation}
                                onChange={handleSignup}
                                placeholder={"Enter E-mail"}
                                className="input-wrapper"
                            />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label md={{ size: 3, offset: 3 }} className="label-wrapper">User Role</Label>
                        <Col md={{ size: 6, offset: 4 }}>
                            <Select defaultValue="" 
                                id="userRoleId"
                                rule={requiredField} 
                                name="userRoleId" 
                                className="select-wrapper" 
                            >
                                <Option value="1">Above Management</Option>
                                <Option value="2">Manager</Option>
                                <Option value="3">Employee</Option>
                                <Option value="4">Third Party Employee</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label md={{ size: 3, offset: 3 }} className="label-wrapper">Department Name</Label>
                        <Col md={{ size: 6, offset: 4 }}>
                            <Select defaultValue="" 
                                id="userRoleId"
                                rule={requiredField} 
                                name="userRoleId" 
                                className="select-wrapper" 
                            >
                                <Option value="1">Above Management</Option>
                                <Option value="2">Manager</Option>
                                <Option value="3">Employee</Option>
                                <Option value="4">Third Party Employee</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row className="form-group">
                    <Label  md={{ size: 3, offset: 3 }}></Label>
                        <Col md={{ size: 3, offset: 5 }}>
                            <Button className="button-wrapper primary"
                            onClick={saveEmployeeDetails} 
                            >Save</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    )    
}

export default SaveWareHouse;