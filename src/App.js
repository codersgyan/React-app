import React from "react";

import Navbar from "./components/Navbar";
import { BrowserRouter, withRouter } from "react-router-dom";
import { Route } from "react-router";
import { Provider } from "react-redux";
import store from "./store";

import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const Nav = withRouter(Navbar);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <Nav />
            <Route exact path="/" component={Home} />
            <Route path="/blog" component={Blog} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/dashboard" component={Dashboard} />
          </header>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
