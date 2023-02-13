import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import AdminSideMenu from './AdminSideMenu';

import { Link } from 'react-router-dom';
import {
  FileAddOutlined,
  FolderAddOutlined,
  DatabaseOutlined,
  FolderOpenOutlined
} from '@ant-design/icons';
import '../../pages/admin-page/QuestionListPage/QuestionList.css';
const { Content, Sider } = Layout;

const SideBarData = [
  {
    key: '1',
    icon: <FileAddOutlined />,
    label: 'Create Question',
    path: '/admin/create-question'
  },
  {
    key: '2',
    icon: <DatabaseOutlined />,
    label: 'Question List',
    path: '/admin/question-list'
  },
  {
    key: '3',
    icon: <FolderAddOutlined />,
    label: 'Create Test',
    path: '/admin/create-test'
  },
  {
    key: '4',
    icon: <FolderOpenOutlined />,
    label: 'Test List',
    path: '/admin/test-list'
  }
].map((item, index) => {
  return {
    key: index,
    label: <Link to={item.path}>{item.label}</Link>,
    icon: item.icon
  };
});

const BasicLayout = ({ children }) => {
  const [menuKey, setMenuKey] = useState('');

  return (
    <Layout style={{ padding: '0', height: '90vh' }}>
      <Layout style={{ display: 'flex' }}>
        <Sider style={{ background: '#f0f2f5' }}>
          <Menu
            theme="light"
            mode="inline"
            style={{
              position: 'fixed',
              width: 'inherit',
              height: '30vh',
              borderRadius: '6px',
              fontSize: '1.7rem',
              background: '#f0f2f5'
            }}
            items={SideBarData}
          />
          {/* <AdminSideMenu/> */}
        </Sider>

        <Content
          style={{
            display: 'flex',
            justifyContent: 'center',
            overflow: 'scroll'
          }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
