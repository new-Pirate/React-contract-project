import React from 'react';
import PropTypes from 'prop-types';

import './InfoItem.css';

class InfoItem extends React.Component {
  render() {
    const { title, desc } = this.props;
    return (
      <div className="info-item">
        <div className="info-item-title">{title}</div>
        <div className="info-item-desc">{desc}</div>
      </div>
    );
  }
}

InfoItem.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired
};

export default InfoItem;
