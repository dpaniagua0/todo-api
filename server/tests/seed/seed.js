const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');
const jwt = require('jsonwebtoken');



const user1Id = new ObjectID();
const user2Id = new ObjectID();
const user3Id = new ObjectID();

const todos = [{
  _id: new ObjectID(),
  text: "First todo",
  _creator: user1Id
},{
  _id: new ObjectID(),
  text: "Second todo",
  completed: false,
  compledAt: 333,
  _creator: user2Id
},{
  _id: new ObjectID(),
  text: "Third todo",
  completed: false,
  completetAt: 345,
  _creator: user1Id
}];


const users =  [{
  _id: user1Id,
  email: "dpaniagua0@gmail.com",
  password: "user1pass",
  tokens: [{
    access: "auth",
    token: jwt.sign({ _id: user1Id, access: 'auth' }, process.env.JWT_SECRET).toString()
  }]
},{
  _id: user2Id,
  email: "dpaniaguam@gmail.com",
  password: "userpass2",
  tokens: [{
    access: "auth",
    token: jwt.sign({_id: user2Id, access: 'auth' }, process.env.JWT_SECRET).toString()
  }]
},{
  _id: user3Id,
  email: "dballer10@hotmail.com",
  password: "pass1234",
  tokens: []
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
    var userThree = new User(users[2]).save();

    return Promise.all([userOne, userTwo, userThree]);
  }).then(() => done());
};


module.exports = { todos, populateTodos, users, populateUsers };
