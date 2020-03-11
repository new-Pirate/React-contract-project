import React from 'react';
import PropTypes from 'prop-types';

import './User.css';


class User extends React.Component {
  render() {
    const { name, id, username, email, phone } = this.props.user;

    return (
      <div className="user">
        <div className="user-leftside">
          <div className="user-name">{name}</div>
          <div className="user-username">{username}</div>
          <div className="user-email">{email}</div>
        </div>
        <div className="user-rightside">
          <div className="user-phone">{phone}</div>
          <div className="user-id">{id}</div>
        </div>
      </div>
    );
  }
}

User.propTypes = {
  user: PropTypes.object.isRequired
};

export default User;
