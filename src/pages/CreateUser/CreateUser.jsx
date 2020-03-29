import React from 'react';
import { Form, Input, Button } from 'antd';

import { users, usersEng } from '../../constants/users';
import { USERS_API } from '../../api/api';
import './CreateUser.css';

const API = new USERS_API();

class CreateUser extends React.Component {
  onFinish = (user) => {
    const newUser = {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      address: {
        street: user.street,
        suite: user.suite,
        city: user.city,
        zipcode: user.zipcode,
        geo: {
          lat: user.lat,
          lng: user.lng
        }
      },
      phone: user.phone,
      website: user.website,
      company: {
        label: user.label,
        catchPhrase: user.catchPhrase,
        bs: user.bs
      },
      url: user.url
    };

    API.post('/users', newUser);
  }
  render() {
    return (
      <div className="edit-user">
        <h2>Создать пользователя</h2>
        <Form
          layout="vertical"
          onFinish={this.onFinish}
        >
          <Form.Item label={users.url} className="edit-user-item" name={usersEng.url}>
            <Input placeholder={users.url} />
          </Form.Item>
          <div className="edit-user-section">
            <h3 className="edit-user-section-title">Общая информация</h3>
            <div className="edit-user-section-block">
              <Form.Item label={users.username} className="edit-user-item" name={usersEng.username}>
                <Input placeholder={users.username} />
              </Form.Item>
              <Form.Item label={users.name} className="edit-user-item" name={usersEng.name}>
                <Input placeholder={users.name} />
              </Form.Item>
              <Form.Item label={users.id} className="edit-user-item" name={usersEng.id}>
                <Input placeholder={users.id} />
              </Form.Item>
            </div>
          </div>
          <div className="edit-user-section">
            <h3 className="edit-user-section-title">{users.contacts}</h3>
            <div className="edit-user-section-block">
              <Form.Item label={users.email} className="edit-user-item" name={usersEng.email}>
                <Input placeholder={users.email} />
              </Form.Item>
              <Form.Item label={users.phone} className="edit-user-item" name={usersEng.phone}>
                <Input placeholder={users.phone} />
              </Form.Item>
              <Form.Item label={users.website} className="edit-user-item" name={usersEng.website}>
                <Input placeholder={users.website} />
              </Form.Item>
            </div>
          </div>
          <div className="edit-user-section">
            <h3 className="edit-user-section-title">{users.address}</h3>
            <div className="edit-user-section-block">
              <Form.Item label={users.address_street} className="edit-user-item" name={usersEng.address_street}>
                <Input placeholder={users.address_street} />
              </Form.Item>
              <Form.Item label={users.address_suite} className="edit-user-item" name={usersEng.address_suite}>
                <Input placeholder={users.address_suite} />
              </Form.Item>
              <Form.Item label={users.address_city} className="edit-user-item" name={usersEng.address_city}>
                <Input placeholder={users.address_city} />
              </Form.Item>
              <Form.Item label={users.address_zipcode} className="edit-user-item" name={usersEng.address_zipcode}>
                <Input placeholder={users.address_zipcode} />
              </Form.Item>
              <Form.Item label={users.address_lat} className="edit-user-item" name={usersEng.address_lat}>
                <Input placeholder={users.address_lat} />
              </Form.Item>
              <Form.Item label={users.address_lng} className="edit-user-item" name={usersEng.address_lng}>
                <Input placeholder={users.address_lng} />
              </Form.Item>
            </div>
          </div>
          <div className="edit-user-section">
            <h3 className="edit-user-section-title">{users.company}</h3>
            <div className="edit-user-section-block">
              <Form.Item label={users.company_label} className="edit-user-item" name={usersEng.company_label}>
                <Input placeholder={users.company_label} />
              </Form.Item>
              <Form.Item label={users.company_catchPhrase} className="edit-user-item" name={usersEng.company_catchPhrase}>
                <Input placeholder={users.company_catchPhrase} />
              </Form.Item>
              <Form.Item label={users.company_bs} className="edit-user-item" name={usersEng.company_bs}>
                <Input placeholder={users.company_bs} />
              </Form.Item>
            </div>
          </div>
          <div className="edit-user-button-block">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="edit-user-button"
              >
                Создать пользователя
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    );
  }
}

export default CreateUser;
