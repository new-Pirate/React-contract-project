import React from 'react';
import { Avatar, Button } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { USERS_API } from '../../api/api';
import InfoItem from '../../components/InfoItem/InfoItem';
import users from '../../constants/users';
import './UserInfo.css';

const USER = new USERS_API();

class UserInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null
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
  }

  render() {
    const { user } = this.state;
    const { activeUser, history } = this.props;

    if (!user) {
      return <div className="user-info-missing">Выберите пользователя</div>;
    }

    return (
      <div>
        <div className="user-info-header">Информация пользователя "{user.username}"</div>
        <div className="user-info">
          <Avatar className="user-info-avatar" size={100} src={user.url} />
          <div className="user-info-blockinfo">
            <InfoItem title={users.name} desc={user.name} />
            <InfoItem title={users.username} desc={user.username} />
            <InfoItem title={users.email} desc={user.email} />
            <InfoItem title={users.phone} desc={user.phone} />
            <InfoItem title={users.website} desc={user.website} />
            <InfoItem title={users.id} desc={user.id} />
          </div>
        </div>
        <div className="user-info-buttonWrap">
          <Button
            type="primary"
            onClick={() => history.push(`/users/view/${activeUser}`)}
          >
            Подробная информация
          </Button>
        </div>
      </div>
    );
  }
}

UserInfo.propTypes = {
  activeUser: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(UserInfo);
