import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { register, logUserIn } from "../actions/authAction";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      city: "",
      street: ""
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

    const form = {
      username: this.state.username,
      email: this.state.email,
      password_hash: this.state.password,
      profile: {
        address: {
          city: this.state.city,
          street: this.state.street
        }
      }
    };

    this.props
      .register(form)
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
          err.response.data.forEach(element => {
            errorMsg += `${element.message} \n`;
          });

          alert(errorMsg);
        }
      });
  }

  render() {
    return (
      <div className="container mx-auto flex justify-center items-center mt-20">
        <div className="w-full max-w-md">
          <form
            onSubmit={this.onSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <h2 className="pb-6">Registration</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                onChange={this.onChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="username"
                placeholder="Username"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                onChange={this.onChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                City
              </label>
              <input
                onChange={this.onChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="city"
                type="text"
                placeholder="Moscow"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Street
              </label>
              <input
                onChange={this.onChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="street"
                type="text"
                placeholder="Leninskaya ulitsa"
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
                Register
              </button>
              <Link
                to="/login"
                className="inline-block align-baseline font-bold text-sm text-teal-500 hover:text-teal-800"
              >
                Login?
              </Link>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy;2019 CPA Bro Corp. All rights reserved.
          </p>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  logUserIn: PropTypes.func.isRequired
};

export default connect(null, { register, logUserIn })(Register);
