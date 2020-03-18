import React from 'react';
import { Avatar, Button } from 'antd';

import users from '../../constants/users';
import InfoItem from '../../components/InfoItem/InfoItem';
import './ViewUser.css';

class UserDetail extends React.Component {
  render() {
    return (
      <div className="view-user">
        <Avatar className="view-user-avatar" size={150} />
        <div className="view-user-section">
          <h3 className="view-user-section-title">Общая информация</h3>
          <div className="view-user-section-block">
            <InfoItem title={users.username} desc={'username'} />
            <InfoItem title={users.name} desc={'name'} />
            <InfoItem title={users.id} desc={'id'} />
          </div>
        </div>
        <div className="view-user-section">
          <h3 className="view-user-section-title">{users.contacts}</h3>
          <div className="view-user-section-block">
            <InfoItem title={users.email} desc={'email'} />
            <InfoItem title={users.phone} desc={'phone'} />
            <InfoItem title={users.website} desc={'website'} />
          </div>
        </div>
        <div className="view-user-section">
          <h3 className="view-user-section-title">{users.adress}</h3>
          <div className="view-user-section-block">
            <InfoItem title={users.adress_street} desc={'adress_street'} />
            <InfoItem title={users.adress_suite} desc={'adress_suite'} />
            <InfoItem title={users.adress_city} desc={'adress_city'} />
            <InfoItem title={users.adress_lat} desc={'adress_lat'} />
            <InfoItem title={users.adress_lng} desc={'adress_lng'} />
          </div>
        </div>
        <div className="view-user-section">
          <h3 className="view-user-section-title">{users.company}</h3>
          <div className="view-user-section-block">
            <InfoItem title={users.company_name} desc={'company_name'} />
            <InfoItem title={users.company_catchPhrase} desc={'company_catchPhrase'} />
            <InfoItem title={users.company_bs} desc={'company_bs'} />
          </div>
        </div>
      </div>
    );
  }
}

export default UserDetail;
