import React from "react";

const Message = (props) => {
  return (
    <div className="msg">
      {props.name && (
        <b>
          {props.name} <br />
        </b>
      )}
      <span>{props.message}</span>
    </div>
  );
};

export default Message;
