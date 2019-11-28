import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login, logUserIn } from "../actions/authAction";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    if (window.localStorage.getItem("user") !== null) {
      this.props.history.push("/dashboard");
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    this.props
      .login(this.state)
      .then(res => {
        // Save user to LocalStorage
        window.localStorage.setItem("user", JSON.stringify(res));
        // Log in user
        this.props.logUserIn(res);

        this.props.history.push("/dashboard");
      })
      .catch(err => {
        // If validation fails show errors on the page
        if (err.response.status === 422) {
          let errorMsg = "";
          if (Array.isArray(err.response.data)) {
            err.response.data.forEach(element => {
              errorMsg += `${element.message} \n`;
            });
          } else {
            errorMsg += `${err.response.data.message} \n`;
          }
          alert(errorMsg);

          return;
        }
      });
  }

  render() {
    return (
      <div className="container mx-auto">
        <div className="container mx-auto flex justify-center items-center mt-20">
          <div className="w-full max-w-md">
            <form
              onSubmit={this.onSubmit}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <h2 className="pb-6">Login</h2>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Username
                </label>
                <input
                  onChange={this.onChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="username"
                  type="text"
                  placeholder="Username"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  onChange={this.onChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  name="password"
                  type="password"
                  placeholder="******************"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Login
                </button>
                <Link
                  to="/register"
                  className="inline-block align-baseline font-bold text-sm text-teal-500 hover:text-teal-800"
                >
                  Registration?
                </Link>
              </div>
            </form>
            <p className="text-center text-gray-500 text-xs">
              &copy;2019 CPA Bro Corp. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  logUserIn: PropTypes.func.isRequired
};

export default connect(null, { login, logUserIn })(Login);
