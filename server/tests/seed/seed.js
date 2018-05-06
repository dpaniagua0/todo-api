const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');
const jwt = require('jsonwebtoken');

const todos = [{
  _id: new ObjectID(),
  text: "First todo"
},{
  _id: new ObjectID(),
  text: "Second todo",
  completed: false,
  compledAt: 333
},{
  _id: new ObjectID(),
  text: "Third todo",
  completed: false,
  completetAt: 345
}];

const user1Id = new ObjectID();
const user2Id = new ObjectID();
const users =  [{
  _id: user1Id,
  email: "dpaniagua0@gmail.com",
  password: "user1pass",
  tokens: [{
    access: "auth",
    token: jwt.sign({ _id: user1Id, access: 'auth' }, 'abc123').toString()
  }]
},{
  _id: user2Id,
  email: "dpaniaguam@gmail.com",
  password: "userpass2"
}];


const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo]);
  }).then(() => done());
};


module.exports = { todos, populateTodos, users, populateUsers };
