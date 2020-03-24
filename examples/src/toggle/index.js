// Dependencies
import React,  { useState }  from 'react';

// Styles
import './toggle.css';


const Toggle = () => {
  // Local state
  const [open, setOpen] = useState(false);


  // Method to handle open/close
  const handleToggle = () => {
    setOpen(!open);
  }

  return (
    <section className="container">
      <button
        type="button"
        onClick={handleToggle}
      >Toggle</button>

      <section className={`close ${open ? `block` : ''}`}>
        <h2>Im a block</h2>
      </section>
    </section>
  )
}

export default Toggle;
