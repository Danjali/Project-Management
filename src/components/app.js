import React from 'react';
import projectData from '../static/projectData.json';
import Card from '../components/shared/card';
import Search from '../components/shared/search';
import AddProjectForm from '../components/addProjectForm';
import fetch from 'isomorphic-fetch';
import SuccessPopUp from '../components/shared/successPopup';
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showForm: false,
      projectList: projectData.projects,
      searchedItems: projectData.projects,
      showSuccessPopup: false
    };
    this.addProject = this.addProject.bind(this);
    this.searchItem = this.searchItem.bind(this);
    this.saveProject = this.saveProject.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.sendData = this.sendData.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  searchItem(searchValue) {
    const result = [...this.state.projectList].filter(
      item =>
        item.projectName.toLowerCase().search(searchValue.toLowerCase()) > -1
    );
    this.setState({
      searchedItems: result
    });
  }

  saveProject(data) {
    this.sendData(data);
    this.state.projectList = [...this.state.projectList, data];
  }
  
  sendData(data) {
    let requestPayload = {
      key: data.projectId,
      name: data.projectName,
      description: data.projectDescription
    };
    let base64 = require('base-64');
    let username = 't.m.mahajan@gmail.com';
    let password = 'Tej.12345';
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.set(
      'Authorization',
      'Basic ' + base64.encode(username + ':' + password)
    );
    fetch('https://api.bitbucket.org/2.0/teams/shared_teamtest1/projects/', {
      method: 'POST',
      body: JSON.stringify(requestPayload),
      headers: headers
    })
      .then(res => res.json())
      .then(response => {
        this.setState({
          searchedItems: this.state.projectList,
          showForm: false,
          showSuccessPopup: true
        });
      })
      .catch(error => console.error('Error:', error));
  }

  closeForm() {
    this.setState({
      showForm: false
    });
  }

  closePopup() {
    this.setState({
      showSuccessPopup: false
    });
  }

  addProject() {
    this.setState({
      showForm: true
    });
  }

  render() {
    let { searchedItems } = this.state;
    return (
      <div className="app">
        <div>
          <div className="appHeader">
            <h1>Project Management Application</h1>
            <div>
              <Search searchItem={this.searchItem} />
            </div>
            <input
              type="button"
              value="Add Project"
              className="btn btn-secondary"
              onClick={this.addProject}
            />
          </div>
          <div>
            <Card projectDetails={searchedItems} />
          </div>
          {this.state.showForm && (
            <div>
              <AddProjectForm
                saveProject={this.saveProject}
                closeForm={this.closeForm}
              />
            </div>
          )}
          {this.state.showSuccessPopup && (
            <div>
              <SuccessPopUp closePopup={this.closePopup} />
            </div>
          )}
        </div>
      </div>
    );
  }
}
 