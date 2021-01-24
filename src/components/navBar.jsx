import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 ">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Vidly
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav flex-row flex-wrap bd-navbar-nav pt-2 py-md-0">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/movies"
              >
                Movies
              </NavLink>
            </li>

            {!user && (
              <React.Fragment>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
              </React.Fragment>
            )}

            {user && (
              <React.Fragment>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/customers"
                    activeClassName="active"
                  >
                    Customers
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/rentals">
                    Rentals
                  </NavLink>
                </li>
              </React.Fragment>
            )}
          </ul>
          {user && (
            <ul className="navbar-nav flex-row flex-wrap ms-md-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/me">
                  Hello {user.name}!
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/logout">
                  Logout
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
