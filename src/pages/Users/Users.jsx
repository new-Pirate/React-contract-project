import React from 'react';

import User from '../../components/User/User';
import SearchPanel from '../../components/SearchPanel/SearchPanel';
import { USERS_API } from '../../api/api';
import './Users.css';

const USERS = new USERS_API();

class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      usersList: [],
      activeUser: 0,
      term: ''
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

  onSearch = (term) => {
    this.setState({
      term: term
    });
  }

  searchUsers = (usersList, term) => {
    if (term.length === 0) {
      return usersList;
    }

    return usersList.filter((user) => {
      return user.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  onActiveUser = (id) => {
    this.setState({
      activeUser: id
    });
  }

  render() {
    const { usersList, activeUser, term } = this.state;
    const visibleUserList = this.searchUsers(usersList, term);

    return (
      <div className="users">
        <div className="users-list">
          <SearchPanel onSearch={this.onSearch}/>
          <h4>Найдено: {usersList.length} пользователей</h4>
          {
            visibleUserList.map((user) => {
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
