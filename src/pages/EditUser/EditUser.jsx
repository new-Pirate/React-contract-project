import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Form, Input, Avatar, Button } from 'antd';

import users from '../../constants/users';
import InfoItem from '../../components/InfoItem/InfoItem';
import { getUserDetails } from '../../store/action/user';
import './EditUser.css';

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

  onFinish = (values) => {
    console.log(values);
  }

  render() {
    const { details } = this.state;

    return (
      <div className="edit-user">
        <h2>Редактирование пользователя {details.username}</h2>
        <Avatar className="edit-user-avatar" src={details.url} size={150} />
        <Form
          layout="vertical"
          onFinish={this.onFinish}
        >
          <div className="edit-user-section">
            <h3 className="edit-user-section-title">Общая информация</h3>
            <div className="edit-user-section-block">
              <Form.Item label={users.username} className="edit-user-item">
                <Input placeholder={users.username} value={details.username} />
              </Form.Item>
              <Form.Item label={users.name} className="edit-user-item">
                <Input placeholder={users.name} value={details.name} />
              </Form.Item>
              <Form.Item label={users.id} className="edit-user-item">
                <Input placeholder={users.id} value={details.id} />
              </Form.Item>
            </div>
          </div>
          <div className="edit-user-section">
            <h3 className="edit-user-section-title">{users.contacts}</h3>
            <div className="edit-user-section-block">
              <Form.Item label={users.email} className="edit-user-item">
                <Input placeholder={users.email} value={details.email} />
              </Form.Item>
              <Form.Item label={users.phone} className="edit-user-item">
                <Input placeholder={users.phone} value={details.phone} />
              </Form.Item>
              <Form.Item label={users.website} className="edit-user-item">
                <Input placeholder={users.website} value={details.website} />
              </Form.Item>
            </div>
          </div>
          <div className="edit-user-section">
            <h3 className="edit-user-section-title">{users.address}</h3>
            <div className="edit-user-section-block">
              <Form.Item label={users.address_street} className="edit-user-item">
                <Input placeholder={users.address_street} value={details.address.street} />
              </Form.Item>
              <Form.Item label={users.address_suite} className="edit-user-item">
                <Input placeholder={users.address_suite} value={details.address.suite} />
              </Form.Item>
              <Form.Item label={users.address_city} className="edit-user-item">
                <Input placeholder={users.address_city} value={details.address.city} />
              </Form.Item>
              <Form.Item label={users.address_lat} className="edit-user-item">
                <Input placeholder={users.address_lat} value={details.address.geo.lat} />
              </Form.Item>
              <Form.Item label={users.address_lng} className="edit-user-item">
                <Input placeholder={users.address_lng} value={details.address.geo.lng} />
              </Form.Item>
            </div>
          </div>
          <div className="edit-user-section">
            <h3 className="edit-user-section-title">{users.company}</h3>
            <div className="edit-user-section-block">
              <Form.Item label={users.company_name} className="edit-user-item">
                <Input placeholder={users.company_name} value={details.company.name} />
              </Form.Item>
              <Form.Item label={users.company_catchPhrase} className="edit-user-item">
                <Input placeholder={users.company_catchPhrase} value={details.company.catchPhrase} />
              </Form.Item>
              <Form.Item label={users.company_bs} className="edit-user-item">
                <Input placeholder={users.company_bs} value={details.company.bs} />
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
  match: PropTypes.object.isRequired,
  details: PropTypes.object.isRequired
};

const mapStateToProps = (store) => {
  return {
    details: store.userReduser.details
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserDetails: (api) => dispatch(getUserDetails(api))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditUser));
