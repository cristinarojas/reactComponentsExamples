// Dependencies
import React from 'react';

// React Provider for wrap the components that need this provider
import TodoProvider from './contexts/todoContext';

// Components
import Todo from './todoList';
import Toggle from './toggle';

// Styles
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        React components example
      </header>

      <section>
        <TodoProvider>
          <Todo />
          <Toggle />
        </TodoProvider>
      </section>
    </div>
  );
}

export default App;
