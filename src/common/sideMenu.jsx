import React, { Component } from "react";

import { genres } from "../data/fakeGenreService";

class SideMenu extends Component {
  state = { genres: genres };

  render() {
    return (
      <div className="list-group" style={{ paddingTop: "1em" }}>
        <a
          className="list-group-item list-group-item-action"
          key="02"
          onClick={() => this.props.onClickGenre("All Genre")}
        >
          All Genre
        </a>
        {this.state.genres.map((genre) => (
          <a
            key={genre._id}
            className={activeClass(genre.name, this.props.currentGenre)}
            onClick={() => this.props.onClickGenre(genre)}
          >
            {genre.name}
          </a>
        ))}
      </div>
    );
  }
}
function activeClass(name, currentGenre) {
  let className = "list-group-item list-group-item-action";
  if (name === currentGenre) className += " active";
  return className;
}

export default SideMenu;
