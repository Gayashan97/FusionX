import React, { useState, useEffect } from 'react';
import { Column  } from '@ant-design/charts';
const DemoArea = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        asyncFetch();
    }, []);
    const asyncFetch = () => {
        fetch('http://fusionex-ml-1754556500.ap-southeast-1.elb.amazonaws.com/activities')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
            console.log('fetch data failed', error);
        }); 
    };
    var config = {
        data: data,
        xField: 'cargo_id',
        yField: 'predicted',
        showTitle: true,
        areaStyle: function areaStyle() {
            return { fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff' };
        },
    };
    
    return (
    <div className="container">
        <br></br>
        <h3>Predicted Demurrage Cost in LKR against Containers</h3>
        <br></br>
        <Column  {...config}/>
        <br></br>
        <p>Demurrage Prediction Chart 1</p>
    </div>
    )
};
export default DemoArea;