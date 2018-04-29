const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');


const {app} = require('./../server');
const {Todo} = require('./../models/todo');


const todos = [{
  _id: new ObjectID(),
  text: "First todo"
},{
  _id: new ObjectID(),
  text: "Second todo"
},{
  _id: new ObjectID(),
  text: "Third todo"
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }
        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create a todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if(err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(3);
          done();
        }).catch((e) => done(e)) ;
      });
  });
});


describe('GET /todos', () => {
  it('should get all todos', (done) => {
      request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
          expect(res.body.todos.length).toBe(3);
        })
        .end(done);
  });
});

describe('GEt /todos/:id', () => {
  it('should get todo by id', (done) => {
      request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.text).toBe(todos[0].text);
        })
        .end(done);
  });

  it('should return 400 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${hexId}`)
      .expect(400)
      .end(done);
  });

  it('should return 400 for not objectid', (done) => {
    request(app)
      .get(`/todos/123mas`)
      .expect(400)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should remove todo by id', (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if(err){
          return done(err);
        }
        Todo.findById(hexId).then((todo) => {
          expect(todo).toBeFalsy();
          done();
        }).catch((e) => done(e));

      });
  });

   it('should return 404 if todo  not found', (done) => {
     var hexId = new ObjectID().toHexString();
     request(app)
       .delete(`/todos/${hexId}`)
       .expect(400)
       .end(done);
   });

   it('should retunr 404 if objectid is invalid', (done) => {
     var hexId = new ObjectID().toHexString();
     request(app)
       .delete(`/todos/${hexId}`)
       .expect(400)
       .end(done);
   });
});
