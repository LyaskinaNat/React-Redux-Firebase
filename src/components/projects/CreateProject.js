//We need to dispatch "CREATE_PROJECT" action from our CreateProject component
//first, we import createProject action import { createProject } from..
//also we want to connect this component to Redux store: import { connect } from..
//next, we map dispatch to props (mapDispatchToProps). This is a function where we can
//take in the dispatch method so we can call it and what we do is returning object
//and whatever property we want to add to the props we add to this object
//so we want to add a method to the props called createProject
//so that when we say props.createProject in the component, that it's going to call this function
//and this (arrow) function is going to take in the individual project that we will pass in
//and it's going to dispatch an Action Creator createProject and we pass in that project
//So now when we call props.createProject and  pass in a project it's going to run this function
//taking that project, it's going to perform a dispatch and it's going to call this Action Creator
//which we imported at the top and this is going to trigger execute the code (e.g. Make an
//async call to Database) and then we will carry on eith the dispatch of the action
//we also pass mapDispatchToProps to our connect() function, but it is not the first parameter, 
//the first parameter is mapStateToProps and as we do not have that for this component,
//we just pass null as the first parameter

import React, { Component } from 'react'
import { createProject } from '../../store/actions/projectActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class CreateProject extends Component {
  state = {
    title: '',
    content: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
   //(this.state) will become (project) property when passed to Action creator
   this.props.createProject(this.state);
   //the new project is created we wnat to re-direct the user to the home page
   this.props.history.push('/');
  }
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' /> 
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Create a New Project</h5>
          <div className="input-field">
            <input type="text" id='title' onChange={this.handleChange} />
            <label htmlFor="title">Project Title</label>
          </div>
          <div className="input-field">
            <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
            <label htmlFor="content">Project Content</label>
          </div>
          <div className="input-field">
            <button className="btn light-green z-depth-7">Create</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {  //we are passing in the project which is stored on the state (state.title, state.content)
    createProject: (project) => dispatch(createProject(project)) // we are using this dispatch and calling createProject Action Creator which is imported ant the top
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)