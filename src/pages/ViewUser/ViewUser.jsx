import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Avatar, Button } from 'antd';

import users from '../../constants/users';
import InfoItem from '../../components/InfoItem/InfoItem';
import { getUserDetails } from '../../store/action/user';
import './ViewUser.css';

class ViewUser extends React.Component {
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

  render() {
    const { details } = this.state;
    const { history } = this.props;


    return (
      <div className="view-user">
        <Avatar className="view-user-avatar" src={details.url} size={150} />
        <div className="view-user-section">
          <h3 className="view-user-section-title">Общая информация</h3>
          <div className="view-user-section-block">
            <InfoItem title={users.username} desc={details.username} />
            <InfoItem title={users.name} desc={details.name} />
            <InfoItem title={users.id} desc={details.id} />
          </div>
        </div>
        <div className="view-user-section">
          <h3 className="view-user-section-title">{users.contacts}</h3>
          <div className="view-user-section-block">
            <InfoItem title={users.email} desc={details.email} />
            <InfoItem title={users.phone} desc={details.phone} />
            <InfoItem title={users.website} desc={details.website} />
          </div>
        </div>
        <div className="view-user-section">
          <h3 className="view-user-section-title">{users.address}</h3>
          <div className="view-user-section-block">
            <InfoItem title={users.address_street} desc={details.address.street} />
            <InfoItem title={users.address_suite} desc={details.address.suite} />
            <InfoItem title={users.address_city} desc={details.address.city} />
            <InfoItem title={users.address_lat} desc={details.address.geo.lat} />
            <InfoItem title={users.address_lng} desc={details.address.geo.lng} />
          </div>
        </div>
        <div className="view-user-section">
          <h3 className="view-user-section-title">{users.company}</h3>
          <div className="view-user-section-block">
            <InfoItem title={users.company_name} desc={details.company.name} />
            <InfoItem title={users.company_catchPhrase} desc={details.company.catchPhrase} />
            <InfoItem title={users.company_bs} desc={details.company.bs} />
          </div>
        </div>
        <Button
          type="primary"
          onClick={() => history.push(`/users/edit/${this.props.match.params.id}`)}
        >
          Редактировать пользователя
        </Button>
      </div>
    );
  }
}

ViewUser.propTypes = {
  getUserDetails: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewUser));
