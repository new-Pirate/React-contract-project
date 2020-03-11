import React from 'react';

import User from '../../components/User/User';
import { USERS_API } from '../../api/api';
import './Users.css';

const USERS = new USERS_API();

class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      usersList: []
    };
    this.getUsers();
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }


  getUsers = () => {
    USERS.get('/users')
      .then((users) => {
        if (this._mounted) {
          this.setState(() => {
            return { usersList: users };
          });
        }
      });
  }

  render() {
    const usersList = this.state.usersList;

    return (
      <div className="users">
        <div className="users-list">
          {
            usersList.map((user) => {
              return <User key={user.id} user={user} />;
            })
          }
        </div>
        <div className="users-info">

        </div>
      </div>
    );
  }
}

export default Users;
