import React, { Component } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../actions/authAction";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.logoutUser = this.logoutUser.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();

    this.props.logout().then(res => {
      if (res) {
        this.props.history.push("/");
      }
    });
  }

  render() {
    let isLoggedIn = window.localStorage.getItem("user") !== null;

    let boxedBtn, sideLink;

    if (isLoggedIn) {
      boxedBtn = (
        <a
          onClick={this.logoutUser}
          href="#"
          className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
        >
          Выйти
        </a>
      );

      sideLink = (
        <NavLink
          to="/dashboard"
          className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
        >
          Dashboard
        </NavLink>
      );
    } else {
      boxedBtn = (
        <NavLink
          to="/login"
          className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
        >
          Войти
        </NavLink>
      );

      sideLink = (
        <NavLink
          to="/register"
          className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
        >
          Регистрация
        </NavLink>
      );
    }

    return (
      <div className="App">
        <header className="App-header">
          <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
              <svg
                className="fill-current h-8 w-8 mr-2"
                width="54"
                height="54"
                viewBox="0 0 54 54"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
              </svg>
              <NavLink to="/">
                <span className="font-semibold text-xl tracking-tight">
                  CPA BUSINESS
                </span>
              </NavLink>
            </div>
            <div className="block lg:hidden">
              <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                <svg
                  className="fill-current h-3 w-3"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
              </button>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
              <div className="text-sm lg:flex-grow">
                <NavLink
                  to="/blog"
                  className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
                >
                  Блог
                </NavLink>
              </div>
              <div className="mr-6">{sideLink}</div>
              <div>{boxedBtn}</div>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(null, { logout })(Navbar);
