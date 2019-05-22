//Functional component. Any data that is injected into this component
//is going to come from the dashboard as a prop

//Dashboad component sent Projects data to this ProjectList component
//To receive it we distructure  { projects } from props like so: const ProjectList = ( { projects } ) => {
//then we are going to cycle through every project of projects properties and output 
//a project summary for each individual project
//we are mapping through the projects: 
//{projects && projects.map(project => { ..} )}. We put projects && first to make sure we only mapping through if any projects exist
//we passing data of each individual project as a prop to ProjectSummary component
import React from 'react'
import ProjectSummary from './ProjectSummary'
import { Link } from 'react-router-dom'

const ProjectList = ({projects}) => {
//  console.log(projects);
  return (
    <div className="project-list section">
      { projects && projects.map(project => {
        return (
          // we are linking it to this route: <Route path='/project/:id'component={ProjectDetails} />
          //because <Link> is now parent element, and the key has to be associated with the parent
          //element when we cycle through it, we now attach the key to <Link> , not to <ProjectSummary>
          <Link to={'/project/' + project.id} key={project.id}>
            <ProjectSummary project={project} />
          </Link>
        )
      })}  
    </div>
  )
}

export default ProjectList
