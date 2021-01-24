import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (sortColumn.path !== column.path) return null;
    if (sortColumn.order === "asc") return <i className="fas fa-sort-up"></i>;
    return <i className="fas fa-sort-down"></i>;
  };

  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.path || col.key}
              onClick={() => this.raiseSort(col.path)}
              className="clickable"
            >
              {col.label} {this.renderSortIcon(col)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
