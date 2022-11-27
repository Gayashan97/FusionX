import React,{useEffect, useState} from 'react';
import {
     Label, Row, Col
} from 'reactstrap';
import { Card} from 'antd';
import '../../App.css';
import axios from 'axios';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { DatePicker, Space } from 'antd';
import moment from 'moment';

const ContactUs =({setFalse})=>{
    const { Meta } = Card;

    useEffect(()=>{
        setFalse()
    },[]);
    
    return (
        <div className="container "><ToastContainer />
          <h1>Contact us</h1>
            <div className="col-12 col-md-9 contact-wrapper">
                <div className="site-card-wrapper">
                    <Row gutter={16}>
                        <Col span={10}>
                            <Card title="Contact us via E-mail" bordered={false}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="70" fill="currentColor" class="bi bi-envelope-open-fill" viewBox="0 0 16 16">
                                    <path d="M8.941.435a2 2 0 0 0-1.882 0l-6 3.2A2 2 0 0 0 0 5.4v.313l6.709 3.933L8 8.928l1.291.717L16 5.715V5.4a2 2 0 0 0-1.059-1.765l-6-3.2zM16 6.873l-5.693 3.337L16 13.372v-6.5zm-.059 7.611L8 10.072.059 14.484A2 2 0 0 0 2 16h12a2 2 0 0 0 1.941-1.516zM0 13.373l5.693-3.163L0 6.873v6.5z" />
                                </svg>
                                <br />
                                <br />
                                <Meta title="E-mail: sdgp_fusionx@iit.ac.lk" />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title="Contact us via Phone" bordered={false}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="70" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                </svg>
                                <br />
                                <br />
                                <Meta title="Number: +94 76 527 1733" />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )    
}

export default ContactUs;