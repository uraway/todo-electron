export const TODO_ADD = 'TODO_ADD';
export const TODO_DELETE = 'TODO_DELETE';
export const TODO_TOGGLE = 'TODO_TOGGLE';

let nextTodoId = 0;

export function addTodo(text) {
  return {
    type: TODO_ADD,
    id: nextTodoId++,
    text
  };
}

export function deleteTodo(id) {
  return {
    type: TODO_DELETE,
    id
  };
}

export function toggleTodo(id) {
  return {
    type: TODO_TOGGLE,
    id,
  };
}
