import React from 'react';
import { Redirect, Switch, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout, Menu } from 'antd';

import Logo from '../../components/Logo/Logo';
import { Contacts, About, Users, ViewUser } from '../../pages';
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
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['']}
            className="appLayout-menu"
          >
            <Menu.Item key="Users">
              <Link to="/users">Users</Link>
            </Menu.Item>
            <Menu.Item key="About">
              <Link to="/about">About</Link>
            </Menu.Item>
            <Menu.Item key="Contacts">
              <Link to="/contacts">Contacts</Link>
            </Menu.Item>
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
          <Switch>
            <Route path="/users" exact component={Users} />
            <Route path="/about" component={About} />
            <Route path="/contacts" component={Contacts} />
            <Route path="/users/view/:id" component={ViewUser} />
          </Switch>
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
