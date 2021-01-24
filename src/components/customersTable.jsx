import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isUserAdmin } from "../services/authService";
import Table from "./common/table";

class CustomersTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: (customer) => {
        return <Link to={"/customers/" + customer._id}>{customer.name}</Link>;
      },
    },
    { path: "phone", label: "Phone Number" },
    {
      content: (customer) => {
        return customer.isGold ? (
          <i
            className="fas fa-star"
            style={{ color: "gold", fontSize: 25 }}
          ></i>
        ) : (
          <i
            className="fas fa-times"
            style={{ color: "black", fontSize: 25 }}
          ></i>
        );
      },
      label: "Gold",
    },
  ];

  deleteCol = {
    key: "delete",
    content: (customer) => (
      <button
        onClick={() => this.props.onDelete(customer._id)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = isUserAdmin();
    if (user) this.columns.push(this.deleteCol);
  }

  render() {
    const { customers, onSort, sortColumn } = this.props;

    return (
      <Table
        onSort={onSort}
        sortColumn={sortColumn}
        columns={this.columns}
        data={customers}
      />
    );
  }
}

export default CustomersTable;
