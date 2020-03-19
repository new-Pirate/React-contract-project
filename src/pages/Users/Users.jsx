import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import User from '../../components/User/User';
import UserInfo from '../../components/UserInfo/UserInfo';
import SearchPanel from '../../components/SearchPanel/SearchPanel';
import { getUsersData } from '../../store/action/user';
import './Users.css';

class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      usersList: [],
      activeUser: 0,
      term: ''
    };
  }

  componentDidMount() {
    this.props.getUsersData('/users');
  }

  componentDidUpdate(prevProps) {
    if (this.props.usersList !== prevProps.usersList) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(() => {
        return { usersList: this.props.usersList };
      });
    }
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
          <SearchPanel onSearch={this.onSearch} />
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
          <UserInfo activeUser={activeUser} />
        </div>
      </div>
    );
  }
}

Users.propTypes = {
  getUsersData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  usersList: PropTypes.array.isRequired
};

const mapStateToProps = (store) => {
  return {
    usersList: store.userReduser.usersList,
    loading: store.userReduser.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsersData: (api) => dispatch(getUsersData(api))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
