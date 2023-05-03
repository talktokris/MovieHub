import React, { Component } from "react";

import { MoviesData } from "../data/moviesData";
import { genres } from "../data/fakeGenreService";

import Pagination from "../common/pagination";
//import SideMenu from "../common/sideMenu";
import ListGroup from "../common/listGroup";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";

import MoviesTable from "./movieTable";
import _ from "lodash";
import SearchBox from "../common/searchBox";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 5,
    currentPage: 1,
    selectedGenre: "",
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
  };

  componentDidMount() {
    const genreData = [{ _id: 0, name: "All Genre" }, ...genres];
    this.setState({ movies: MoviesData, genres: genreData });
  }

  DeleteNew = (movie) => {
    const newMovies = this.state.movies.filter((m) => m.id !== movie.id);

    this.setState({ movies: newMovies });
    this.setState({ total: newMovies.length });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;

    this.setState({ movies: movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
    //console.log(page);
  };

  handleClickGenre = (name) => {
    console.log(name);
    this.setState({ selectedGenre: name, currentPage: 1, searchQuery: "" });
    // console.log(name);
    // const movies = this.state.movies.filter((m) => m.genre == name._id);
    // console.log(movies);
    // this.setState({ movies: movies });
    // this.setState({ total: movies.length });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn: sortColumn });

    // this.setState({ sortColumn: { path, order: "asc" } });

    //console.log(path);
  };
  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: "", currentPage: 1 });
    console.log(query);
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
      searchQuery,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id !== 0)
      filtered = allMovies.filter((m) => m.genre === selectedGenre._id);

    const sorted = _.orderBy(
      filtered,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { pageSize, currentPage, searchQuery } = this.state;
    const { totalCount, data: movies } = this.getPageData();

    // const movies = paginate(sorted, currentPage, pageSize);

    // if (totalCount === 0)
    //   return (
    //     <div style={{ padding: "5em" }}>
    //       <h3>No Item Found</h3>
    //     </div>
    //   );

    return (
      <>
        <main role="main" className="container-fluid">
          <div className="row">
            <div className="col-2" style={{ marginTop: "1em" }}>
              <ListGroup
                items={this.state.genres}
                selectedGenre={this.state.selectedGenre}
                onItemSelect={this.handleClickGenre}
              />
            </div>
            <div className="col">
              <div className="starter-template">
                <div style={{ paddingTop: "1em" }}>
                  <div>
                    <Link
                      to="/movies/new"
                      className="btn btn-primary"
                      style={{ marginBottom: 20 }}
                    >
                      New Movie
                    </Link>
                    <h5>There is {totalCount} movies on the list </h5>
                  </div>
                  <div className="col" style={{ paddingBottom: 10 }}>
                    <SearchBox
                      name="searchQuery"
                      value={searchQuery}
                      onChange={this.handleSearch}
                    />
                  </div>

                  <MoviesTable
                    movies={movies}
                    onLike={this.handleLike}
                    onDelete={this.DeleteNew}
                    onSort={this.handleSort}
                    sortColumn={this.state.sortColumn}
                  />
                  <div>
                    <Pagination
                      itemsCount={totalCount}
                      pageSize={pageSize}
                      currentPage={currentPage}
                      onPageChange={this.handlePageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
  /*
  state = { movies: MoviesData, total: MoviesData.length };
  DeleteItem = (id) => {
    const movies = this.state.movies.filter((m) => m.id != id);
    this.setState({ movies: movies });
    this.setState({ total: movies.length });
    //console.log("Delete Clicked - :  " + id);
  };
  */
}

export default Movies;
