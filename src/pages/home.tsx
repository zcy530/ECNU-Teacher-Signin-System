import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import LeaveRequest from './leaveInfo/leaveRequst.tsx';
import MyCourse from './mycourse/mycourse.tsx';
import Me from './me/me.tsx';

const { Header, Sider, Content } = Layout;

const Home: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { token: { colorBgContainer },} = theme.useToken();
  const [ selectedTab, setSelectedTab ] = useState<string>('1');

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
      <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          onSelect={(item)=>{
            setSelectedTab(item.key)
          }}
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: '请假消息',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: '我的课程',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: '个人中心',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          ECNU签到管理系统——教师端
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 700,
            background: colorBgContainer,
          }}
        >
          {selectedTab=='1' && <LeaveRequest></LeaveRequest>}
          {selectedTab=='2' && <MyCourse></MyCourse> }
          {selectedTab=='3' && <Me></Me> }
          
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;

