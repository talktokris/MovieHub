import React, { Component } from "react";
class TableHeader extends Component {
  // coloums
  // sortColumn
  // onSort

  raiseRort = (path) => {
    const sortColumn = { ...this.props.sortColumn };

    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = sortColumn.order === "desc" ? "asc" : "desc";
    }
    this.props.onSort(sortColumn);
    //console.log(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              key={column.path || column.key}
              onClick={() => this.raiseRort(column.path)}
              className="clickable"
            >
              {column.lebel} {this.renderSortIcon(column)}
            </th>
          ))}

          <th />
          <th />
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
