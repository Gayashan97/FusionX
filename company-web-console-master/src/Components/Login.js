import React,{useEffect, useState} from 'react';
import {
     Label, Row, Col
} from 'reactstrap';
import { Form , Input, Button} from 'antd';
// import {username} from '../Components/Validation/Validation';
import './Login.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import {loginSuccess} from './Auth/AuthAction';
import { useCookies } from 'react-cookie';

const Login =()=>{
    const [userDetails, setUserDetails] = useState({
        userName:'',
        password:'',
    });
    const dispatch = useDispatch();
    const history = useHistory();
    const [cookies, setCookie, removeCookie] = useCookies(['authDetails']);
    const authDetails = useSelector(state => state?.auth?.authDetails?.data?.Successful || []);

    const handleSignup = (e) => {
        const {name,value} = e.target
        setUserDetails({
            ...userDetails,
            [name]:value
        })
    }

    const loginCustomer = async () => {
        const user = {
            ...userDetails,
            consoleTypeId: 1
        }
        dispatch(loginSuccess({
            ...user
        }));
    }
    useEffect (()=>{
        if(authDetails?.length>0 && cookies ){
            history.push("/dashboard");
        }
    },[])
    return (
        <>
         {/* <div className="container container-wrapper">*/}
            {/* <h3>Login</h3>
            <span className="col-5 col-md image">
                <img className="image-wrapper" src="assests/sdgp.jpeg" alt="Web console" />
            </span>
            <div className="col-12 col-md-9"> */}
                {/* <Form
                className="login-form"
                
                >
                    <Row className="form-group">
                    <Label  md={{ size: 3, offset: 3 }} className="label-wrapper">Username</Label>
                        <Col md={{ size: 6, offset: 4 }}>
                            <Input
                                type="text"
                                
                                name="userName"
                                
                                placeholder={"Enter Username"}
                                className="input-wrapper"
                            />
                        </Col>
                    </Row>

                    <Row className="form-group">
                    <Label  md={{ size: 3, offset: 3 }} className="label-wrapper">Password</Label>
                        <Col md={{ size: 6, offset: 4 }}>
                            <Input
                                type="password"
                                
                                
                                label={'Password'}
                                placeholder={"Enter Password"}
                                className="input-wrapper"
                            />
                        </Col>
                    </Row>
                    <Row className="form-group">
                    <Label  md={{ size: 3, offset: 3 }}></Label>
                        <Col md={{ size: 3, offset: 5 }}>
                            <Button className="button-wrapper"
                            type="primary"
                            htmlType="submit"
                            >Login</Button>
                        </Col>
                    </Row>
                </Form> */}
            <div className="outer">
                <div className="inner">
                    <Form
                        name="login"
                        onFinish={loginCustomer}
                    >
                        <ToastContainer />
                        <span>
                        <img src="assets/emp.png" alt="container" width="350" />
                        </span>
                        <h3>Log in</h3>

                        <div className="form-group">
                            <label>Username</label>
                            <input type="username"
                                name="userName"
                                id="username"
                                className="form-control"
                                placeholder="Enter username"
                                onChange={handleSignup}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password"
                                className="form-control"
                                placeholder="Enter password"
                                name='password'
                                id="password"
                                onChange={handleSignup}
                            />
                        </div>

                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div>

                        <button className="btn btn-dark btn-lg btn-block" type="primary" htmlType="submit">Sign in</button>
                        <p className="forgot-password text-right">
                            Forgot <a href="#">password?</a>
                        </p>
                    </Form>
                </div>
            </div>
        </>
    )    
}

export default Login;