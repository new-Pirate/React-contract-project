import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout, Menu } from 'antd';

import Logo from '../../components/Logo/Logo';
import { getCookie, deleteCookie } from '../../utils/cookie';
import { logout } from '../../store/action/auth';
import './AppLayout.css';

const { Header, Content, Footer } = Layout;
const isTokenIn = getCookie('token');

class AppLayout extends React.Component {
  logout = () => {
    deleteCookie('token');
    this.props.logout();
  }
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
            defaultSelectedKeys={['']}
            className="appLayout-menu"
          >
            <Menu.Item key="Users">Users</Menu.Item>
            <Menu.Item key="About">About</Menu.Item>
            <Menu.Item key="Contacts">Contacts</Menu.Item>
            <Menu.Item
              key="Logout"
              className='logout'
              onClick={this.logout}
            >
              Logout
            </Menu.Item>
          </Menu>
        </Header>
        <Content className="appLayout-content">
          <div className="appLayout-layout-content">Content</div>
        </Content>
        <Footer className="appLayout-footer">Test React site ©2020 Created by new_P1rate</Footer>
      </Layout>
    );
  }
}

AppLayout.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = (store) => {
  return {
    isLoggedIn: store.authReduser.isLoggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);
