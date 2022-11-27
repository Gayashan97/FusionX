import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { useHistory, Switch, Route, Redirect } from "react-router-dom";
import './App.css';
import { DashboardOutlined, UsergroupAddOutlined, UserAddOutlined, HomeOutlined, FolderOpenOutlined , CalculatorOutlined, LogoutOutlined} from '@ant-design/icons';
import ActivityList from './Components/ActivityList/ActivityList';
import ActivityLogs from './Components/ActivityList/ActivityLogs';
import AddEmployee from './Components/Employee/AddEmployee';
import UpdateEmployee from './Components/Employee/UpdateEmployee';
import ViewEmployee from './Components/Employee/ViewEmployee';
import AddThirdParty from './Components/ThirdParty/AddThirdParty';
import UpdateThirdParty from './Components/ThirdParty/UpdateThirdParty';
import ViewThirdParty from './Components/ThirdParty/ViewThirdParty';
import ChartOne from './Components/Statistics/ChartOne';
import ChartTwo from './Components/Statistics/ChartTwo';
import SaveWareHouse from './Components/WareHouse/SaveWareHouse';
import ViewWareHouse from './Components/WareHouse/ViewWareHouse';
import Demurrage from './Components/Demurrage/Demurrage';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { loginClearDetails } from './Components/Auth/AuthAction';

const HomePage = () => {
  const { Header, Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;
  const dispatch = useDispatch();
  const history = useHistory();
  const [homePage, setHomePage] = useState(true);
  const [collapse, setcollapse] = useState(false);
  const [employeeId, setEmpId] = useState(null);
  const [thirdPartyId, setThirdId] = useState(null);
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
          <SubMenu key="sub1" icon={<DashboardOutlined />} title="Demurrage Stats">
              <Menu.Item key="1"><span onClick={(e) => handleItemClick('chart-one')}>Chart 1</span></Menu.Item>
              <Menu.Item key="2"><span onClick={(e) => handleItemClick('chart-two')}>Chart 2</span></Menu.Item>
            </SubMenu>
          <SubMenu key="sub2" icon={<UsergroupAddOutlined />} title="Employee">
              <Menu.Item key="3"><span onClick={(e) => handleItemClick('employee')}>Add Employee</span></Menu.Item>
              <Menu.Item key="4"><span onClick={(e) => handleItemClick('view-employee')}>View Employees</span></Menu.Item>
            </SubMenu>
          <SubMenu key="sub3" icon={<UserAddOutlined />} title="Third Party">
              <Menu.Item key="5"><span onClick={(e) => handleItemClick('thirdParty')}>Add Third Party User</span></Menu.Item>
              <Menu.Item key="6"><span onClick={(e) => handleItemClick('view-thirdParty')}>View Users</span></Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" icon={<HomeOutlined />} title="Ware House">
              {/* <Menu.Item key="2"><span onClick={(e) => handleItemClick('save-ware-house-items')}>Save Ware House Items</span></Menu.Item> */}
              <Menu.Item key="7"><span onClick={(e) => handleItemClick('view-ware-house-items')}>View Ware House Items</span></Menu.Item>
            </SubMenu>
          <Menu.Item key="8" icon={<FolderOpenOutlined />}>
            <span onClick={(e) => handleItemClick('activities')}>Activities</span>
          </Menu.Item>
          <Menu.Item key="9" icon={<CalculatorOutlined />}>
            <span onClick={(e) => handleItemClick('demurrage-calculator')}>Demurrage Calculate</span>
          </Menu.Item>
          <Menu.Item key="10" >
          <span className="log-out-btn-wrapper" onClick={signOut}>
            <button className="lg-out btn-yellow"> {<LogoutOutlined />} Logout</button>
          </span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
        { homePage ?
        <Content style={{ margin: '24px 16px 0' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <h1>Welcome to fusionEX</h1>
            <h3>Admin Web Console</h3>
            <br></br>
            <span>
              <img src="assests/admin.png" alt="container" width="300" />
            </span>
            <br></br>
            <span>
              <img src="assests/load.gif" alt="container" width="130" />
            </span>
          </div>
        </Content>
        : null}
        <Content style={{ margin: '24px 16px 0' }}>
          <Switch>
            <Route path="/dashboard/chart-one" component={()=><ChartOne setFalse={()=>setHomePage(false)}/>} />
            <Route path="/dashboard/chart-two" component={()=><ChartTwo setFalse={()=>setHomePage(false)}/>} />
            <Route path="/dashboard/activities" component={()=><ActivityList setFalse={()=>setHomePage(false)} sendIdToParent={(id)=>setLogId(id)}/>} />
            <Route path="/dashboard/employee" component={()=><AddEmployee setFalse={()=>setHomePage(false)}/>} />
            <Route path="/dashboard/view-employee" component={()=><ViewEmployee setFalse={()=>setHomePage(false)} setToUpdate={(id)=>setEmpId(id)}/>} />
            <Route path="/dashboard/update-employee" component={()=><UpdateEmployee setFalse={()=>setHomePage(false)} employeeId={employeeId}/>} />
            <Route path="/dashboard/thirdParty" component={()=><AddThirdParty setFalse={()=>setHomePage(false)}/>} />
            <Route path="/dashboard/view-thirdParty" component={()=><ViewThirdParty setFalse={()=>setHomePage(false)} setToUpdate={(id)=>setThirdId(id)}/>} />
            <Route path="/dashboard/update-thirdParty" component={()=><UpdateThirdParty setFalse={()=>setHomePage(false)} thirdPartyId={thirdPartyId}/>} />
            <Route path="/dashboard/contact-us" component={""} />
            <Route path="/dashboard/logs" component={()=><ActivityLogs setFalse={()=>setHomePage(false)} logId={logId}/>} />
            <Route path="/dashboard/demurrage-calculator" component={()=><Demurrage setFalse={()=>setHomePage(false)}/>} />
            <Route path="/dashboard/logs" component={()=><ActivityLogs setFalse={()=>setHomePage(false)} logId={logId}/>} />
            <Route path="/dashboard/save-ware-house-items" component={()=><SaveWareHouse setFalse={()=>setHomePage(false)}/>} />
            <Route path="/dashboard/view-ware-house-items" component={()=><ViewWareHouse setFalse={()=>setHomePage(false)}/>} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}></Footer>
      </Layout>
    </Layout>
  )
}

export default HomePage;
