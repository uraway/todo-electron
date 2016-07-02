import { TODO_ADD, TODO_DELETE, TODO_TOGGLE, TODO_EDIT } from '../actions/todo';

const initialState = [
  {
    id: 123245,
    text: 'Learn Redux',
    completed: false,
  },
  {
    id: 99999,
    text: 'Add todos',
    completed: true,
  }
];

export default function todos(state = initialState, action) {
  switch (action.type) {
    case TODO_ADD:
      return [
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          text: action.text,
          completed: false,
        },
        ...state
      ];

    case TODO_DELETE:
      return state.filter((todo) =>
        todo.id !== action.id
      );

    case TODO_TOGGLE:
      return state.map((todo) =>
        todo.id === action.id ?
          Object.assign({}, todo, { completed: !todo.completed }) :
          todo
      );

    case TODO_EDIT:
      return state.map((todo) =>
        todo.id === action.id ?
          Object.assign({}, todo, { text: action.text }) :
          todo
      );

    default:
      return state;
  }
}
