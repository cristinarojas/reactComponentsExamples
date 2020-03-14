/*
  React Hooks are something that let you write
  Functional Components and still hook into class-based features and use them.
*/

// FILTERS, CLOSURES, ASYNC

// Dependencies
import React,  { useContext, useState, useEffect }  from 'react';
import axios from 'axios';

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
  const [errorMessage, setErrorMessage] = useState(false);
  const [ready, setReady] = useState(false);

  // Using the useEffect method
  useEffect(() => {
    console.log("x1") // Like componentDidMount

    // This works like componentDidMount, setting a local state to true
    // to execute this only the first time that the component was mounted
    // Note: this fix is because the array in the bottom is not empty.
    if (!ready) {
      // Request data using axios library
      axios.get('https://restcountries.eu/rest/v2/all')
        .then(res => {
            console.log(res.data);
            setReady(true);
        })
        .catch(err => {
            console.log(err.message);
        })
    }

    if (errorMessage) { // Like componentDidUpdate (with condition)
      console.log("x2")
    }

  }, [errorMessage, ready]) // This array clearly tells react that just call useEffect when fields in me has been changed.

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
    if (userValue !== "" && isNaN(userValue)) {
      // Pushing into the local state array
      setTodoList([...todoList, userValue]);

      // Hide error message to the user
      setErrorMessage(false);
    } else {
      // Show error message to the user
      setErrorMessage(true);
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
        { errorMessage ? <span className="error">Todo list accept only letters</span> : " " }
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
