import React, { Component, PropTypes } from 'react';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import moment from 'moment';

import TodoItem from './TodoItem';
import TodoTextInput from './TodoTextInput';

export default class Todo extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    todos: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      controlledDate: new Date(),
      controlledTime: new Date(),
    };
  }

  handleDateChange = (event, date) => {
    this.setState({
      controlledDate: date
    });
  }

  handleTimeChange = (event, time) => {
    this.setState({
      controlledTime: time
    });
  }

  handleSave(text) {
    const td =
      `${moment(this.state.controlledDate).format('YYYY/MM/DD')},
      ${moment(this.state.controlledTime).format('hh:mm:ss a')}`;
    if (text.length !== 0) {
      this.props.actions.addTodo(text, td);
    }
  }

  render() {
    const { todos } = this.props;
    return (
      <div>
        <Card>
          <CardText>
            <TodoTextInput
              newTodo
              onSave={this.handleSave.bind(this)}
            />
            <FlatButton
              label="Add"
              onTouchTap={this.handleSave.bind(this)}
            />
          </CardText>
          <CardHeader
            title="schedule"
            actAsExpander
            showExpandableButton
          />
          <CardText expandable>
            <DatePicker
              hintText="Task date"
              value={this.state.controlledDate}
              onChange={this.handleDateChange}
            />
            <TimePicker
              hintText="Task time"
              value={this.state.controlledTime}
              onChange={this.handleTimeChange}
            />
          </CardText>
        </Card>
        <ul>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              editTodo={this.props.actions.editTodo}
              deleteTodo={this.props.actions.deleteTodo}
              toggleTodo={this.props.actions.toggleTodo}
            />
          ))}
        </ul>
      </div>
    );
  }
}
