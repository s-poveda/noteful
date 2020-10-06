import React from 'react';
import { Link } from 'react-router-dom';

function NoteCard(props) {
  return (
		<li>
    <Link to={`note/${props.noteId}`}>
      <h2 className='space2'> {props.name} </h2>
			</Link>
      <div className='flex-container space'>
        <div>Modified on {props.modified.substring(0,11)}</div>
        <button> Delete Note </button>
      </div>
		</li>
  )
}

export default NoteCard;
