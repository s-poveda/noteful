import React from 'react';
import NoteCard from '../NoteCard/NoteCard';
import LeftPane from '../LeftPane/LeftPane';

export default function SingleNoteDisplay (props) {
	return (
		<div>
			<LeftPane folder={props.folder} />
			<div>
			<NoteCard name={props.note.name} modified={props.note.modified} />
			<p>{props.note.content}</p>
			</div>
		</div>
	)
}
