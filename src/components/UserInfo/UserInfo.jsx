import React from 'react';
import { Avatar, Button } from 'antd';
import PropTypes from 'prop-types';

import { USERS_API } from '../../api/api';
import './UserInfo.css';

const USER = new USERS_API();

class UserInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      photo: null
    };
  }

  componentDidMount() {
    this.updateUser();
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeUser !== prevProps.activeUser) {
      this.updateUser();
    }
  }

  updateUser = () => {
    const { activeUser } = this.props;
    if (!activeUser) {
      return;
    }

    USER.get(`/users/${activeUser}`)
      .then((user) => {
        this.setState(() => {
          return { user: user };
        });
      });

    USER.get(`/photos/${activeUser}`)
      .then((photo) => {
        this.setState(() => {
          return { photo: photo };
        });
      });
  }

  render() {
    const { user, photo } = this.state;

    if (!user) {
      return <span>Выберите пользователя</span>;
    }

    return (
      <div>
        <div className="user-info">
          <Avatar className="user-info-avatar" size={100} src={photo.url} />
          <div className="user-info-blockinfo">
            <div className="user-info-item">
              <div className="user-info-item-title">Полное имя</div>
              <div className="user-info-item-desc">{user.name}</div>
            </div>
            <div className="user-info-item">
              <div className="user-info-item-title">Username</div>
              <div className="user-info-item-desc">{user.username}</div>
            </div>
            <div className="user-info-item">
              <div className="user-info-item-title">Email</div>
              <div className="user-info-item-desc">{user.email}</div>
            </div>
            <div className="user-info-item">
              <div className="user-info-item-title">Телефон</div>
              <div className="user-info-item-desc">{user.phone}</div>
            </div>
            <div className="user-info-item">
              <div className="user-info-item-title">Сайт</div>
              <div className="user-info-item-desc">{user.website}</div>
            </div>
            <div className="user-info-item">
              <div className="user-info-item-title">id номер</div>
              <div className="user-info-item-desc">{user.id}</div>
            </div>
          </div>
        </div>
        <div className="user-info-buttonWrap">
          <Button type="primary">Подробная информация</Button>
        </div>
      </div>
    );
  }
}

UserInfo.propTypes = {
  activeUser: PropTypes.number.isRequired
};

export default UserInfo;
