import React from 'react';
const Card = (props) => {
    let { projectDetails } = props;
    return (
      <div>
        <h2 className="listHeading">Project List</h2>
        {projectDetails.map((item, index) => {
          return (
            <div key={index} className="card">
              <h3 className="card-header">
                  Project Name: {item.projectName}
              </h3>
              <div className="card-content">
                <p className="card-text">
                  Project Description: {item.projectDescription}
                </p>
                <p className="card-text">
                  Contact Number: {item.projectContactNo}
                </p>
                <p className="card-text">E-mail: {item.projectEmail} </p>
                <p className="card-text">Location: {item.projectLocation} </p>
              </div>
            </div>
          );
        })}
      </div>
    );
};
export default Card;

