// Dependencies
import React,  { useContext }  from 'react';

// Styles
import './todo.css';

// React Contexts
import { TodoContext } from '../contexts/todoContext';

const Todo = () => {
  // Using todoContext
  const { todoExamples } = useContext(TodoContext);

  // Methods


  return (
    <>
      <section className="container">
        <h1>Examples of todos</h1>
        <ul>
          { todoExamples.map((todo, index) => {
            return <li key={index}> {todo.name} </li>
          })}
        </ul>
      </section>

      <section className="form">
        <h2>Insert a todo:</h2>
        <input
          type="input"
          placeholder="Insert todo"
          id="todoInputText"
          className="todoText"
          autofocus="autofocus"
        />

        <input
          type="submit"
          value="Save"
          id="todoInputSave"
          className="todoButton"
        />
      </section>

      <section className="todoList">
        <h3>My todo list:</h3>
      </section>
    </>
  )
}

export default Todo;
