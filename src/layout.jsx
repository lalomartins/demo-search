import { Outlet } from "react-router-dom";
import { Layout } from 'antd';

import logo from './logo.svg';

const { Header, Footer, Content } = Layout;

export function MainLayout() {
  return (
    <Layout>
      <Header style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}>
          <img src={logo} className="App-logo" alt="logo" style={{height: 32}} />
          <h1 style={{color: "whitesmoke"}}>React Search Demo</h1>
        </Header>
      <Content style={{ padding: '0 48px', minHeight: 'calc(100vh - 128px)', boxSizing: 'border-box' }}><Outlet/></Content>
      {/* eslint-disable-next-line react/jsx-no-target-blank */}
      <Footer style={{ textAlign: 'center' }}>©2023 <a href="https://lalomartins.info/" target="_blank">Lalo Martins</a></Footer>
    </Layout>
  );
}
