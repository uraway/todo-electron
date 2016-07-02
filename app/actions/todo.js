export const TODO_ADD = 'TODO_ADD';
export const TODO_DELETE = 'TODO_DELETE';
export const TODO_TOGGLE = 'TODO_TOGGLE';
export const TODO_EDIT = 'TODO_EDIT';

export function addTodo(text) {
  return {
    type: TODO_ADD,
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

export function editTodo(id, text) {
  return {
    type: TODO_EDIT,
    id,
    text
  };
}
