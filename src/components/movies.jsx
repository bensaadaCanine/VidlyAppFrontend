import React, { Component, Fragment } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { getCurrentUser } from "../services/authService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "../components/moviesTable";
import paginate from "../utils/paginate";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ name: "All Genres", _id: "" }, ...data];
    const { data: movies } = await getMovies();

    this.setState({ movies, genres, selectedGenre: genres[0] });
  }

  handleLike = async (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;

    this.setState({ movies });
  };

  handleDelete = async (movieID) => {
    await deleteMovie(movieID);
    const movies = this.state.movies.filter((m) => m._id !== movieID);
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleWordChange = (query) => {
    this.setState({ searchQuery: query, currentPage: 1, selectedGenre: null });
  };

  getPagedData = () => {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      selectedGenre,
      searchQuery,
      sortColumn,
    } = this.state;

    let filtered = allMovies;

    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const ordered = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(ordered, currentPage, pageSize);

    return { data: movies, totalCount: filtered.length };
  };

  render() {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const user = getCurrentUser();
    const { data: movies, totalCount } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
          />
          {user && user.isAdmin && (
            <div>
              <Link className="btn btn-primary m-3" to="/genres/new">
                Add Genre
              </Link>
              <Link to="/genres/delete" className="btn btn-danger m-3">
                Delete Genre
              </Link>
            </div>
          )}
        </div>
        <div className="col">
          {user && (
            <Fragment>
              <Link className="btn btn-primary mb-4" to="/movies/new">
                New Movie
              </Link>
            </Fragment>
          )}
          <h3>Showing {totalCount} movies from the database</h3>
          <SearchBox value={searchQuery} onChange={this.handleWordChange} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            pageSize={pageSize}
            itemsCount={totalCount}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
