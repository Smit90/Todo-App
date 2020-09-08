import React, { Component } from 'react';
import './App.css';

import Listitem from './ListItem';

class App extends Component {

  constructor() {
    super();
    this.state = {
      newtodo: '',
      editing: false,
      editingindex: null,
      searchlist: '',
      notification: null,
      todos: [{
        id: 1, name: 'list 1'
      }, {
        id: 2, name: 'list 2'
      }, {
        id: 3, name: 'list 3'
      }, {
        id: 4, name: 'list 4'
      }]
    };





    this.alert = this.alert.bind(this);
    this.generatetodoid = this.generatetodoid.bind(this);
    this.updatetodo = this.updatetodo.bind(this);
    this.edittodo = this.edittodo.bind(this);
    this.deletetodo = this.deletetodo.bind(this);
    this.handlechange = this.handlechange.bind(this);
    this.addtodo = this.addtodo.bind(this);
  }

  handlechange(event) {
    this.setState({
      newtodo: event.target.value
    })
  }


  generatetodoid() {

    const lasttodo = this.state.todos[this.state.todos.length - 1];
    if (lasttodo) {
      return lasttodo.id + 1;
    }

    return 1;
  }

  addtodo() {
    const newTodo = {
      name: this.state.newtodo,
      id: this.generatetodoid

    };

    const todos = this.state.todos;
    todos.push(newTodo);

    this.setState({
      todos: todos,
      newtodo: ''
    });

    this.alert("Todo created successfully");


  }

  deletetodo(index) {
    const todos = this.state.todos;
    delete todos[index];


    this.setState({ todos });
    this.alert("Todo deleted successfully");
  }

  edittodo(index) {

    const todo = this.state.todos[index];

    this.setState({
      editing: true,
      newtodo: todo.name,
      editingindex: index
    });
  }


  updatetodo(index) {

    const todo = this.state.todos[this.state.editingindex];

    todo.name = this.state.newtodo;

    const todos = this.state.todos;

    todos[this.state.editingindex] = todo;

    this.setState({ todo, editing: false, editingindex: null, newtodo: '' });
    this.alert("Todo updated successfully");

  }



  alert(notification) {
    this.setState({
      notification
    });

    setTimeout(() => {
      this.setState({
        notification: null
      });
    }, 2000);
  }


  render() {


    // let filterlist = this.state.todos.filter((todo)=>{
    //   return todo.name.toLowerCase().includes(this.state.searchlist.toLowerCase())
    // })
    // console.log(this.state.newtodo);

    return (
      <div className="App">
        <div className="container">
          <h2 className="text-center p-4">TODO APP</h2>
          {
            this.state.notification &&
            <div className="alert mt-3 alert-success">
              <p className="text-center">{this.state.notification}</p>
            </div>
          }


          <input
            type="text"
            name="todo"
            className="my-4 form-control"
            placeholder="add new todo"
            onChange={this.handlechange}
            value={this.state.newtodo}
          />

          <button
            className="btn-success mb-3 form-control"
            disabled={this.state.newtodo.length < 5}
            onClick={this.state.editing ? this.updatetodo : this.addtodo}
          >{this.state.editing ? 'Update Todo' : 'Add Todo'}</button>


          {
            !this.state.editing &&

            <ul className="list-group">
              {this.state.todos.map((item, index) => {
                return <Listitem
                  key={item.id}
                  item={item}
                  edittodo={() => { this.edittodo(index); }}
                  deletetodo={() => { this.deletetodo(index); }}
                />
              })}
            </ul>
          }
        </div>
      </div>
    );
  }
}

export default App;
