import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import Joi from "joi-browser";
import Form from "../common/form";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

function withParams(Component) {
  return (props) => (
    <Component {...props} params={useParams()} navigate={useNavigate()} />
  );
}

// export const withRouter = (WrappedComponent) => (props) => {
//   return <WrappedComponent {...props} navigate={useNavigate()} />;
// };

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate"),
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.params.id;

      if (movieId === "new-movie") return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (error) {
      if (error.response && error.response.status === 404)
        // return this.props.history.replace("/not-found");
        return this.props.navigate("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }
  getMovie = async (id) => {
    const { data: MoviesData } = await getMovie(id);
    //console.log(MoviesData.find((m) => m._id === id));
    //  return MoviesData.find((m) => m._id === id);
    return MoviesData;
  };

  mapToViewModel = (movie) => {
    // console.log(movie);
    ///const genreName = genres.find((g) => g._id === movie.genre);

    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };
  /*
  saveMovie = (movie) => {
    // let movieInDb = MoviesData.find((m) => m.id === movie.id) || {};
    // movieInDb.id = movie.title;
    // movieInDb.title = movie.title;
    // movieInDb.genre = movie.genre.id;
    // movieInDb.year = movie.numberInStock;
    // movieInDb.score = movie.dailyRentalRate;
    // if (!movieInDb.id) {
    //   movieInDb.id = Date.now().toString();
    //   MoviesData.push(movieInDb);
    // }
  };
*/
  doSubmit = async () => {
    try {
      await saveMovie(this.state.data);
      this.props.navigate("/movies");
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="col-6">
        <h1>Login Form </h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default withParams(MovieForm);
