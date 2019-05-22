const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

//example
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
    });
//record our notification object into database into a new collection called 'notifications'
const createNotification = ((notification) => {
  return admin.firestore().collection('notifications')
    .add(notification)
    .then(doc => console.log('notification added', doc));
});


//function send notification on project created
//we are setting up a trigger for this function
exports.projectCreated = functions.firestore
//trigger is firestore, projecs (document) and this is going to reference a specific document
  .document('projects/{projectId}')
  //whenever new project is created then we want to fire a call back function (doc => {..
  //and this callback function takes the document that has been created and we can do something with it
  .onCreate(doc => {
//so we can create a new notification
//we can grad the data stored inside this document
    const project = doc.data();
    //creating notification object
    const notification = {
      content: 'Added a new project',
      //we are using template syntax here `${}`
      user: `${project.authorFirstName} ${project.authorLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    }
//we call our createNotification function from here
    return createNotification(notification);

});

exports.userJoined = functions.auth.user()
  .onCreate(user => {
    
    return admin.firestore().collection('users')
    //.then takes doc as a param and perform function on it like so: const newUser = doc.data();
      .doc(user.uid).get().then(doc => {

        const newUser = doc.data();
        const notification = {
          content: 'Joined the party',
          user: `${newUser.firstName} ${newUser.lastName}`,
          time: admin.firestore.FieldValue.serverTimestamp()
        };

        return createNotification(notification);

      });
});

