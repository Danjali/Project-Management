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
      showSuccessPopup: false,
      addProjectMsg:''
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
    const requestPayload = {
      key: data.projectId,
      name: data.projectName,
      description: data.projectDescription
    };
    const base64 = require('base-64'),
      username = 't.m.mahajan@gmail.com',
      password = 'Tej.12345',
      headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.set(
      'Authorization',
      'Basic ' + base64.encode(username + ':' + password)
    );
    fetch('http://localhost:5000/api/addProject', {
      method: 'POST',
      body: JSON.stringify(requestPayload),
      headers: headers
    })
      .then(response => {
        if(response.ok){
          this.setState({
            searchedItems: this.state.projectList,
            showForm: false,
            showSuccessPopup: true,
            addProjectMsg:'Project has been added successfully!!'
          });
        } else{
          this.setState({
            showForm: false,
            showSuccessPopup: true,
            addProjectMsg:'Error!! Project has not been added.'
          })
        }
      })
      .catch(error => this.setState({
        showForm: false,
        showSuccessPopup: true,
        addProjectMsg:'Error!! Project has not been added.'
      }));
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
    let { searchedItems,addProjectMsg } = this.state;
    return (
      <div className="app">
        <div>
          <div className="appHeader">
            <h1>Project Management Application</h1>
            <Search searchItem={this.searchItem} />
            <input
              type="button"
              value="Add Project"
              className="btn btn-secondary"
              onClick={this.addProject}
            />
          </div>
          <Card projectDetails={searchedItems} />
          {this.state.showForm && (
            <AddProjectForm
              saveProject={this.saveProject}
              closeForm={this.closeForm}
            />
          )}
          {this.state.showSuccessPopup && (
            <SuccessPopUp closePopup={this.closePopup} msg={addProjectMsg} />
          )}
        </div>
      </div>
    );
  }
}
 