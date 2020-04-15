import React from 'react';
import { Avatar, Button } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import InfoItem from '../InfoItem/InfoItem';
import { users } from '../../constants/users';
import './HookUserInfo.css';


function HookUserInfo({ activeUser, userInfo, history }) {
  if (!activeUser) {
    return <div className="hook-user-info-missing">Выберите пользователя</div>;
  }

  return (
    <div>
      <div className="hook-user-info-header">Информация пользователя "{userInfo.username}"</div>
      <div className="hook-user-info">
        <Avatar className="hook-user-info-avatar" size={100} src={userInfo.url} />
        <div className="hook-user-info-blockinfo">
          <InfoItem title={users.name} desc={userInfo.name} />
          <InfoItem title={users.username} desc={userInfo.username} />
          <InfoItem title={users.email} desc={userInfo.email} />
          <InfoItem title={users.phone} desc={userInfo.phone} />
          <InfoItem title={users.website} desc={userInfo.website} />
          <InfoItem title={users.id} desc={userInfo.id} />
        </div>
      </div>
      <div className="hook-user-info-buttonWrap">
        <Button
          type="primary"
          onClick={() => history.push(`/hookusers/view/${activeUser}`)}
        >
          Подробная информация
        </Button>
      </div>
    </div>
  );
}

HookUserInfo.propTypes = {
  activeUser: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
  userInfo: PropTypes.object
};

export default withRouter(HookUserInfo);
