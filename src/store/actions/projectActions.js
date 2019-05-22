//this is for actions anything to do with the Project. E.g. Create a Project, Delete a project, etc
//This will be exported as a constant createProject. This is equal to a function
//and inside this function we take as a parameter the (project) we want to add
//inside this function, normally what we would do is just return an action
//but now when we use Thunk we can actually return a (arrow) function
//which takes couple of parameters: the dispatch method and  getState 
//(so we can get the state of the Store if we need to)
//How it works: When we first call an Action Creator inside a dispatch method from our Component
//we are returning a function and we're halting that dispatch because we are not returning an action
//any more. But inside this function what we could do is do some kind of asynchronous call
// (e.g. make async call to database). Then we've done that we go ahead and dispatch
//the action again so we're pausing the dispatch and then we can carry on with the dispatch
//and pass in our action with a type: "CREATE_PROJECT" and project itself (project: project)
//also, using ES6 we can sharten it to just project as the property name and the value is the same
//Now, inside our CreateProject component we dispatch this action

//without Thunk we would just return an action Object with type and the project we want
//to add which is the project that we receive into this Action Creator :
//return{
//  type: 'ADD_PROJECT',
//  project: project    
// }    

//This was the code before our App was connected to Firebase 
//    export const createProject = (project) => {
//    return (dispatch, getState) => {
      // make async call to database
//      dispatch({ type: 'CREATE_PROJECT', project });
//    }
//  };

//This is our Action Creator code with Firebase: two additional parameters getFirebase and getFireStore are introduced:
export const createProject = (project) => {
  return (dispatch, getState, {getFirestore}) => {
    //The way we add data to Firestore is by first initialising getFirestore() function
    //and then storing the results in a constant. That gives us a reference to our
    //firestore database
    // make async call to database
    const firestore = getFirestore(); //invoking firestore function - now we got reference to our firestore DB
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore.collection('projects').add({ //now we can access our project collection inside the DB
      ...project, //as we are poassing project props to this function which contains state.title and state.content
      //we can just use spread operator for adding data to these to keys in our database
      //for the rest of the project document fields we re hard coding some values for now:
      //(later we will grad this data fgrom the authentication functionality)
      ...project,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date()
      //This whole process of adding a document to our firestore collection is async
      //it takes some time to do, so we do not want to dispatch({type: 'CREATE_PROJECT', project})
      //until it's done. So because it takes some time to do, it returns a promise and that means
      //that look at some point this is going to complete and what we can do is to tack on 
      //.then at the end of this and .then method will only fire when this action is complete
      //This .then method takes in a callback function which fires when adding document task is complete
      //so it could be: then(() => {dispatch({ type: 'CREATE_PROJECT', project });
      //but what if adding a new document cannot be complete for whatever reason and we get an error
      //and we can then .catch that error. This .catch method also takes a callback function which will fire when we receive that error
      //so we can dispatch a different action on .catch as we do not want to dispatch the same action

    }).then(() => {
      dispatch({ type: 'CREATE_PROJECT_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'CREATE_PROJECT_ERROR' }, err);
    });
  }
};
