import React from 'react';
import './SingleNoteDisplay.css';
import NoteCard from '../NoteCard/NoteCard';
import LeftPane from '../LeftPane/LeftPane';

export default function SingleNoteDisplay (props) {
	// console.log(props.match.para);
	const note = props.notes.find(note => note.id === props.match.params.noteId);
	const folder = props.folders.find( folder => note.folderId === folder.id);

	return (
		<div className='flex-container'>
			<LeftPane folder={folder} goBack={props.goBack}/>
			<div className='vflex-container note-card-show'>
			<NoteCard name={note.name} modified={note.modified} />
			<p>{note.content}</p>
			</div>
		</div>
	)
}
