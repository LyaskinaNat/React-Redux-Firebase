//this is going to be a Class-based component because we want to store in a local state
//what the user types into the input fields

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions' //inporting singIn Action Creator
import { Redirect } from 'react-router-dom'

class SignIn extends Component {
//this component will have a state. The state will have two properties: email and password    
  state = {
    email: '',
    password: ''
  }
  //we will update the state (email and password) everytime user types in
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
  //  console.log(this.state);
  //After we mapped dispatch to props we can access singIn method from our props and call it from our 
  //handleSubmit() function
    this.props.signIn(this.state) //we are passing this.state because this will be the credentials: email and password
  }
  //To the form we are adding Submit Event handler
  //in the form when we create a label we give an attribute (htmlFor="email")
  //and we give id='email' to the input field (of type = email) where email will be enterd. 
  //This is how we assocoate lable with a specific input field
  //We also need an onChange event handler which will fire every time a user types in 
  //something or deletes something from the input field

  render() {
    const { authError, auth } = this.props; //distructuring authgError from props so we can use it 
    //to check if there is an error to display
    if (auth.uid) return <Redirect to='/' /> 
      return (
        <div className="container">
          <form className="white" onSubmit={this.handleSubmit}>
            <h5 className="grey-text text-darken-3">Sign In</h5>
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input type="email" id='email' onChange={this.handleChange} />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input type="password" id='password' onChange={this.handleChange} />
            </div>
            <div className="input-field">
              <button className="btn light-green z-depth-7">Login</button>
              <div className="center red-text">
                { authError ? <p>{authError}</p> : null }
              </div>
            </div>
          </form>
        </div>
    )
    //{ authError ? <p>{authError}</p> : null } evaluates if the value authError exists
  }
}

const mapStateToProps = (state) => { //we are mapping state to props so we can get that loging error 
  //back and can display it in our sign in form
  //authReducer changes property authError of the state from null to "Login error" when login failed
  return{
    authError: state.auth.authError, //we want to add authErro property to our props
    //why it is state.auth.authError: in the Root reducer it is stored in 'auth' property,
    //because we are using auth Reducer, and inside authReducer it is a property called authError
    auth: state.firebase.auth
  }
}//to bein with we need to map some dispatch to props so we have access to signIn method

const mapDispatchToProps = (dispatch) => {
  return { //represents the object of what we want to attach to the props of this component
    signIn: (creds) => dispatch(signIn(creds)) //we want to attach tgis singIn methos which takes some credentials (creds)
    //and in turn it is going to duispatch an Action Creator and that Action Creator is what we imported at the top: 
    //import { signIn } from '../../store/actions/authActions' like so: dispatch(signIn(creds))
    //We receiv (creds) in authActions.js like so: export const signIn = (credentials).
    //They don't have to be the same name but these credentials (credentials) are going to match
    //to what we have passed in here (creds)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)