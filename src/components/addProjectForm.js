import React from 'react';

export default class AddProjectForm extends React.Component {
  constructor() {
    super();
    this.state = {
      validForm: false,
      tempStore: {},
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleAdd() {
    this.state.tempStore = {
      projectName: this.refs.projectName.value,
      projectDescription: this.refs.projectDescription.value,
      projectContactNo: this.refs.projectContactNo.value,
      projectEmail: this.refs.projectEmail.value,
      projectLocation: this.refs.projectLocation.value,
      projectId: (
        this.refs.projectName.value + this.refs.projectLocation.value
      ).replace(/ /g, ''),
      projectType: this.refs.projectType.value,
      platform: this.refs.platform.value,
    };
    this.props.saveProject(this.state.tempStore);
  }

  handleClose() {
    this.props.closeForm();
  }

  validate() {
    return this.refs.projectName.value
      ? this.setState({ validForm: true })
      : this.setState({ validForm: false });
  }

  render() {
    return (
      <div className="popup">
        <div className="addFormPopUp">
          <form>
            <div className="form-group">
              <h3>Add Project</h3>
              <hr className="newLine" />
              <label>Project Name</label>
              <input
                type="text"
                className="form-control"
                ref="projectName"
                name="name"
                onChange={this.validate}
                placeholder="Enter project name"
              />
              <label>Project Description</label>
              <input
                type="text"
                className="form-control"
                ref="projectDescription"
                placeholder="Enter project description"
              />
              <label>Project Type</label>
              <select ref="projectType" onChange={this.handleChange} className="form-control">
                <option value="UI">UI</option>
                <option value="Backend Service">Backend Service</option>
              </select>
              <label>Platform</label>
              <select ref="platform" className="form-control" >
                <option value="PCF">PCF</option>
                <option value="AMP">AMP</option>
                <option value="SF">SF</option>
              </select>
              <label>Contact Number</label>
              <input
                type="text"
                className="form-control"
                ref="projectContactNo"
                placeholder="Enter contact no."
              />
              <label>Email Address</label>
              <input
                className="form-control"
                type="email"
                ref="projectEmail"
                placeholder="Enter email"
              />
              <label>Location</label>
              <input
                type="text"
                className="form-control"
                ref="projectLocation"
                placeholder="Enter location"
              />
              <div className="formButton">
                <input
                  type="button"
                  value="Add"
                  className="btn btn-primary"
                  disabled={!this.state.validForm}
                  onClick={this.handleAdd}
                />
                <input
                  type="button"
                  value="Cancel"
                  className="btn btn-secondary"
                  onClick={this.handleClose}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
