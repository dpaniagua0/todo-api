//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err){
    return console.log('Unable to connect to mongodb server');
  }
  console.log('Connected to mongodb server');
  const db = client.db('TodoApp');

  //findone and update method
  db.collection('Users').findOneAndUpdate(
      {_id: new ObjectID("5ac9870d3a15d7140485443d")},
      {
        $set: { completed: true },
        $inc: { age: -6 }
      },{
        returnOriginal: false
      }
    )
    .then((result) => {
      console.log(result);
  });


  //client.close();
});
