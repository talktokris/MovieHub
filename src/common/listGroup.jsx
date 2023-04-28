import React, { Component } from "react";

class ListGroup extends Component {
  render() {
    const { items, textProperty, valueProperty, onItemSelect } = this.props;
    return (
      <ul className="list-group">
        {this.props.items.map((item) => (
          <li
            key={item._id}
            className={activeClass(item.name, this.props.selectedGenre)}
            onClick={() => this.props.onItemSelect(item)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    );
  }
}
function activeClass(name, selectedGenre) {
  let className = "list-group-item";
  if (name === selectedGenre.name) className += " active";
  return className;
}

export default ListGroup;
