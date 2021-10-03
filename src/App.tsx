import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
// Views
import LoginView from "./Views/Login/Login";
import DashboardView from "./Views/Dashboard/Dashboard";

// Components
import ProtectedRoute from "./Components/ProtectedRoute";

// Provider
import PostsProvider from "./context/app.context";

// Styles
import "./App.css";

/**
 * Create history constant
 */
const browserHistory = createBrowserHistory();

/**
 * Default Application entry point.
 */
const App: React.FC = () => {
  return (
    <PostsProvider>
      <Router history={browserHistory}>
        <Switch>
          <Route component={LoginView} path="/" exact />
          <ProtectedRoute component={DashboardView} path="/dashboard" />
        </Switch>
      </Router>
    </PostsProvider>
  );
};

export default App;
