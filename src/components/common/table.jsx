import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const Table = ({ onSort, columns, sortColumn, data }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody items={data} columns={columns} />
    </table>
  );
};

export default Table;
