//Dashboard component will be Container component and it will pass data to 
//ProjectList and ProjectSummary components via props

//Because we want to access project property of the State from Dashboad companent we need
//to connect our React component to our Redux Store: 
//first, we need to import HOC { Connect } from React-Redux library
//then we need to map our state from the store to the props in this component
//we will do this by creating a function mapStateToProps
//This function takes in the State of our Store and we will return an Object
//This Objec is going to represent which properties are attached to the props of this component
//so we can access them inside this component
//so we want to create a property called projects on the props
//this is going to be on the State object like so: 
//projects: state.project.projects (.projects is the property of the initState of the projectReducer)
//then we need to pass mapStateToProps function as a parameter to connect()
//so the connect() knows what to connect to, what data to get from the Store
//sonow we have a data from state.project.projects (we can check it is avaialble by
//console.log(this.props); 
//what we need to do is thake this data and pass it down into the  ProjectList component
//first we do distructuring: const { projects } = this.props - this just grabs the projects object off the props
//then we pass those projects down as a prop into the projectList component: <ProjectList projects={projects} />
//now we go to ProjectList and make this component to receive this data


import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProjectList from '../projects/ProjectList'
import Notifications from './Notifications'
import { firestoreConnect } from 'react-redux-firebase' //connecting a collection from firestore DB to Dashboad component
//we will use { firestoreConnect } as a HOC at the bottom to connect Dashboad component with firestore collection
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {
  render() {
//    console.log(this.props)
    const { projects, auth, notifications } = this.props;
    if (!auth.uid) return <Redirect to='/signin' /> //we protecting unauth user to access Dashboard compoment
    //need to do the same for every component we want to protect

    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <ProjectList projects={projects} />
          </div>
          <div className="col s12 m5 offset-m1">
            <Notifications notifications={notifications} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
//  console.log(state);
  return {
  //  projects: state.project.projects - dummy data
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  }
}
//we are already using one HOC and we want to use two. To chain together two HOC
//we need to use the compose() function (same as we used it in index.js when we composed different Store enhancers together)
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {  collection: 'projects', limit: 5,  orderBy: ['createdAt', 'desc'] }, //firestoreConnect returns data from project collection which is classed as 'ordered'
    //so when we retrieve it we need to stecify that is from 'ordered' property like so: projects: state.firestore.ordered.projects
    { collection: 'notifications', limit: 5, orderBy: ['time', 'desc']}
  ])
)(Dashboard)