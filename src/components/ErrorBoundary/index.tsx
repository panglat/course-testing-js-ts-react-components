import React, { ErrorInfo } from 'react';

import './styles.scss';
import { reportError } from 'api';

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component {
  state = { hasError: false };
  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ hasError: true });
    reportError(error, info);
  }
  tryAgain = () => this.setState({ hasError: false });
  render() {
    return this.state.hasError ? (
      <div>
        <div role="alert">There was a problem.</div>{' '}
        <button onClick={this.tryAgain}>Try again?</button>
      </div>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
