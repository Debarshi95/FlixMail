/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <div className="ErrorBoundary__root">
          <h2>Oops!!Some error occured</h2>
        </div>
      );
    }
    return children;
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
export default ErrorBoundary;
