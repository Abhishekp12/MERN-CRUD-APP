import React from 'react';
import './CustomButton.css';

const CustomButton = ({ children, className = '', ...rest }) => {

  return (
    <>
    <button
      className={`custom-button ${className}`}
      {...rest}
    >
      {children}
    </button>
    </>
  )
}

export default CustomButton

// Creating a custom button component in a modern and clean way
//  using the spread operator (...rest) 
// is an excellent approach. This allows your 
// component to be flexible and reusable without explicitly defining all possible props.