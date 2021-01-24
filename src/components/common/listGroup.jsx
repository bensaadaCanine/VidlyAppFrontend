import React from "react";

const ListGroup = ({
  items,
  textProp,
  valueProp,
  onItemSelect,
  selectedItem,
}) => {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[valueProp]}
          className={
            item === selectedItem
              ? "list-group-item active clickable"
              : "list-group-item clickable"
          }
          onClick={() => onItemSelect(item)}
        >
          {item[textProp]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProp: "name",
  valueProp: "_id",
};

export default ListGroup;
