import React, { useEffect, useState } from 'react';
import {
    Button, Form, Label, Input, FormFeedback, Row, Col
} from 'reactstrap';

const Signup = () => {
    const [userDetails, setUserDetails] = useState({
        "firstname": "",
        "lastname": "",
        "email": "",
        "password": "",
        "errors": "",
    });

    const handleSignup = (e) => {
        const { name, value } = e.target;
        setUserDetails(userDetails => ({ ...userDetails, [name]: value }));
    }

    const handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...userDetails, [field]: true }
        });
    }

    return (
        <div className="container container-wrapper">
            <h3>Signup Page</h3>
            <span className="col-5 col-md image">
                <img className="image-wrapper" src="assests/sdgp.jpeg" alt="Web console" />
            </span>
            <div className="col-12 col-md-9">
                <Form>
                    <Row className="form-group">
                        <Label htmlFor="firstname" md={{ size: 3, offset: 3 }}>First Name</Label>
                        <Col md={6}>
                            <Input type="firstname" name="firstname" id="firstname"
                                onChange={handleSignup}
                                onBlur={handleBlur('firstname')}
                                value={userDetails.firstname}
                                valid={userDetails.errors.firstname === ''}
                                invalid={userDetails.errors.firstname !== ''}
                            />

                            <FormFeedback>  {userDetails.errors.firstname} </FormFeedback>
                        </Col>
                    </Row>

                    <Row className="form-group">
                        <Label htmlFor="lastname" md={{ size: 3, offset: 3 }}>Last Name</Label>
                        <Col md={6}>
                            <Input type="lastname" name="lastname" id="lastname"
                                onChange={handleSignup}
                                onBlur={handleBlur('lastname')}
                                value={userDetails.lastname}
                                valid={userDetails.errors.lastname === ''}
                                invalid={userDetails.errors.lastname !== ''}
                            />

                            <FormFeedback>  {userDetails.errors.lastname} </FormFeedback>
                        </Col>

                    </Row>

                    <Row className="form-group">
                        <Label htmlFor="email" md={{ size: 3, offset: 3 }}>Email</Label>
                        <Col md={6}>
                            <Input type="email" name="email" id="email"
                                onChange={handleSignup}
                                onBlur={handleBlur('email')}
                                value={userDetails.email}
                                valid={userDetails.errors.email === ''}
                                invalid={userDetails.errors.email !== ''}
                            />

                            <FormFeedback>  {userDetails.errors.email} </FormFeedback>
                        </Col>
                    </Row>

                    <Row className="form-group">
                        <Label htmlFor="password" md={{ size: 3, offset: 3 }}>Password</Label>
                        <Col md={6}>
                            <Input type="password" name="password" id="password"
                                onChange={handleSignup}
                            />

                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col md={{ size: 3, offset: 6 }}>
                            <Button className="button-wrapper"
                            // onClick={this.submitCustomer} 
                            >Signup</Button>
                        </Col>
                    </Row>
                    <Row className="form-group">
                    <Label  md={{ size: 6, offset: 5 }}><strong> Already have an Account ?<a href="/">  Login</a> </strong></Label>
                    </Row>
                </Form>
            </div>

        </div>

    )
}


export default Signup;