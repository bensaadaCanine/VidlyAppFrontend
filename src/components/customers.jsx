import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { deleteCustomer, getCustomers } from "../services/customersService";
import SearchBox from "./common/searchBox";
import CustomersTable from "./customersTable";
import Pagination from "./common/pagination";
import _ from "lodash";
import paginate from "../utils/paginate";

class Customers extends Component {
  state = {
    customers: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    sortColumn: { path: "name", order: "asc" },
  };

  handleDelete = async (customerID) => {
    await deleteCustomer(customerID);
    const customers = this.state.customers.filter((c) => c._id !== customerID);
    this.setState({ customers });
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
      customers: allCustomers,
      pageSize,
      currentPage,
      searchQuery,
      sortColumn,
    } = this.state;

    let filtered = allCustomers;

    if (searchQuery)
      filtered = allCustomers.filter((c) =>
        c.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const ordered = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const customers = paginate(ordered, currentPage, pageSize);

    return { data: customers, totalCount: filtered.length };
  };

  async componentDidMount() {
    const { data } = await getCustomers();
    this.setState({ customers: data });
  }

  render() {
    const { sortColumn, currentPage, pageSize, searchQuery } = this.state;
    const { data, totalCount } = this.getPagedData();

    return (
      <Fragment>
        <h1>There are {this.state.customers.length} customers registered:</h1>
        <Link to="/customers/new" className="btn btn-primary my-3">
          Add New Customer
        </Link>
        <SearchBox value={searchQuery} onChange={this.handleWordChange} />
        <CustomersTable
          customers={data}
          sortColumn={sortColumn}
          onDelete={this.handleDelete}
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

export default Customers;
