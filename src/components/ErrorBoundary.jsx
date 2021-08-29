import React, { Fragment } from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.setState({
      error: error,
      errorInfo: errorInfao,
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Fragment>
          <div style={{ textAlign: "center" }}>
            <h1
              style={{
                fontFamily: "Georgia, serif",
                color: "#4a4a4a",
                marginTop: "4em",
                lineHeight: "1.5",
              }}
            >
              Something went wrong<br></br>
              Please check the URL or go back a page or reload the page
            </h1>

            <h2
              style={{
                fontFamily: "Verdana, sans-serif",
                color: "#7d7d7d",
                fontWeight: "300",
              }}
            >
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state?.errorInfo?.componentStack}
            </h2>
          </div>
        </Fragment>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
