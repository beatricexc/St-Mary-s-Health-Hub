// src/components/ErrorBoundary.jsx
import React from 'react';
import { Result, Button } from 'antd';

export default class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status="error"
          title="Oops—something went wrong"
          subTitle={this.state.error?.message || 'Please try refreshing the page.'}
          extra={[
            <Button
              key="reload"
              type="primary"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </Button>
          ]}
        />
      );
    }

    // No error: render children as normal
    return this.props.children;
  }
}
