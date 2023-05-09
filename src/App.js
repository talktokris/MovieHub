import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import auth from "./services/authService";

import "react-toastify/dist/ReactToastify.css";

import "./App.css";

class App extends Component {
  state = { user: "" };

  componentDidMount() {
    try {
      const user = auth.getCurrentUser();

      this.setState({ user });
    } catch (error) {}

    // console.log(this.state.user);
  }
  render() {
    return (
      <>
        <NavBar user={this.state.user} />
        <main className="container">
          <ToastContainer />
          <Routes>
            <Route path="/movies/new" element={<MovieForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/logout" element={<Logout />} />

            <Route path="movies/:id" element={<MovieForm />} />

            <Route path="/movies" element={<Movies />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/rentals" element={<Rentals />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/" element={<Navigate to="movies" />} />
            <Route path="*" element={<Navigate to="not-found" />} />
          </Routes>
        </main>
      </>
    );
  }
}

export default App;
