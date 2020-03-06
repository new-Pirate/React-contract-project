import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout, Menu } from 'antd';

import Logo from '../../components/Logo/Logo';
import { getCookie } from '../../utils/cookie';
import './AppLayout.css';

const { Header, Content, Footer } = Layout;
const isTokenIn = getCookie('token');

class AppLayout extends React.Component {
  render() {
    if (this.props.isLoggedIn === false && isTokenIn === undefined) {
      return <Redirect to='/login' />;
    }
    return (
      <Layout>
        <Header>
          <Logo />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            className="appLayout-menu"
          >
            <Menu.Item key="Users">Users</Menu.Item>
            <Menu.Item key="About">About</Menu.Item>
            <Menu.Item key="Contacts">Contacts</Menu.Item>
          </Menu>
        </Header>
        <Content className="appLayout-content">
          <div className="appLayout-layout-content">Content</div>
        </Content>
        <Footer className="appLayout-footer">Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    );
  }
}

AppLayout.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = (store) => {
  return {
    isLoggedIn: store.authReduser.isLoggedIn
  };
};

export default connect(mapStateToProps)(AppLayout);
