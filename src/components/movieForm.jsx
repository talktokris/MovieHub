import React from "react";
import { useParams, Navigate } from "react-router-dom";
import Joi from "joi-browser";
import Form from "../common/form";
import { genres } from "../data/fakeGenreService";
import { MoviesData } from "../data/moviesData";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    genres: [],
    errors: {},
  };

  schema = {
    id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(9999)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate"),
  };

  componentDidMount() {
    this.setState({ genres: genres });
    const movieId = this.props.params.id;
    if (movieId === "new") return;

    const movie = this.getMovie(movieId);

    // const navigate = useNavigate();
    if (!movie)
      return this.state.redirect && <Navigate to="/not-found" replace={true} />;
    //if (!movie) return navigate("/not-found", { replace: true });

    this.setState({ data: this.mapToViewModel(movie) });

    // console.log(genres);
  }
  getMovie = (id) => {
    return MoviesData.find((m) => m.id === Number(id));
  };

  mapToViewModel = (movie) => {
    ///const genreName = genres.find((g) => g._id === movie.genre);

    return {
      id: movie.id,
      title: movie.title,
      genreId: movie.genre,
      numberInStock: movie.year,
      dailyRentalRate: movie.score,
    };
  };

  saveMovie = (movie) => {
    //  let movieInDb = MoviesData.find((m) => m.id === movie.id) || {};
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

  doSubmit = () => {
    this.saveMovie(this.state.data);
    //  console.log("Submited");
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
