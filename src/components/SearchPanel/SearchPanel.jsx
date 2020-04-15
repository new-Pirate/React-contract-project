import React from 'react';
import PropTypes from 'prop-types';

import './SearchPanel.css';

class SearchPanel extends React.Component {

  onSearchChange = (e) => {
    const term = e.target.value;
    this.props.onSearch(term);
  }

  render() {
    return (
      <div className="SearchPanel">
        <input
          type="text"
          className="SeacrhPanel__query"
          placeholder="Поиск по full name"
          onChange={this.onSearchChange}
        />
        <i className="fas fa-search SearchPanel__icon" />
      </div>
    );
  }
}

SearchPanel.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default SearchPanel;
