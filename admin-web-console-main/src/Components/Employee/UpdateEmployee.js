import React,{useEffect, useState} from 'react';
import { Button, Label, Row, Col } from 'reactstrap';
import { Form , Input, Select} from 'antd';
import '../../App.css';
import {updateEmployee, clearEmployeeDetails} from './EmployeeAction';
import {getEmployeeById} from './EmployeeAction';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';

const UpdateEmployee =({setFalse, employeeId})=>{

    const employeeById = useSelector(state => state?.employee?.employeeById?.data?.Employees || []);
    // console.log("BBBBBBBBBBBBBBBBBBBBBBB", employeeById)
    const dispatch = useDispatch();
    const saveSuccess = useSelector(state => state?.employee?.employeeDetails?.saveSuccess || false);
    const history = useHistory();
      
    useEffect(()=>{
        dispatch(getEmployeeById(employeeId))
    },[])
    const [employeeDetails, setEmployeeDetails] = useState({
        empId: '',
        name:'',
        age:'',
        contactNo:'',
        address:'',
        userName:'',
        email:'',
        userRoleId:'',
        userRoleName:'',
        // userRoleId:null
    });
    useEffect(()=>{
      const employee = employeeById[0];
    // console.log("AAAAAAAAAAAAAAAAA",employee,employee?.empId && employee.empId)
      setFalse();
      if (employee)
      setEmployeeDetails(employee)
    },[employeeById])
    // const authDetails = useSelector(state => state?.auth?.authDetails?.data);
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

    useEffect(()=>{
        if (saveSuccess) {
            history.push("/dashboard/view-employee");
        }
        console.log("aaaaaaa", saveSuccess);
        dispatch(clearEmployeeDetails());
    },[saveSuccess])

    const updateEmployeeDetails = async () => {
        // const employee = {
        //     ...employeeDetails,
        // }
        dispatch(updateEmployee({
            ...employeeDetails,
            "modifiedUser":1,
            "departmentId":1
        },employeeId));
    }

    return (
        <div className="container">
            <h3>Update Employee</h3>
            <ToastContainer/>
            <div className="col-12 col-md-9">
                <Form>
                    <Row className="form-group">
                    <Label  md={{ size: 3, offset: 3 }} className="label-wrapper">Employee Id</Label>
                        <Col md={{ size: 6, offset: 4 }}>
                            <Input
                                // rules={username}
                                disabled
                                value={employeeDetails.empId}
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
                                value={employeeDetails.name}
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
                                value={employeeDetails.age}
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
                                value={employeeDetails.contactNo}
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
                                value={employeeDetails.address}
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
                                value={employeeDetails.userName}
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
                                value={employeeDetails.email}
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
                            <Select 
                                onChange={handleSignup} value={employeeDetails.userRoleName} id="userRoleId" name="userRoleId" className="select-wrapper" 
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
                            <Select value={employeeDetails.departmentName} id="departmentId" name="departmentId" className="select-wrapper" 
                            // onChange={handleSignup}
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
                            onClick={updateEmployeeDetails} 
                            >Update</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    )    
}

export default UpdateEmployee;