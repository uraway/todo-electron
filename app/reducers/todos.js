import { TODO_ADD, TODO_DELETE, TODO_TOGGLE } from '../actions/todo';

const initialState = [
  {
    id: 0,
    text: 'Learn Redux',
    completed: false,
  },
  {
    id: 1,
    text: 'Add todos',
    completed: true,
  }
];

const todo = (state, action) => {
  switch (action.type) {
    case TODO_ADD:
      return [
        {
          id: action.id,
          text: action.text,
          completed: false,
        },
        ...state,
      ];

    case TODO_DELETE:
      return state.filter((item) =>
        item.id !== action.id
      );

    case TODO_TOGGLE:
      if (state.id !== action.id) {
        return state;
      }

      return Object.assign({}, state, {
        completed: !state.completed,
      });

    default:
      return state;
  }
};

const todos = (state = initialState, action) => {
  switch (action.type) {
    case TODO_ADD:
      return [
        ...state,
        todo(undefined, action)
      ];
    case TODO_TOGGLE:
      return state.map((t) =>
        todo(t, action)
      );
    default:
      return state;
  }
};

export default todos;
