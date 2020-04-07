import React from 'react';
import { Redirect, Switch, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout, Menu } from 'antd';

import Logo from '../../components/Logo/Logo';
import { CreateUser, RandomUser, Users, ViewUser, EditUser, HooksUsers } from '../../pages';
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
            <Menu.Item key="Random">
              <Link to="/random">Random user</Link>
            </Menu.Item>
            <Menu.Item key="Create">
              <Link to="/create">Create user</Link>
            </Menu.Item>
            <Menu.Item key="Hook">
              <Link to="/hook">Hooks users</Link>
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
            <Route path="/random" component={RandomUser} />
            <Route path="/create" component={CreateUser} />
            <Route path="/users/view/:id" component={ViewUser} />
            <Route path="/users/edit/:id" component={EditUser} />
            <Route path="/hook" component={HooksUsers} />
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
