import React from "react";
import Form from "./common/form";
import * as moviesDB from "../services/movieService";
import { getGenres } from "../services/genreService";
import Joi from "joi-browser";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreID: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    title: Joi.string().required().label("Title"),
    numberInStock: Joi.number()
      .integer()
      .min(1)
      .max(100)
      .required()
      .label("Number In Stock"),
    dailyRentalRate: Joi.number().min(0).max(5).required().label("Rate"),
    genreID: Joi.string().required().label("Genre"),
    _id: Joi.string(),
  };

  doSubmit = async () => {
    await moviesDB.saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  populateTheGenre = async () => {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  };

  populateTheMovie = async () => {
    try {
      const { id } = this.props.match.params;
      if (id === "new") return;

      const { data: movie } = await moviesDB.getMovie(id);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (error) {
      if (error.response && error.response.status === 404)
        this.props.history.replace("/not-found");
    }
  };

  async componentDidMount() {
    await this.populateTheGenre();
    await this.populateTheMovie();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
      genreID: movie.genre._id,
    };
  }

  render() {
    const newId = this.props.match.params.id;
    return (
      <div>
        <h1>{newId === "new" ? "Add New Movie" : "Update Movie"}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreID", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number In Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
