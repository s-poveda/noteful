import React from 'react';
import NoteCard from '../NoteCard/NoteCard';

export default function MainDisplay (props) {

	const displayNotes = props.notesToBeDisplayed.map(note =>
	<NoteCard key={note.id} noteId={note.id} name={note.name} content={note.contentS} modified={note.modified}/>);

	return (
		<div>
			<ul>
			{displayNotes}
			</ul>
			<button>
				Add Note
			</button>
		</div>
	);
}
