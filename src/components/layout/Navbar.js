//Navbar component will not have state, so it can be Functional component
//in here we will conditionally show the links depending on user auth status

import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'

const Navbar = (props) => {
  const { auth, profile} = props;
//   console.log(auth);
//passing user initials as a props to SingedInLinks
  const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />; //we are checking is property auth.uid exists
  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <Link to='/' className="brand-logo">React-Redux Firebase App</Link>
        {links}
      </div>
    </nav>
  )
}
//we map the state to our props so that we can access some kind of auth status inside our props
const mapStateToProps = (state) => {
//   console.log(state);
  return{
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(Navbar)