import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, Modal, Spin } from 'antd';

import { users, usersEng } from '../../constants/users';
import { getUserDetails, submitUserDetails, deleteUserDetails } from '../../store/action/user';
import './HookEditUser.css';

function HookEditUser({ getHookUserDetails, submitHookUserDetails, deleteHookUserDetails, history, loading, match, details }) {
  const [userHookDetails, setUserHookDetails] = useState({
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
  });

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getHookUserDetails(`/users/${match.params.id}`);
  }, []);

  useEffect(() => {
    setUserHookDetails(details);
  }, [details]);

  const onFinish = (user) => {
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

    submitHookUserDetails(`/users/${match.params.id}`, newUser);
    history.push(`/users/view/${match.params.id}`);
  };

  const showModal = () => {
    setVisible(true);
  };

  const deleteOk = () => {
    setVisible(false);
    deleteHookUserDetails(`/users/${match.params.id}`);
    history.push('/users');
  };

  const deleteCancel = () => {
    setVisible(false);
  };

  return (
    <Spin
      size="large"
      tip="Loading..."
      spinning={loading}
    >
      <div className="edit-user">
        <h2>Редактирование пользователя {userHookDetails.username}</h2>
        <Form
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item label={users.url} className="edit-user-item" name={usersEng.url}>
            <Input placeholder={userHookDetails.url} defaultValue={userHookDetails.url} />
          </Form.Item>
          <div className="edit-user-section">
            <h3 className="edit-user-section-title">Общая информация</h3>
            <div className="edit-user-section-block">
              <Form.Item label={users.username} className="edit-user-item" name={usersEng.username}>
                <Input placeholder={userHookDetails.username} defaultValue={userHookDetails.username} />
              </Form.Item>
              <Form.Item label={users.name} className="edit-user-item" name={usersEng.name}>
                <Input placeholder={userHookDetails.name} defaultValue={userHookDetails.name} />
              </Form.Item>
              <Form.Item label={users.id} className="edit-user-item" name={usersEng.id}>
                <Input placeholder={userHookDetails.id} defaultValue={userHookDetails.id} disabled />
              </Form.Item>
            </div>
          </div>
          <div className="edit-user-section">
            <h3 className="edit-user-section-title">{users.contacts}</h3>
            <div className="edit-user-section-block">
              <Form.Item label={users.email} className="edit-user-item" name={usersEng.email}>
                <Input placeholder={userHookDetails.email} defaultValue={userHookDetails.email} />
              </Form.Item>
              <Form.Item label={users.phone} className="edit-user-item" name={usersEng.phone}>
                <Input placeholder={userHookDetails.phone} defaultValue={userHookDetails.phone} />
              </Form.Item>
              <Form.Item label={users.website} className="edit-user-item" name={usersEng.website}>
                <Input placeholder={userHookDetails.website} defaultValue={userHookDetails.website} />
              </Form.Item>
            </div>
          </div>
          <div className="edit-user-section">
            <h3 className="edit-user-section-title">{users.address}</h3>
            <div className="edit-user-section-block">
              <Form.Item label={users.address_street} className="edit-user-item" name={usersEng.address_street}>
                <Input placeholder={userHookDetails.address.street} defaultValue={userHookDetails.address.street} />
              </Form.Item>
              <Form.Item label={users.address_suite} className="edit-user-item" name={usersEng.address_suite}>
                <Input placeholder={userHookDetails.address.suite} defaultValue={userHookDetails.address.suite} />
              </Form.Item>
              <Form.Item label={users.address_city} className="edit-user-item" name={usersEng.address_city}>
                <Input placeholder={userHookDetails.address.city} defaultValue={userHookDetails.address.city} />
              </Form.Item>
              <Form.Item label={users.address_zipcode} className="edit-user-item" name={usersEng.address_zipcode}>
                <Input placeholder={userHookDetails.address.zipcode} defaultValue={userHookDetails.address.zipcode} />
              </Form.Item>
              <Form.Item label={users.address_lat} className="edit-user-item" name={usersEng.address_lat}>
                <Input placeholder={userHookDetails.address.geo.lat} defaultValue={userHookDetails.address.geo.lat} />
              </Form.Item>
              <Form.Item label={users.address_lng} className="edit-user-item" name={usersEng.address_lng}>
                <Input placeholder={userHookDetails.address.geo.lng} defaultValue={userHookDetails.address.geo.lng} />
              </Form.Item>
            </div>
          </div>
          <div className="edit-user-section">
            <h3 className="edit-user-section-title">{users.company}</h3>
            <div className="edit-user-section-block">
              <Form.Item label={users.company_label} className="edit-user-item" name={usersEng.company_label}>
                <Input placeholder={userHookDetails.company.label} defaultValue={userHookDetails.company.label} />
              </Form.Item>
              <Form.Item label={users.company_catchPhrase} className="edit-user-item" name={usersEng.company_catchPhrase}>
                <Input placeholder={userHookDetails.company.catchPhrase} defaultValue={userHookDetails.company.catchPhrase} />
              </Form.Item>
              <Form.Item label={users.company_bs} className="edit-user-item" name={usersEng.company_bs}>
                <Input placeholder={userHookDetails.company.bs} defaultValue={userHookDetails.company.bs} />
              </Form.Item>
            </div>
          </div>
          <div className="edit-user-button-block">
            <Form.Item>
              <Button
                type="primary"
                className="edit-user-button"
                danger
                onClick={showModal}
              >
                Удалить пользователя
              </Button>
            </Form.Item>
            <Modal
              title="Уверен(а) что хош удалить пользователя?"
              visible={visible}
              onOk={deleteOk}
              onCancel={deleteCancel}
            >
              <p>Подумай минутку...</p>
              <p>Или парочку...</p>
            </Modal>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="edit-user-button"
              >
                Сохранить пользователя
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Spin>
  );
}

HookEditUser.propTypes = {
  getHookUserDetails: PropTypes.func.isRequired,
  submitHookUserDetails: PropTypes.func.isRequired,
  deleteHookUserDetails: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  details: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = (store) => {
  return {
    details: store.userReduser.details,
    loading: store.userReduser.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHookUserDetails: (url) => dispatch(getUserDetails(url)),
    submitHookUserDetails: (url, body) => dispatch(submitUserDetails(url, body)),
    deleteHookUserDetails: (url) => dispatch(deleteUserDetails(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HookEditUser));
