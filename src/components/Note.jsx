import React from "react";

export default function Note(props) {
  return (
    <div className="note">
      <button
        onClick={() => {
          props.onedit(props.id);
        }}
      >
        edit
      </button>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button
        onClick={() => {
          props.ondelete(props.id);
        }}
      >
        Delete
      </button>
    </div>
  );
}
