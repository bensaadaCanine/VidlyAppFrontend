import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

class Me extends Component {
  state = {
    data: {
      email: "",
      name: "",
      isAdmin: "",
    },
  };

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ data: user });
  }
  render() {
    return (
      <div>
        <h1>Name : {this.state.data.name}</h1>
        <h1>Email : {this.state.data.email}</h1>
        <h1>
          Admin :{" "}
          {this.state.data.isAdmin ? (
            <i className="fas fa-check" style={{ color: "green" }}></i>
          ) : (
            <i className="fas fa-times" style={{ color: "red" }}></i>
          )}
        </h1>
        <Link to="/logout" className="btn btn-danger">
          Logout
        </Link>
      </div>
    );
  }
}

export default Me;
