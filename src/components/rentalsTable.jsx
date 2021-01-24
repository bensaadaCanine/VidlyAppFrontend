import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
import format from "date-format";

class rentalsTable extends Component {
  columns = [
    {
      path: "customer.name",
      label: "Customer",
      content: (rental) => {
        return (
          <Link to={`/customers/${rental.customer._id}`}>
            {rental.customer.name}
          </Link>
        );
      },
    },
    {
      path: "movie.title",
      label: "Movie",
      content: (rental) => {
        return (
          <Link to={`/movies/${rental.movie._id}`}>{rental.movie.title}</Link>
        );
      },
    },
    {
      path: "dateOfRental",
      label: "Date Of Rental",
      content: (rental) => {
        return (
          <span>
            {format.asString("dd/MM/yyyy", new Date(rental.dateOfRental))}
          </span>
        );
      },
    },
    {
      key: "returned",
      content: (rental) => {
        if (rental.dateReturned)
          return <span style={{ color: "green" }}>Returned</span>;
        return (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => {
              this.props.onReturn(rental);
            }}
          >
            Not Returned
          </button>
        );
      },
    },
  ];

  render() {
    const { rentals, onSort, sortColumn } = this.props;

    return (
      <Table
        onSort={onSort}
        sortColumn={sortColumn}
        columns={this.columns}
        data={rentals}
      />
    );
  }
}

export default rentalsTable;
