import React, { Component } from "react";

class Like2 extends Component {
  /*
 
    */
  render() {
    let Class = "fa fa-heart";

    if (!this.props.liked) Class += "-o";

    return (
      <i
        className={Class}
        style={{ cursor: "pointer" }}
        aria-hidden="true"
        onClick={() => this.props.onLike(this.props.movieObj)}
      ></i>
    );
  }
}

export default Like2;
