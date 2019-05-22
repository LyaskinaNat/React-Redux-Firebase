//Nav link gives access to the active class when a certain link is active
//when we are on that page
import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions' //importing SingOut action creator to this component

const SignedInLinks = (props) => { //because it is functional component, it needs to take (props) in
 // and instead of this.props.signOut we will be using props.signOut
 //console.log(props);
 const { signOut, profile } = props;
 return (
    //we no loger need Nave link on out SighOut link as we are not going anywhere
    //instead we use anchor tag and attach onClick event to it
    <div>
      <ul className="right">
        <li><NavLink to='/create'>New Project</NavLink></li>
        <li><a onClick={signOut}>Log Out</a></li>
        <li><NavLink to='/' className="btn btn-floating light-green">{profile.initials}</NavLink></li>
      </ul>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => { //to connect SighOut action creator to component props
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)