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

  //delete many
   // db.collection('Users').deleteMany({ name: 'Daniel'}).then((result) => {
   //   console.log(result);
   // });
  //delete one
  // db.collection('Todos').deleteOne({text: 'abc'}).then((result) => {
  //   console.log(result);
  // });
  //findone delete one
  db.collection('Users').findOneAndDelete({ _id: new ObjectID('5ac9858d85f5a813bcb0a7f9')}).then((result) => {
    console.log(result);
  });

  //client.close();
});
