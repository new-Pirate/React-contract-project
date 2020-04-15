import React from 'react';
import { Avatar } from 'antd';

import InfoItem from '../../components/InfoItem/InfoItem';
import { users } from '../../constants/users';
import { USERS_API } from '../../api/api';
import './RandomUser.css';

const API = new USERS_API();

class RandomUser extends React.Component {
  constructor() {
    super();
    this.state = {
      randomUser: {
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
      }
    };
  }

  componentDidMount() {
    this.updateUser();
    setInterval(this.updateUser, 2000);
  }

  updateUser = () => {
    const id = Math.ceil(Math.random() * 10);
    API.get(`/users/${id}`)
      .then((user) => {
        this.setState({
          randomUser: user
        });
      });
  }

  render() {
    const randomUser = this.state.randomUser;

    return (
      <div className="randomUser">
        <div className="randomUser-header">Информация пользователя "{randomUser.username}"</div>
        <div className="randomUser-info">
          <Avatar className="randomUser-info-avatar" size={200} src={randomUser.url} />
          <div className="randomUser-info-blockinfo">
            <InfoItem title={users.name} desc={randomUser.name} />
            <InfoItem title={users.username} desc={randomUser.username} />
            <InfoItem title={users.email} desc={randomUser.email} />
            <InfoItem title={users.phone} desc={randomUser.phone} />
            <InfoItem title={users.website} desc={randomUser.website} />
            <InfoItem title={users.id} desc={randomUser.id} />
          </div>
        </div>
      </div>
    );
  }
}

export default RandomUser;
