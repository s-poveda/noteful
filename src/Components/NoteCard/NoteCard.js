import React from 'react';
import { Link } from 'react-router-dom';

function NoteCard(props) {
  return (
    <Link to={`note/${props.noteId}`}>
      <h2> {props.name} </h2>
      <div>
        <div>Modified on {props.modified.subString(0,11)}</div>
        <button> Delete Note </button>
      </div>
    </Link>
  )
}

export default NoteCard;