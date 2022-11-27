import React, { useState, useEffect } from 'react';
import { Area } from '@ant-design/charts';
const DemoArea2 = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        asyncFetch();
    }, []);
    const asyncFetch = () => {
        fetch('http://fusionex-ml-1754556500.ap-southeast-1.elb.amazonaws.com/demurrage')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
            console.log('fetch data failed', error);
        });
    };
    var config = {
        data: data,
        xField: 'date-month',
        yField: 'Demurrage',
        areaStyle: function areaStyle() {
            return { fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff' };
        },
    };
    return (
    <div className="container">
        <br></br>
        <h3>Predicted Demurrage Cost in LKR against each month</h3>
        <br></br>
        <Area {...config}/>
        <br></br>
        <p>Demurrage Prediction Chart 2</p>
    </div>
    )
};
export default DemoArea2;