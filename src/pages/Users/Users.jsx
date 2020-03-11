import React from 'react';

import User from '../../components/User/User';
import { USERS_API } from '../../api/api';
import './Users.css';

const USERS = new USERS_API();

class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      usersList: [],
      activeUser: 0
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

  onActiveUser = (id) => {
    this.setState({
      activeUser: id
    });
  }

  render() {
    const { usersList, activeUser } = this.state;

    return (
      <div className="users">
        <div className="users-list">
          <h4 className="users-">Найдено: {usersList.length} пользователей</h4>
          {
            usersList.map((user) => {
              return <User
                key={user.id}
                user={user}
                onActiveUser={() => this.onActiveUser(user.id)}
                activeUser={activeUser}
              />;
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
