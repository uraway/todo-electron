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

  state = {
    open: false
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
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
    }
  }

  handleDelete(itemId) {
    const { deleteTodo } = this.props;
    deleteTodo(itemId);
  }

  render() {
    const { todos } = this.props;
    return (
      <div>
        <TextField
          name="addTodo"
          ref="addTodo"
          floatingLabelText="Add a new todo"
          onKeyDown={this.handleKeyDown}
        />
        <List>
        {todos.map((item) => (
          <ListItem
            key={item.id}
            primaryText={item.text}
            onTouchTap={() => this.handleCheck(item.id)}
            leftIcon={
              <Checkbox
                checked={item.completed}
              />
            }
            rightIcon={
              <DeleteForever
                onClick={() => this.handleDelete(item.id)}
              />
            }
          />
      ))}
        </List>
      </div>
    );
  }
}
