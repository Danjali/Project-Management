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
    this.orcChecklist = this.orcChecklist.bind(this);
    this.getDataFromDB = this.getDataFromDB.bind(this);
  }

  getDataFromDB() {
    fetch('http://localhost:5000/api/getDbData', {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
      .then(responseJson  => {
        if(responseJson){
          this.setState({
            showForm: false,
            showSuccessPopup: true,
            addProjectMsg:`DB Data Received`
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

  orcChecklist() {
    fetch('http://localhost:5000/api/getEventDetails', {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
      .then(responseJson  => {
        // if(responseJson){
        //   this.setState({
        //     showForm: false,
        //     showSuccessPopup: true,
        //     addProjectMsg:`Data Received from JIRA`
        //   });
        // } else{
        //   this.setState({
        //     showForm: false,
        //     showSuccessPopup: true,
        //     addProjectMsg:'Error!! Project has not been added.'
        //   })
        // }
        console.log(responseJson);
      })
      .catch(error => this.setState({
        showForm: false,
        showSuccessPopup: true,
        addProjectMsg:'Error!! Project has not been added.'
      }));
  
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

  let tempCollection = {
    issueUpdates: [
        {
            update: {
                worklog: [
                    {
                        add: {
                            started: "2011-07-05T11:05:00.000+0000",
                            timeSpent: "60m"
                        }
                    }
                ]
            },
            fields: {
              project:
              {
                 key: "SSFT"
              },
              summary: "temp02",
              description: "temp02",
              issuetype: {
                 name: "Epic"
              }
          }
        },
        {
            update: {},
            fields: {
                project:
                {
                   key: "SSFT"
                },
                summary: "temp01",
                description: "temp01",
                issuetype: {
                   name: "Bug"
                }
            }
        }
    ]
};

let subtaskObject = {
  "issueUpdates": [
    {
      "fields":
      {
          "project":
          {
              "key": "SSFT"
          },
          "parent":
          {
              "key": "SSFT-136"
          },
          "summary": "Sub-task of SSFT-136",
          "description": "Don't forget to do this too.",
          "issuetype":
          {
              "name":"Sub-task"
          }
      }
  }
  ]
  };

    fetch('http://localhost:5000/api/addProject', {
      method: 'POST',
      body: JSON.stringify(tempCollection),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
      .then(responseJson  => {
        if(responseJson){
          this.setState({
            searchedItems: this.state.projectList,
            showForm: false,
            showSuccessPopup: true,
            addProjectMsg:`Project has been added successfully!! JIRA id is ${responseJson.key}`
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
             <input
              type="button"
              value="Event Handler"
              className="btn btn-secondary"
              onClick={this.orcChecklist}
            />
            <input
              type="button"
              value="Get DB Data"
              className="btn btn-secondary"
              onClick={this.getDataFromDB}
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
 