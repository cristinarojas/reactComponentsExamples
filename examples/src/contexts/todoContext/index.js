// Dependencies
import React, { useState, createContext } from 'react';

// Exporting TodoContext
// Inside I declare all the data, methods that Im going to return in this context.
export const TodoContext = createContext({
  todoExamples: []
});

// Exporting TodoProvider
export const TodoProvider =  ({ children }) => {
  const [todoExamples, setTodoExamples] = useState([
    {
      index: 1,
      name: 'Do laundry'
    },
    {
      index: 2,
      name: 'Study react'
    },
    {
      index: 3,
      name: 'Go to the gym'
    }
  ]);


  // Save all the data into context const
  const context =  {
    todoExamples
  }

  return (
    <TodoContext.Provider
      value={context}
    >
      { children }
    </TodoContext.Provider>
  )
}

export default TodoProvider;
