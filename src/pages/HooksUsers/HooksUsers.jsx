import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

import { getUsersList } from '../../store/action/user';
import User from '../../components/User/User';
import SearchPanel from '../../components/SearchPanel/SearchPanel';
import UserInfo from '../../components/UserInfo/UserInfo';
import './HooksUsers.css';

function HooksUsers({usersList, loading, getUsersHookList}) {
  const [userHookList, setUserHookList] = useState([]);
  const [activeUser, setActiveUser] = useState(0);
  const [term, setTerm] = useState('');

  useEffect(() => {
    getUsersHookList('/users');
  }, []);

  useEffect(() => {
    setUserHookList(usersList);
  }, [usersList]);

  const onSearch = (termWord) => {
    setTerm(termWord);
  };

  const searchUsers = (usersHookList, termWord) => {
    if (termWord.length === 0) {
      return usersHookList;
    }

    return usersHookList.filter((user) => {
      return user.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  };

  const onActiveUser = (id) => {
    setActiveUser(id);
  };

  const visibleUserList = searchUsers(usersList, term);

  return (
    <Spin
      size="large"
      tip="Loading..."
      spinning={loading}
    >
      <div className="users">
        <div className="users-list">
          <SearchPanel onSearch={onSearch} />
          <h4>Найдено: {userHookList.length} пользователей</h4>
          {
            visibleUserList.map((user) => {
              return <User
                key={user.id}
                user={user}
                onActiveUser={() => onActiveUser(user.id)}
                activeUser={activeUser}
              />;
            })
          }
        </div>
        <div className="users-info">
          <UserInfo
            activeUser={activeUser}
            userInfo={usersList[activeUser - 1]}
          />
        </div>
      </div>
    </Spin>
  );
}

HooksUsers.propTypes = {
  getUsersHookList: PropTypes.func.isRequired,
  usersList: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = (store) => {
  return {
    usersList: store.userReduser.usersList,
    loading: store.userReduser.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsersHookList: (api) => dispatch(getUsersList(api))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HooksUsers));
