import React from 'react';
import { Link } from 'react-router-dom';
import './Error.css'

class ErrorPage extends React.Component {
  render() {
    return <>
      <div className="error-container">
        <div className="ErrorBox">
          <h1 className="erroHeadingText">404</h1>
          <h2 className="errorSubHeadingText">Page Not Found</h2>
          <button className="errorLinkBtn"><Link style={{ textDecoration: "none", color: "white" }} to="/">Go to home page</Link></button>
        </div>
      </div>
    </>;
  }
}
export default ErrorPage;