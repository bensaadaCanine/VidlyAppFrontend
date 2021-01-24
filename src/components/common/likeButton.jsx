import React from "react";

const Like = ({ liked, toggleLike }) => {
  let classes = "far fa-heart clickable";
  if (liked) classes = "fas fa-heart clickable";
  return <i className={classes} onClick={toggleLike}></i>;
};

export default Like;
