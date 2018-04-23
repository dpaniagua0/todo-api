const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


var id = "5ad541b8814dc48b27b53bc8";
if(!ObjectID.isValid(id)){
  return console.log('The ID is not a valid ObjectID', id);
}

User.findById(id).then((user) => {
  if(!user) {
    return console.log('User not found');
  }
  console.log('User', JSON.stringify(user,undefined, 2));
}).catch((e) => console.log(e));

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos: ', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   if(!todo) { return console.log('ID not found'); }
//   console.log('Todo using find one method', todo);
// });

// Todo.findById(id).then((todo) => {
//   if(!todo) {
//     return console.log('ID not found');
//   }
//   console.log('Todo using find by id', todo);
// }).catch((e) => console.log(e));
