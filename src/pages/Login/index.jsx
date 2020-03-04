import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { Redirect } from 'react-router-dom';

import Logo from '../../component/Logo/Logo';
import { getAuthData } from '../../store/actions/auth';
import { URL_AUTH, API_AUTH } from '../../api/index';
import './login.css';

const API = new API_AUTH();

class Login extends React.Component {
  onFinish = (values) => {
    console.log(values);
    API.post(URL_AUTH, values);
  }

  render() {
    // if (isLoggedIn) {
    //   return <Redirect to="/" />;
    // }

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

// const mapStateToProps = (state) => {
//   return {
//     isLoggedIn: state.authReducer.isLoggedIn
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getAuthData: (values) => dispatch(getAuthData(values))
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Login);
export default Login;
