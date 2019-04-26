import React from 'react';

export default class SuccessPopUp extends React.Component {
  constructor() {
    super();
    this.closePopup = this.closePopup.bind(this);
  }

  closePopup() {
    this.props.closePopup();
  }

  render() {
    return (
      <div className="popup">
        <div className="successPopUpContent">
          <h3>Project has been added successfully!!</h3>
          <button className="btn redBtn" onClick={this.closePopup}>
            OK
          </button>
        </div>
      </div>
    );
  }
}
