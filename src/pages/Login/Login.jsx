import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Logo from '../../components/Logo/Logo';
import { getAuthData } from '../../store/action/auth';
import './Login.css';

class Login extends React.Component {

  onFinish = (values) => {
    this.props.getAuthData(values);
  }

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to='/' />;
    }
    return (
      <div className="loginPage">
        <div className="loginPage-background" />
        <div className="loginPage-form">
          <Form
            name="normal_login"
            className="login-form loginForm"
            onFinish={this.onFinish}
          >
            <Logo />
            <h2 className="loginForm-title">Вход в систему</h2>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Введите ваш логин!'
                }
              ]}
            >
              <Input
                placeholder="Логин"
                className="loginForm-input"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Введите ваш пароль!'
                }
              ]}
            >
              <Input
                type="password"
                placeholder="Пароль"
                className="loginForm-input"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button loginForm-button"
              >
                Войти
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  getAuthData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = (store) => {
  return {
    isLoggedIn: store.authReduser.isLoggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAuthData: (formResult) => dispatch(getAuthData(formResult))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
