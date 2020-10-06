import React from 'react';
import { Link } from 'react-router-dom';

function NoteCard(props) {
  return (
		<li>
    <Link to={`note/${props.noteId}`}>
      <h2> {props.name} </h2>
			</Link>
      <div>
        <div>Modified on {props.modified.substring(0,11)}</div>
        <button> Delete Note </button>
      </div>
		</li>
  )
}

export default NoteCard;
