import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  deleteRental,
  getRentals,
  returnRental,
} from "../services/rentalService";
import SearchBox from "./common/searchBox";
import RentalsTable from "./rentalsTable";
import Pagination from "./common/pagination";
import _ from "lodash";
import paginate from "../utils/paginate";

class Rentals extends Component {
  state = {
    rentals: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    sortColumn: { path: "customer.name", order: "asc" },
  };

  handleReturn = async (rental) => {
    if (!window.confirm("This action will return the rental. Are you sure?"))
      return;
    await returnRental(rental);
    window.location.reload();
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleWordChange = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      rentals: allrentals,
      pageSize,
      currentPage,
      searchQuery,
      sortColumn,
    } = this.state;

    let filtered = allrentals;

    if (searchQuery)
      filtered = allrentals.filter((c) =>
        c.customer.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const ordered = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const rentals = paginate(ordered, currentPage, pageSize);

    return { data: rentals, totalCount: filtered.length };
  };

  async componentDidMount() {
    const { data } = await getRentals();

    this.setState({ rentals: data });
  }

  render() {
    const { sortColumn, currentPage, pageSize, searchQuery } = this.state;
    const { data, totalCount } = this.getPagedData();

    return (
      <Fragment>
        {console.log(this.state.rentals)}
        <h1>There are {this.state.rentals.length} rentals in total:</h1>
        <Link to="/rentals/new" className="btn btn-primary my-3">
          Add New Rental
        </Link>
        <SearchBox value={searchQuery} onChange={this.handleWordChange} />
        <RentalsTable
          rentals={data}
          sortColumn={sortColumn}
          onReturn={this.handleReturn}
          onSort={this.handleSort}
        />
        <Pagination
          pageSize={pageSize}
          itemsCount={totalCount}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
        />
      </Fragment>
    );
  }
}

export default Rentals;
