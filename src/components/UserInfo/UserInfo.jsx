import React from 'react';
import PropTypes from 'prop-types';

import './UserInfo.css';


class UserInfo extends React.Component {
  render() {
    return (
      <div className="user-info">
        <div className="user-info-avatar">Avatar</div>
        <div className="user-info-blockinfo">
          
        </div>
      </div>
    );
  }
}

UserInfo.propTypes = {

};

export default UserInfo;
