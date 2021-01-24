import React, { Component } from "react";
import Like from "./common/likeButton";
import Table from "./common/table";
import { Link } from "react-router-dom";
import { getCurrentUser, isUserAdmin } from "../services/authService";

class MoviesTable extends Component {
  columns = [
    {
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
      label: "Title",
      path: "title",
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "liked",
      content: (movie) => (
        <Like liked={movie.liked} toggleLike={() => this.props.onLike(movie)} />
      ),
    },
  ];

  deleteCol = {
    key: "delete",
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie._id)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteCol);
  }

  render() {
    if (isUserAdmin() && this.columns[this.columns.length - 1].key !== "delete")
      this.columns.push();
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        onSort={onSort}
        sortColumn={sortColumn}
        columns={this.columns}
        data={movies}
      />
    );
  }
}

export default MoviesTable;
