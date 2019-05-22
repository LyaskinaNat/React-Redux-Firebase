import React from 'react'
//we need to connect this component to firebase and also to our Redux state
import { connect } from 'react-redux' //connect to Redux State
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
//We are passing (props) to our ProjectDetails component so we can grab and use the id 
//which is passed in the url
//we can console.log (props) to see what properties we have access from from our ProjectDetails component
const ProjectDetails = (props) => {
  const { project, auth } = props; //distructuring: getting project property form the props
  if (!auth.uid) return <Redirect to='/signin' /> 
  if (project) {
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{project.title}</span>
            <p>{project.content}</p>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
            <div>{ moment(project.createdAt.toDate()).calendar() }</div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container center">
        <p>Loading project...</p>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => { //this object represents
  //what we want to attach to our props
  //we don't get access to props automatically inside mapStateToProps
  //so we can pass it in as a second parameter (we call it ownProps):
  //this is the props of the component before we attach anything else to it
  // console.log(state);
  const id = ownProps.match.params.id;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[id] : null
  return {
    project: project,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ //inside this we pass an array of objects (in our case it is just one object)
    collection: 'projects'
  }])
)(ProjectDetails)
