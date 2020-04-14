import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Avatar, Button, Spin } from 'antd';

import { users } from '../../constants/users';
import InfoItem from '../../components/InfoItem/InfoItem';
import { getUserDetails } from '../../store/action/user';
import './HookViewUser.css';

function HookViewUser({ history, loading, match, getHookUserDetails, details }) {
  const [userHookDetails, setUserHookDetails] = useState({
    id: '',
    name: '',
    username: '',
    email: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: ''
      }
    },
    phone: '',
    website: '',
    company: {
      label: '',
      catchPhrase: '',
      bs: ''
    },
    url: ''
  });

  useEffect(() => {
    getHookUserDetails(`/users/${match.params.id}`);
  }, []);

  useEffect(() => {
    setUserHookDetails(details);
  }, [details]);

  return (
    <Spin
      size="large"
      tip="Loading..."
      spinning={loading}
    >
      <div className="hook-view-user">
        <Avatar className="hook-view-user-avatar" src={userHookDetails.url} size={150} />
        <div className="hook-view-user-section">
          <h3 className="hook-view-user-section-title">Общая информация</h3>
          <div className="hook-view-user-section-block">
            <InfoItem title={users.username} desc={userHookDetails.username} />
            <InfoItem title={users.name} desc={userHookDetails.name} />
            <InfoItem title={users.id} desc={userHookDetails.id} />
          </div>
        </div>
        <div className="hook-view-user-section">
          <h3 className="hook-view-user-section-title">{users.contacts}</h3>
          <div className="hook-view-user-section-block">
            <InfoItem title={users.email} desc={userHookDetails.email} />
            <InfoItem title={users.phone} desc={userHookDetails.phone} />
            <InfoItem title={users.website} desc={userHookDetails.website} />
          </div>
        </div>
        <div className="hook-view-user-section">
          <h3 className="hook-view-user-section-title">{users.address}</h3>
          <div className="hook-view-user-section-block">
            <InfoItem title={users.address_street} desc={userHookDetails.address.street} />
            <InfoItem title={users.address_suite} desc={userHookDetails.address.suite} />
            <InfoItem title={users.address_city} desc={userHookDetails.address.city} />
            <InfoItem title={users.address_zipcode} desc={userHookDetails.address.zipcode} />
            <InfoItem title={users.address_lat} desc={userHookDetails.address.geo.lat} />
            <InfoItem title={users.address_lng} desc={userHookDetails.address.geo.lng} />
          </div>
        </div>
        <div className="hook-view-user-section">
          <h3 className="hook-view-user-section-title">{users.company}</h3>
          <div className="hook-view-user-section-block">
            <InfoItem title={users.company_label} desc={userHookDetails.company.label} />
            <InfoItem title={users.company_catchPhrase} desc={userHookDetails.company.catchPhrase} />
            <InfoItem title={users.company_bs} desc={userHookDetails.company.bs} />
          </div>
        </div>
        <div className="hook-view-user-button-block">
          <Button
            type="primary"
            onClick={() => history.push(`/hookusers/edit/${match.params.id}`)}
          >
            Редактировать пользователя
          </Button>
        </div>
      </div>
    </Spin>
  );
}

HookViewUser.propTypes = {
  getHookUserDetails: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  details: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = (store) => {
  return {
    details: store.userReduser.details,
    loading: store.userReduser.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHookUserDetails: (api) => dispatch(getUserDetails(api))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HookViewUser));
