import React from "react";
import { deleteGenre, getGenres } from "../services/genreService";
import Form from "./common/form";
import Joi from "joi-browser";

class DeleteGenre extends Form {
  state = {
    data: { genreID: "" },
    errors: {},
    genres: [],
  };

  schema = { genreID: Joi.string().required().label("Genre") };

  doSubmit = async () => {
    await deleteGenre(this.state.data.genreID);
    this.props.history.push("/");
  };

  async componentDidMount() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderSelect("genreID", "Genre", this.state.genres)}
        {this.renderButton("DELETE")}
      </form>
    );
  }
}

export default DeleteGenre;
