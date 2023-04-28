import React, { Component } from "react";

import Like from "../common/like";

import Table from "../common/table";

class movieTable extends Component {
  columns = [
    { path: "id", lebel: "SN" },
    { path: "title", lebel: "Title" },
    { path: "year", lebel: "Year" },
    { path: "director", lebel: "Director" },
    { path: "duration", lebel: "Duration" },
    { path: "genre", lebel: "Genre" },
    { path: "score", lebel: "Score" },
    {
      key: "like",
      content: (movie) => (
        <Like
          liked={movie.liked}
          onLike={() => this.props.onLike(movie)}
          movieObj={movie}
        />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          className="btn btn-danger"
          onClick={() => this.props.onDelete(movie)}
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        data={movies}
        onSort={onSort}
      />
    );
  }
}

export default movieTable;
