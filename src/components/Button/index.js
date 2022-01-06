import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './index.css';

const Button = ({ children, variant, color, selected, onClick, ...props }) => {
  return (
    <button
      type="button"
      className={cn('Button__root', {
        [`Button--${variant}`]: true,
        [`Button--${color}`]: true,
        'Button--selected': selected,
      })}
      onClick={onClick}
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

Button.propTypes = {
  children: PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
  selected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default memo(Button);
