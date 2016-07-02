import React, { Component, PropTypes } from 'react';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import { List, ListItem } from 'material-ui';

export default class Todo extends Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired,
    todos: PropTypes.array
  };

  constructor() {
    super();
    this.state = {
      value: ''
    };
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleCheck(itemId) {
    const { toggleTodo } = this.props;
    toggleTodo(itemId);
  }

  handleKeyDown = (event) => {
    const value = event.target.value;
    const { addTodo } = this.props;
    if (event.keyCode === 13) {
      addTodo(value);
      this.setState({ value: '' });
    }
  }

  handleDelete(itemId) {
    const { deleteTodo } = this.props;
    deleteTodo(itemId);
  }

  render() {
    const { todos } = this.props;
    const { value } = this.state;
    return (
      <div>
        <TextField
          name="addTodo"
          ref="addTodo"
          floatingLabelText="Add a new todo"
          onKeyDown={this.handleKeyDown}
          value={value}
          onChange={this.handleChange.bind(this)}
        />
        <List>
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            primaryText={todo.text}
            onTouchTap={() => this.handleCheck(todo.id)}
            leftIcon={
              <Checkbox
                checked={todo.completed}
              />
            }
            rightIcon={
              <DeleteForever
                onClick={() => this.handleDelete(todo.id)}
              />
            }
          />
      ))}
        </List>
      </div>
    );
  }
}
