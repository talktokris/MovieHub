import React from "react";

const Like = (props) => {
  let Class = "fa fa-heart";

  if (!props.liked) Class += "-o";

  return (
    <i
      className={Class}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
      onClick={() => props.onLike(props.movieObj)}
    ></i>
  );
};

export default Like;
