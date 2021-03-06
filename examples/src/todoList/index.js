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

  const [countries, setCountries] = useState([]);
  const [typedCountry, setTypedCountry] = useState("");
  const [countriesResult, setCountriesResults] = useState([]);

  console.log('countries ---->', countries);
  console.log('typedCountry----->', typedCountry);
  console.log('countriesResult----->', countriesResult);

  // Using the useEffect method
  useEffect(() => {
    console.log("x1") // Like componentDidMount

    // To avoid the .then method mean I'm resolving the promise.
    const fetchAsync = async () => {
      if (!ready) {
        // Request data using axios library
        // Note: the time that takes to resolve the rquest is Pending state.
        try {
          const response = await axios.get('https://restcountries.eu/rest/v2/all'); // Fulfilled

          setCountries(response.data);
          setReady(true);

        } catch (error) { // Rejected
          console.log('error => ', error.message)
        }
      }
    }

    fetchAsync();

    // This works like componentDidMount, setting a local state to true
    // to execute this only the first time that the component was mounted
    // Note: this fix is because the array in the bottom is not empty.
    // This way Axios is resolving with .then method.
    // if (!ready) {
    //   // Request data using axios library
    //   const request = axios.get('https://restcountries.eu/rest/v2/all');
    //   console.log('rquest =====>', request);
    //
    //   request.then(res => {
    //       setCountries(res.data);
    //       //console.log(res.data)
    //       setReady(true);
    //   })
    //   .catch(err => {
    //       console.log(err.message);
    //   })
    // }

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

  // To handle the filter of the countries
  const handleCountries = ({ target: { value }}) => {

    // If the user type 3 o more characters in the input
    if (value.length >= 3) {
      // Saving user value into local state
      setTypedCountry(value);

      // Filter the countries with the user value typed
      const results = countries.filter(country => country.name.toLowerCase().includes(value.toLowerCase()))
      // callback is a function that pass as parameter.

      // Saving the final results into the local state
      setCountriesResults(results);
    }
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

      <section className="filters">
        <h4>React filters</h4>
        <span>Filter country by name</span>
        <input
          type="text"
          id="countryName"
          className="countryInput"
          autoFocus="autofocus"
          onChange={handleCountries}
        />

        <p>Results for: <span>{typedCountry}</span></p>
        {
          countriesResult.length > 0 ? (
            <>
              <ul>
                {
                  countriesResult.map((result, i) => <li key={i}> { result.name } </li>)
                }
              </ul>
            </>
          ) : ""
        }
      </section>
    </>
  )
}

export default Todo;
