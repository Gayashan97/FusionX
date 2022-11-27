import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { useHistory, Switch, Route, Redirect } from "react-router-dom";
import './App.css';
import { UserOutlined, LogoutOutlined, HomeOutlined, FolderOpenOutlined, CalculatorOutlined, PhoneOutlined   } from '@ant-design/icons';
import ActivityList from './Components/ActivityList/ActivityList';
import ActivityLogs from './Components/ActivityList/ActivityLogs';
import AddEmployee from './Components/Employee/AddEmployee';
import ViewEmployee from './Components/Employee/ViewEmployee';
import SaveWareHouse from './Components/WareHouse/SaveWareHouse';
import ViewWareHouse from './Components/WareHouse/ViewWareHouse';
import Demurrage from './Components/Demurrage/Demurrage';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import ContactUs from './Components/ContactUs/ContactUs';
import { loginClearDetails } from './Components/Auth/AuthAction';

const HomePage = () => {
  const { Header, Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;
  const dispatch = useDispatch();
  const history = useHistory();
  const [homePage, setHomePage] = useState(true);
  const [collapse, setcollapse] = useState(false);
  const [logId, setLogId] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['authDetails']);

  const handleItemClick = (path) => {
    history.push(`/dashboard/${path}`);
    setHomePage(false);
  };

  const onCollapse = (collapsed) => {
    setcollapse(true);
  };

  const signOut = () => {
    removeCookie('authDetails', { path: '/' });
    history.push(`/`);
    dispatch(loginClearDetails());
  };
  
  return (
    <Layout className="fixed-width">
      <Sider collapsible  onCollapse={onCollapse}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
          <Menu.Item key="test">
          </Menu.Item>
          <Menu.Item key="test">
          </Menu.Item>
          {/* <SubMenu key="sub1" icon={<UserOutlined />} title="Employee">
              <Menu.Item key="2"><span onClick={(e) => handleItemClick('employee')}>Add Employee</span></Menu.Item>
              <Menu.Item key="3"><span onClick={(e) => handleItemClick('view-employee')}>View Employee</span></Menu.Item>
              <Menu.Item key="4">Alex</Menu.Item>
            </SubMenu> */}
            <SubMenu key="sub1" icon={<HomeOutlined />} title="Ware House">
              {/* <Menu.Item key="2"><span onClick={(e) => handleItemClick('save-ware-house-items')}>Save Ware House Items</span></Menu.Item> */}
              <Menu.Item key="3"><span onClick={(e) => handleItemClick('view-ware-house-items')}>View Ware House Items </span></Menu.Item>
            </SubMenu>
          <Menu.Item key="6" icon={<FolderOpenOutlined />}>
            <span onClick={(e) => handleItemClick('activities')}>Activities</span>
          </Menu.Item>
          <Menu.Item key="8" icon={<CalculatorOutlined />}>
            <span onClick={(e) => handleItemClick('demurrage-calculator')}>Demurrage Calculate</span>
          </Menu.Item>
          <Menu.Item key="9" icon={<PhoneOutlined />}>
            <span onClick={(e) => handleItemClick('contact-us')}>Contact Us</span>
          </Menu.Item>
          <Menu.Item key="10" >
          <span className="log-out-btn-wrapper" onClick={signOut}>
            <button className="lg-out btn-yellow"> {<LogoutOutlined />} Logout</button>
          </span>
          </Menu.Item>
        </Menu>
        {/* <div className="log-out-btn-wrapper" onClick={signOut}>
          <button className="lg-out btn-yellow">Logout</button>
        </div> */}
      </Sider>
      <Layout>
        <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />

        { homePage ?
        <Content style={{ margin: '24px 16px 0' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <h1>Welcome to fusionEX</h1>
            <h3>Employee Web Console</h3>
            <br></br>
            <span>
              <img src="assets/sdgp.png" alt="container" width="620" />
            </span>
            <br></br>
            <span>
              <img src="assets/load.gif" alt="container" width="130" />
            </span>
          </div>
        </Content>
        : null}
        <Content style={{ margin: '24px 16px 0' }}>
          <Switch>
            <Route path="/dashboard/activities" component={()=><ActivityList setFalse={()=>setHomePage(false)} sendIdToParent={(id)=>setLogId(id)}/>} />
            <Route path="/dashboard/employee" component={()=><AddEmployee setFalse={()=>setHomePage(false)}/>} />
            <Route path="/dashboard/save-ware-house-items" component={()=><SaveWareHouse setFalse={()=>setHomePage(false)}/>} />
            <Route path="/dashboard/view-ware-house-items" component={()=><ViewWareHouse setFalse={()=>setHomePage(false)}/>} />
            <Route path="/dashboard/contact-us" component={()=><ContactUs setFalse={()=>setHomePage(false)}/>}/>
            <Route path="/dashboard/demurrage-calculator" component={()=><Demurrage setFalse={()=>setHomePage(false)}/>} />
            <Route path="/dashboard/view-employee" component={()=><ViewEmployee setFalse={()=>setHomePage(false)}/>} />
            <Route path="/dashboard/logs" component={()=><ActivityLogs setFalse={()=>setHomePage(false)} logId={logId}/>} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}></Footer>
        </Layout>
    </Layout>
  )
}

export default HomePage;
