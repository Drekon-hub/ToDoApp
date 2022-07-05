import { useState } from 'react';
import Todo from './todo';

export default function TodoApp() {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState([]);

  function handleChange(e) {
    const value = e.target.value;
    setTitle(value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: crypto.randomUUID(),
      title: title,
      completed: false,
    };

    const temp = [...todos];
    temp.unshift(newTodo);
    setTodos(temp);

    setTitle('')
  }

  function handleUpadate(id, value) {
    const temp = [...todos];
    const item = temp.find((todo) => todo.id === id);
    item.title = value;
    setTodos(temp);
  }

  function handleDelete(id){
    const temp = todos.filter(item => item.id !== id);
    setTodos(temp);
  }
  return (
    <div className='todo-container'>
      <form className='todoCreateForm' onSubmit={handleSubmit}>
        <input onChange={handleChange} className='todo-input' value={title} />
        <input
          onClick={handleSubmit}
          type='submit'
          value='Create todo'
          className='buttonCreate'
        />
      </form>

      <div className='todosContainer'>
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} onUpadate={handleUpadate} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
