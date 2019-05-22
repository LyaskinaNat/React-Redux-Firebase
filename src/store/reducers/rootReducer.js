import authReducer from './authReducer'
import projectReducer from './projectReducer'
import { combineReducers } from 'redux'
import { firestoreReducer} from 'redux-firestore' //this is a pre-made reducer and
//it syncs our firestore data with our state in the background
import { firebaseReducer } from 'react-redux-firebase'

//In our State of the Store we'll have properties auth and project and they will correspond
//to these different reducers, so the authReducer will update information
//on the auth property and the projectReducer will uodate information
//on the project property inside the state object
//State's project property is passed from projectReducer to rootReducer and we want to access
//this project state's property from our Dashboad component
const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  //we need to apply firestore reducer to a particular property on the State
  firestore: firestoreReducer,
  //firestoreReducer is going to retrieve database data into firestore property
  //and this data is going to be dependant on which component is currently active at the time
  //and what data that component needs. That data that will be synced in the sata by this reducer
  //and we need to tell this reducer what data we want to sync
  //Next step is to connect a component with a firestore collection - we need to say inside our component
  //that we want to connect to a cirtain collection inside our firestore DB (we now go to Dashboad to do so)
  firebase: firebaseReducer //this is syncing with firebase informatuon including auth:
  //it will sync aour auth status on firebase and pop it on this "firebase" object on the state
  //we will access with status in our Navbar component
});

export default rootReducer

// the key name will be the data property on the state object