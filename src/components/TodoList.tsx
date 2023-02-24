import { createEffect, createSignal, For } from 'solid-js';
import { styled } from 'solid-styled-components';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
`;

const TodoListContainer = styled('ul')`
  width: 100%;
  list-style: none;
  padding: 0;
`;

const TodoItem = styled('li')<{ completed: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 10px;
  border-radius: 4px;
  font-size: 18px;
  text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  background-color: #fff;

  &:hover {
    background-color: #f5f5f5;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const TodoCheckbox = styled('input')`
  margin-right: 10px;
`;

const TodoInput = styled('input')`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 18px;
  border-radius: 4px;
  border: none;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
`;

const [todos, setTodos] = createSignal<Todo[]>(
  JSON.parse(localStorage.getItem('todos') || '[]')
);
function TodoList() {
  const [newTodoText, setNewTodoText] = createSignal('');

  // createEffect(() => {
  //   localStorage.setItem('todos', JSON.stringify(todos));
  // });

  const addTodo = () => {
    const newTodo: Todo = {
      id: todos().length ? todos()[todos().length - 1].id + 1 : 1,
      text: newTodoText(),
      completed: false,
    };
    setTodos(todos().concat(newTodo));
    setNewTodoText('');
  };

  const toggleTodoCompletion = (id: number) => {
    setTodos(
      todos().map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <Container>
      <TodoInput
        type="text"
        placeholder="Add a new todo..."
        value={newTodoText()}
        onInput={(e) => setNewTodoText(e.currentTarget.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
      <TodoListContainer>
        <For each={todos()}>
          {(todo) => (
            <TodoItem
              completed={todo.completed}
              onClick={() => toggleTodoCompletion(todo.id)}
            >
              <TodoCheckbox
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodoCompletion(todo.id)}
              />
              {todo.text}
            </TodoItem>
          )}
        </For>
      </TodoListContainer>
    </Container>
  );
}

export default TodoList;
