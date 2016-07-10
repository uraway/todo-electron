import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';

export default class TodoTextInput extends Component {
  static propTypes = {
    text: PropTypes.string,
    editing: PropTypes.bool,
    newTodo: PropTypes.bool,
    onSave: PropTypes.func.isRequired
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      text: this.props.text || ''
    };
  }

  handleSubmit(e) {
    const text = e.target.value.trim();
    if (e.which === 13) {
      this.props.onSave(text);
      if (this.props.newTodo) {
        this.setState({ text: '' });
      }
    }
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleBlur(e) {
    if (!this.props.newTodo) {
      this.props.onSave(e.target.value);
    }
  }

  render() {
    const { newTodo } = this.props;
    return (
      <TextField
        type="text"
        name="TextField"
        floatingLabelText={newTodo ? 'Add a new task' : ''}
        autoFocus={!newTodo}
        value={this.state.text}
        onBlur={this.handleBlur.bind(this)}
        onChange={this.handleChange.bind(this)}
        onKeyDown={this.handleSubmit.bind(this)}
      />
    );
  }
}
