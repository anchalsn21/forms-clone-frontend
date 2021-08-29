import React, { useState, Suspense, lazy } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import AddForm from "./components/AddForm/AddForm";
import AllResponse from "./components/AllResponse/AllResponse";
import SingleResponse from "./components/SingleResponse/SingleResponse";
import AddResponse from "./components/AddResponse/AddResponse";
import Login from "./components/Login/Login";
import PrivateRoute from "./Guards/PrivateRoute";
import CheckRoute from "./Guards/CheckRoute";
import PageNotFound from "./components/PageNotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import { Navbar } from "react-bootstrap";
function App({ history }) {
  return (
    <>
      <ErrorBoundary>
        <Suspense
          fallback={<div className="page__center">Please wait . . .</div>}
        >
          <Navbar className="text-center" bg="primary" variant="dark">
            <Navbar.Brand className="mr-auto text-center">
              Google Forms Clone
            </Navbar.Brand>
          </Navbar>

          <Router>
            <Switch>
              <CheckRoute
                path="/"
                exact
                render={(props) => <Login {...props} />}
              />
              <Route
                path="/login"
                exact
                render={(props) => <Login {...props} />}
              />
              <PrivateRoute
                path="/dashboard"
                exact
                component={Dashboard}
                render={(props) => <Dashboard {...props} />}
              />
              <PrivateRoute
                path="/form/add"
                exact
                component={AddForm}
                render={(props) => <AddForm {...props} />}
              />
              <PrivateRoute
                path="/form/all-response/:id"
                exact
                component={AllResponse}
                render={(props) => <AllResponse {...props} />}
              />
              <PrivateRoute
                path="/form/single-response/:id"
                exact
                component={SingleResponse}
                render={(props) => <SingleResponse {...props} />}
              />
              <Route
                path="/form/:id/add-response"
                exact
                render={(props) => <AddResponse {...props} />}
              />
              <Route component={PageNotFound} />
            </Switch>
          </Router>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
