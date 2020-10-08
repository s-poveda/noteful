import React from 'react'
import Note from '../Note/Note'
import ApiContext from '../ApiContext/ApiContext';
import { findNote } from '../notes-helpers';
import './NotePageMain.css'

export default class NotePageMain extends React.Component {
	render() {
		return (
			<ApiContext.Consumer>
				{({notes})=> {
					const {noteId} = this.props.match.params;
					const note = notes.length? findNote(notes, noteId): {};
					return (
						<section className='NotePageMain'>
							<Note
								id={note.id}
								name={note.name}
								modified={note.modified}
							/>
							<div className='NotePageMain__content'>
								{ note.content && note.content.split(/\n \r|\n/).map((para, i) =>
									<p key={i}>{para}</p>
								)}
							</div>
						</section>
					)
				}}
			</ApiContext.Consumer>
		);
	}
}

NotePageMain.defaultProps = {
  note: {
    content: '',
  }
}
