import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Logout from "./components/logout";
import Movies from "./components/movies";
import NavBar from "./components/navBar";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import Me from "./components/me";
import Genre from "./components/genreForm";
import DeleteGenre from "./components/deleteGenreForm";
import CustomerForm from "./components/customerForm";
import RegisterForm from "./components/registerForm";
import ProtectedRoute from "./components/common/protectedRoute";
import { getCurrentUser } from "./services/authService";
import "./App.css";
import RentalForm from "./components/rentalForm";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <div id="mainCont">
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <ProtectedRoute path="/rentals/new" component={RentalForm} />
            <ProtectedRoute path="/customers/:id" component={CustomerForm} />
            <ProtectedRoute
              path="/genres/delete"
              exact
              component={DeleteGenre}
            />
            <ProtectedRoute path="/genres/new" exact component={Genre} />
            <ProtectedRoute path="/me" component={Me} />
            <Route path="/register" component={RegisterForm} />
            <ProtectedRoute path="/logout" component={Logout} />
            <Route path="/login" component={LoginForm} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <ProtectedRoute path="/rentals" component={Rentals} />
            <ProtectedRoute path="/customers" component={Customers} />
            <Redirect from="/" exact to="/movies" />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
