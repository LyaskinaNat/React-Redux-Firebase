//This is functional component. Because any data that we recieve inside this component
//will come via props and we don't need state

import React from 'react'
import moment from 'moment'

const ProjectSummary = ({ project }) => {
//  console.log(project);
//instead of output data from the databas as it is: <p className="grey-text">{ project.createdAt.toDate().toString()}</p>
//we will use moment js packade to formate data the way we want: npm install moment (momentjs.com)
  return (
 <div className="card z-depth-5 project-summary">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title ">{ project.title }</span>
          <p>Posted by { project.authorFirstName}  {project.authorLastName  }</p>
          <p className="grey-text">{ moment(project.createdAt.toDate()).calendar()}</p>
        </div>
      </div>
  )
}

export default ProjectSummary