import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const MovieFrom = ({ match }) => {
  const params = useParams();
  const history = useNavigate();
  return (
    <div>
      <h1>Movie Form - {params.id}</h1>
      <button
        disabled={this.validate()}
        className="btn btn-primary"
        onClick={() => history("/movies")}
      >
        Save
      </button>
    </div>
  );
};

export default MovieFrom;
