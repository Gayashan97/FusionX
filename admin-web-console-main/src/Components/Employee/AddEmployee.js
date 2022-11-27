import React,{useEffect, useState} from 'react';
import { Button, Label, Row, Col } from 'reactstrap';
import { Form , Input, Select} from 'antd';
import '../../App.css';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import {saveEmployee, clearEmployeeDetails} from './EmployeeAction';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';

const AddEmployee =({setFalse})=>{
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
    const saveSuccess = useSelector(state => state?.employee?.employeeDetails?.saveSuccess || false);
    const [userRoleId ,setUserRoleId] = useState(null);
    const [departmentId ,setDepartmentId] = useState(null);
    const { Option } = Select;
    const history = useHistory();

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

    useEffect(()=>{
        if (saveSuccess) {
            history.push("/dashboard/view-employee");
        }
        console.log("aaaaaaa", saveSuccess);
        dispatch(clearEmployeeDetails());
    },[saveSuccess])

    const saveEmployeeDetails = async () => {
        // const employee = {
        //     ...employeeDetails,
        // }
        dispatch(saveEmployee({
            ...employeeDetails,
            "userRoleId":userRoleId,
            "departmentId":departmentId,
            "createdUser":1
        }));
    }

    return (
        <div className="container">
            <h3>Add Employee</h3>
            <ToastContainer/>
            <div className="col-12 col-md-9">
                <Form>
                    <Row className="form-group">
                    <Label  md={{ size: 3, offset: 3 }} className="label-wrapper">Employee Id</Label>
                        <Col md={{ size: 6, offset: 4 }}>
                            <Input
                                // rules={username}
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
                                onChange={handleSignup}
                                placeholder={"Enter E-mail"}
                                className="input-wrapper"
                            />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label md={{ size: 3, offset: 3 }} className="label-wrapper">User Role</Label>
                        <Col md={{ size: 6, offset: 4 }}>
                            <Select defaultValue="Select User Role" id="userRoleId" name="userRoleId" className="select-wrapper" 
                            onChange={(value)=>setUserRoleId(value)}
                            >
                                <Option value="1">SuperAdmin</Option>
                                <Option value="2">Admin</Option>
                                <Option value="3">Employee</Option>
                                <Option value="4">ThirdPartyUser</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label md={{ size: 3, offset: 3 }} className="label-wrapper">Department</Label>
                        <Col md={{ size: 6, offset: 4 }}>
                            <Select defaultValue="Select Department" id="departmentId" name="departmentId" className="select-wrapper" 
                            onChange={(value)=>setDepartmentId(value)}
                            >
                                <Option value="1">MEDICAL</Option>
                                <Option value="2">INDUSTRIAL</Option>
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

export default AddEmployee;