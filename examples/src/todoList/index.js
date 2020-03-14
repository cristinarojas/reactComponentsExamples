// Dependencies
import React,  { useContext, useState }  from 'react';

// Styles
import './todo.css';

// React Contexts
import { TodoContext } from '../contexts/todoContext';

const Todo = () => {
  // Using todoContext
  const { todoExamples } = useContext(TodoContext);

  // Local state
  const [userValue, setUseValue] = useState("");
  const [todoList, setTodoList] = useState([]);

  // Methods
  // Saving user value to local state
  const handleUserValue = ({target: { value }}) => {
    if (!value.trim()) {
      return
    }

    setUseValue(value)
  }

  // Saving the user value
  const addTodo = () => {

    // Validating empty input and is not a number
    if (userValue !== "" && !isNaN(userValue)) {
      // Pushing into the local state array
      setTodoList([...todoList, userValue]);
    }

    // Cleaning userValue every onClick
    setUseValue("");
  }

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
          autoFocus="autofocus"
          value={userValue}
          onChange={handleUserValue}
        />

        <input
          type="submit"
          value="Save"
          id="todoInputSave"
          className="todoButton"
          onClick={addTodo}
        />
      </section>

      <section className="todoList">
        <h3>My todo list:</h3>

        {
          todoList.length > 0 ? (
            <>
              <ul>
                {todoList.map((todo, i) => {
                  return <li key={i}>{ todo }</li>
                })}
              </ul>
            </>
          ) : ''
        }
      </section>
    </>
  )
}

export default Todo;
