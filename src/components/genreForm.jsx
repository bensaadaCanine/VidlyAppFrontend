import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { saveGenre } from "../services/genreService";

class Genre extends Form {
  state = {
    data: { name: "" },
    errors: {},
  };

  schema = { name: Joi.string().required().label("Genre") };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const body = { ...data };
      body.name = body.name.charAt(0).toUpperCase() + body.name.slice(1);
      await saveGenre(body);
      this.props.history.push("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.name = error.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Add New Genre</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Genre")}
          {this.renderButton("Add")}
        </form>
      </div>
    );
  }
}

export default Genre;
