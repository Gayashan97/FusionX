import React,{useEffect, useState} from 'react';
import {
     Label, Row, Col
} from 'reactstrap';
import { Form , Input, Button,Card} from 'antd';
import '../../App.css';
import axios from 'axios';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { DatePicker, Space } from 'antd';
import image from '../../assets/background.jpg';
import moment from 'moment';
import { CalculatorOutlined } from '@ant-design/icons';

const Login =({setFalse})=>{
    const { Meta } = Card;
    const dispatch = useDispatch();
    const history = useHistory();
    const [createdDate, setCreatedDate] = useState('');
    const [clearingDate, setClearingdDate] = useState(''); 
    const [demurrage, setDemurrage] = useState(null); 

    useEffect(()=>{
        setFalse();
        if(clearingDate){
            axios.post('https://ky107h7r00.execute-api.ap-southeast-1.amazonaws.com/Prod/DemurrageCalculation',JSON.stringify({"createdDate":createdDate,"clearingDate":clearingDate}))
           .then((response)=>{
               console.log(response?.data?.Calculation[0]?.message);
               setDemurrage(response?.data?.Calculation[0]?.message);
           })
        } 
      },[clearingDate])

    const onChangeCreatedDate = (value, dateString) => {
        setCreatedDate(dateString);
    }

    const onChangeClearingDate = (value, dateString) => {
        setClearingdDate(dateString);
       
    }

    return (
        <div className="container "><ToastContainer/>
        
        <h1 >Demurrage Calculator</h1>
        {<CalculatorOutlined style={{ fontSize: '72px', color: '#08c' }} />}
            <div className="col-12 col-md-8">
                <Form
                >        
                        <div className="site-card-wrapper">
                        <Card>
                        <Row gutter={16}>
                            <Col span={10}>
                                <Card bordered={false}>
                                    <Row className="form-group model-wrapper">
                                        <Label md={{ size: 4, offset: 3 }} className="label-wrapper">Created Date</Label>
                                        <Col >
                                            <DatePicker
                                                onChange={onChangeCreatedDate}
                                                // className="input-wrapper"
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="form-group model-wrapper">
                                        <Label md={{ size: 4, offset: 3 }} className="label-wrapper">Clearing Date</Label>
                                        <Col >
                                            <DatePicker
                                                onChange={onChangeClearingDate}
                                                // className="input-wrapper"
                                            />
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            {demurrage ?
                                <Col span={13}>
                                    <Card bordered={true}
                                        hoverable
                                        style={{ width: 250, marginLeft: '30%' }}
                                        cover={<img alt="example" src={image}/>}
                                    >
                                        <Meta title="Demurrage" description={demurrage} />
                                    </Card>
                                </Col>
                            : null}
                        </Row>
                        </Card>
  </div>
                </Form>

                {/* <div className="demurrage">
                <h1><strong> {demurrage} </strong> </h1>
                </div> */}

            </div>
        </div>
    )    
}

export default Login;