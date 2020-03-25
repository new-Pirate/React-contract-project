import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

import { users, usersEng } from '../../constants/users';
import { getUserDetails, submitUserDetails } from '../../store/action/user';
import { USERS_API } from '../../api/api';
import './EditUser.css';

const API = new USERS_API();

class EditUser extends React.Component {
  constructor() {
    super();
    this.state = {
      details: {
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
          name: '',
          catchPhrase: '',
          bs: ''
        },
        url: ''
      }
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getUserDetails(`/users/${id}`);
  }

  componentDidUpdate(prevProps) {
    if (this.props.details !== prevProps.details) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(() => {
        return { details: this.props.details };
      });
    }
  }

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

    const { id } = this.props.match.params;
    this.props.submitUserDetails(`/users/${id}`, newUser);
    this.props.history.push(`/users/view/${id}`);
  }

  render() {
    const { details } = this.state;

    return (
      <div className="edit-user">
        <h2>Редактирование пользователя {details.username}</h2>
        <Form
          layout="vertical"
          onFinish={this.onFinish}
        >
          <Form.Item label={users.url} className="edit-user-item" name={usersEng.url}>
            <Input placeholder={details.url} defaultValue={details.url} />
          </Form.Item>
          <div className="edit-user-section">
            <h3 className="edit-user-section-title">Общая информация</h3>
            <div className="edit-user-section-block">
              <Form.Item label={users.username} className="edit-user-item" name={usersEng.username}>
                <Input placeholder={details.username} defaultValue={details.username} />
              </Form.Item>
              <Form.Item label={users.name} className="edit-user-item" name={usersEng.name}>
                <Input placeholder={details.name} defaultValue={details.name} />
              </Form.Item>
              <Form.Item label={users.id} className="edit-user-item" name={usersEng.id}>
                <Input placeholder={details.id} defaultValue={details.id} disabled />
              </Form.Item>
            </div>
          </div>
          <div className="edit-user-section">
            <h3 className="edit-user-section-title">{users.contacts}</h3>
            <div className="edit-user-section-block">
              <Form.Item label={users.email} className="edit-user-item" name={usersEng.email}>
                <Input placeholder={details.email} defaultValue={details.email} />
              </Form.Item>
              <Form.Item label={users.phone} className="edit-user-item" name={usersEng.phone}>
                <Input placeholder={details.phone} defaultValue={details.phone} />
              </Form.Item>
              <Form.Item label={users.website} className="edit-user-item" name={usersEng.website}>
                <Input placeholder={details.website} defaultValue={details.website} />
              </Form.Item>
            </div>
          </div>
          <div className="edit-user-section">
            <h3 className="edit-user-section-title">{users.address}</h3>
            <div className="edit-user-section-block">
              <Form.Item label={users.address_street} className="edit-user-item" name={usersEng.address_street}>
                <Input placeholder={details.address.street} defaultValue={details.address.street} />
              </Form.Item>
              <Form.Item label={users.address_suite} className="edit-user-item" name={usersEng.address_suite}>
                <Input placeholder={details.address.suite} defaultValue={details.address.suite} />
              </Form.Item>
              <Form.Item label={users.address_city} className="edit-user-item" name={usersEng.address_city}>
                <Input placeholder={details.address.city} defaultValue={details.address.city} />
              </Form.Item>
              <Form.Item label={users.address_zipcode} className="edit-user-item" name={usersEng.address_zipcode}>
                <Input placeholder={details.address.zipcode} defaultValue={details.address.zipcode} />
              </Form.Item>
              <Form.Item label={users.address_lat} className="edit-user-item" name={usersEng.address_lat}>
                <Input placeholder={details.address.geo.lat} defaultValue={details.address.geo.lat} />
              </Form.Item>
              <Form.Item label={users.address_lng} className="edit-user-item" name={usersEng.address_lng}>
                <Input placeholder={details.address.geo.lng} defaultValue={details.address.geo.lng} />
              </Form.Item>
            </div>
          </div>
          <div className="edit-user-section">
            <h3 className="edit-user-section-title">{users.company}</h3>
            <div className="edit-user-section-block">
              <Form.Item label={users.company_label} className="edit-user-item" name={usersEng.company_label}>
                <Input placeholder={details.company.label} defaultValue={details.company.label} />
              </Form.Item>
              <Form.Item label={users.company_catchPhrase} className="edit-user-item" name={usersEng.company_catchPhrase}>
                <Input placeholder={details.company.catchPhrase} defaultValue={details.company.catchPhrase} />
              </Form.Item>
              <Form.Item label={users.company_bs} className="edit-user-item" name={usersEng.company_bs}>
                <Input placeholder={details.company.bs} defaultValue={details.company.bs} />
              </Form.Item>
            </div>
          </div>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="edit-user-button"
            >
              Сохранить пользователя
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

EditUser.propTypes = {
  getUserDetails: PropTypes.func.isRequired,
  submitUserDetails: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  details: PropTypes.object.isRequired
};

const mapStateToProps = (store) => {
  return {
    details: store.userReduser.details
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserDetails: (api) => dispatch(getUserDetails(api)),
    submitUserDetails: (url, body) => dispatch(submitUserDetails(url, body))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditUser));
