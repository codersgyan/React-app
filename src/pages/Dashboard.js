import React, { Component } from "react";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = null;
    if (window.localStorage.getItem("user") !== null) {
      this.state = JSON.parse(window.localStorage.getItem("user"));
    }
  }

  UNSAFE_componentWillMount() {
    if (window.localStorage.getItem("user") === null) {
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      <div className="max-w-5xl mx-auto mt-16 rounded overflow-hidden shadow-lg bg-white">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-3">Welcome to my dashboard!</div>
          <h3 className="text-gray-700 text-lg">
            My username is
            <span className="font-bold">
              {this.state ? this.state.username : ""}
            </span>
            . I live at
            <span className="font-bold">
              {this.state ? this.state.profile.address.street : ""},
              {this.state ? this.state.profile.address.city : ""}.
            </span>
            Feel free to contact me on{" "}
            <span className="font-bold">
              {this.state ? this.state.email : ""}
            </span>{" "}
            <br />
            Thank you for visiting my dashboard.
          </h3>
        </div>
        <div className="px-6 py-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            #photography
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            #travel
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            #winter
          </span>
        </div>
      </div>
    );
  }
}

export default Dashboard;
