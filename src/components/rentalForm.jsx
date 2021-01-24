import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getMovies } from "../services/movieService";
import { getCustomers } from "../services/customersService";
import { saveRental } from "../services/rentalService";

class RentalForm extends Form {
  state = {
    data: { customerID: "", movieID: "" },
    errors: {},
    customers: [],
    movies: [],
  };

  schema = {
    customerID: Joi.string().required().label("Customer"),
    movieID: Joi.string().required().label("Movie"),
  };

  async componentDidMount() {
    const { data: movies } = await getMovies();
    movies.map((m) => {
      m.name = m.title;
      return m;
    });
    console.log(movies);
    const { data: customers } = await getCustomers();

    this.setState({ customers, movies });
  }

  doSubmit = async () => {
    await saveRental(this.state.data);
    this.props.history.push("/rentals");
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderSelect("customerID", "Customer", this.state.customers)}
        {this.renderSelect("movieID", "Movie", this.state.movies)}
        {this.renderButton("Add New Rental")}
      </form>
    );
  }
}

export default RentalForm;
