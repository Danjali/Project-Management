import React from 'react';

export default class Search extends React.Component {
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange() {
    this.props.searchItem(this.refs.searchInput.value);
  }

  render() {
    return (
      <div>
        <input
          className="searchWrapper"
          ref="searchInput"
          type="text"
          placeholder="Search Project"
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}
