import { useContext } from 'react';
import { Routes, Route, Link, BrowserRouter, Navigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { UserOutlined, UnorderedListOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { UiContext } from '../context/UiContext';

import { CreateTicketPage } from './CreateTicketPage';
import { DeskPage } from './DeskPage';
import { Login } from './Login';
import { QueuePage } from './QueuePage';


const { Sider, Content } = Layout;

export const RouterPage = () => {

  const { isMenuHide } = useContext(UiContext);

  return (
    <BrowserRouter>
      <Layout style={ { height: '100vh' } }>
        <Sider collapsedWidth="0" breakpoint="md" hidden={isMenuHide}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={ ['1'] }>
            <Menu.Item key="1" icon={ <UserOutlined /> }>
              <Link to="/login">
                Login
              </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={ <UnorderedListOutlined /> }>
              <Link to="/queue">
                Tickets queue
              </Link>
            </Menu.Item>
            <Menu.Item key="3" icon={ <PlusCircleOutlined /> }>
              <Link to="/new-ticket">
                New Ticket
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content
            className="site-layout-background"
            style={ {
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            } }
          >
            <Routes>
              <Route path="/login" element={ <Login /> } />
              <Route path="/queue" element={ <QueuePage /> } />
              <Route path="/new-ticket" element={ <CreateTicketPage /> } />
              <Route path="/desk" element={ <DeskPage /> } />
              <Route path="*" element={ <Navigate to="/login" /> } />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};
