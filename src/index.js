//Once Redux is installed we can Create a Store. Index.js is the place for it
//Thunk Middleware, how does it work?
//The Component will still dispatch an action as normal and call an Action Creator as normal
//but inside the Action Creator, that's where we halt the process: We return a function
//instead of an Action like we normally would and then we go out, grad or update data
//then resume the Dispatch and pass it to the Reducer of the Action
//As Redux-Thunk is a middleware, we need to apply it inside our Store
//we do that as a second parameter inside the createStore() function but we also need to 
//import applyMiddleware function from Redux like so: import { createStore, applyMiddleware } from 'redux'


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './store/reducers/rootReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import fbConfig from './config/fbConfig'
//Once the Store is created we have to pass RootReducer to our Store
//Provider halps to bind out React App with Redux
const store = createStore(rootReducer,
    //in order to apply several enhances to our store like middleware, etc. we need to use 
    //compose function to combine all the enhanses together
    compose(
      applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
      //we are enhansing our Store with these two packages as well
      reactReduxFirebase(fbConfig, {
        userProfile: 'users', 
        useFirestoreForProfile: true, 
        attachAuthIsReady: true}), // redux binding for firebase
      reduxFirestore(fbConfig) // redux bindings for firestore
    )
  );
  //we are waiting for firebase auth tis ready before we are loading our App
  store.firebaseAuthIsReady.then(() => {
    ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
    
  });