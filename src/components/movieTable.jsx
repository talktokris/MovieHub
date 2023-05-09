import React, { Component } from "react";

import Like from "../common/like";
import { Link } from "react-router-dom";

import Table from "../common/table";

class movieTable extends Component {
  columns = [
    {
      path: "title",
      lebel: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "numberInStock", lebel: "Stock" },
    { path: "dailyRentalRate", lebel: "Rate" },
    { path: "genre.name", lebel: "Genre" },

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

    if (movies.length === 0) {
      return (
        <div className="col" style={{ textAlign: "center", paddingTop: 30 }}>
          <h4>No Movies Found</h4>
        </div>
      );
    }
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
