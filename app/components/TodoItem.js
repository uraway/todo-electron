import React, { Component, PropTypes } from 'react';

import Checkbox from 'material-ui/Checkbox';
import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import moment from 'moment';

import TodoTextInput from './TodoTextInput';

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    toggleTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      mouseEnter: false,
      editing: false,
      value: ''
    };
    /*
    setInterval(() => {
      this.notifyCheck();
    }, 1000 * 10 * 1);
    */
  }

  componentWillReceiveProps(newProps) {
    const { mouseEnter } = newProps;
    this.setState({ mouseEnter });
  }

  notifyCheck = () => {
    const { todo } = this.props;
    const n = new Notification('Notify', {
      body: todo.text
    });
    n.onclick = () => {
      console.log(n);
    };
  }

  handleCheck = (itemId) => {
    const { toggleTodo } = this.props;
    toggleTodo(itemId);
  }

  handleSave(id, text) {
    if (text.length === 0) return;
    this.props.editTodo(id, text);
    this.setState({ editing: false });
  }

  render() {
    const { mouseEnter, editing } = this.state;
    const { todo, toggleTodo, deleteTodo } = this.props;
    const iconButtonElement = (
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    );

    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem onTouchTap={() => this.setState({ editing: true })}>Edit task</MenuItem>
        <MenuItem onTouchTap={() => deleteTodo(todo.id)}>Delete task</MenuItem>
      </IconMenu>
    );

    let element;
    if (editing) {
      element = (
        <TodoTextInput
          text={todo.text}
          editing={editing}
          onSave={(text) => this.handleSave(todo.id, text)}
        />
      );
    } else {
      element = (
        <ListItem
          primaryText={todo.text}
          rightIconButton={rightIconMenu}
          leftIcon={<Checkbox checked={todo.completed} />}
          onTouchTap={() => toggleTodo(todo.id)}
          secondaryText={mouseEnter ? todo.td : moment(todo.td).fromNow()}
          onMouseEnter={() => this.setState({ mouseEnter: true })}
          onMouseLeave={() => this.setState({ mouseEnter: false })}
        />
      );
    }

    return (
      <List>
        {element}
      </List>
    );
  }
}
