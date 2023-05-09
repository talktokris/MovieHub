import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import MoviesTable from "./movieTable";
import ListGroup from "../common/listGroup";
import Pagination from "../common/pagination";

import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "../common/searchBox";

//import { genres } from "../data/fakeGenreService";
//import SideMenu from "../common/sideMenu";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: "",
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
  };

  async componentDidMount() {
    const { data } = await getGenres();

    const genreData = [{ _id: "", name: "All Genre" }, ...data];
    const { data: movies } = await getMovies();
    // console.log(response.data);
    this.setState({ movies: movies, genres: genreData });
  }

  DeleteNew = async (movie) => {
    const orginalMovies = this.state.movies;
    const movies = orginalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });
    // toast.error("This movie has already been deleted");

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted");
      this.setState({ movies: orginalMovies });
    }

    // this.setState({ total: newMovies.length });
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
    // console.log(page);
  };

  handleClickGenre = (name) => {
    // console.log(name);
    this.setState({ selectedGenre: name, currentPage: 1, searchQuery: "" });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn: sortColumn });
  };
  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: "", currentPage: 1 });
    // console.log(query);
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      movies: allMovies,
      searchQuery,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    // const { totalCount: totalCount } = this.state.movies;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { totalCount, data: movies } = this.getPageData();
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
                      to="/movies/new-movie"
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
