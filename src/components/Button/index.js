/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { memo } from 'react';
import './index.css';

const Button = ({ children, variant, color, selected, handleSelectedType, ...props }) => {
  const handleOnClick = (item) => {
    handleSelectedType(item.toLowerCase());
  };

  return (
    <button
      type="button"
      className={`Button__root Button--${variant} Button--${color} ${
        selected ? 'Button--selected' : ''
      }`}
      onClick={() => handleOnClick(children)}
      {...props}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  children: null,
  variant: 'contained',
  color: 'textPrimary',
  selected: false,
};

export default memo(Button);
