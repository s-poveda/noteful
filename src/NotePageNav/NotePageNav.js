import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext/ApiContext';
import { findFolder, findNote } from '../notes-helpers';
import './NotePageNav.css'

export default class NotePageNav extends Component {
	static defaultProps = {
	  history: {
	    goBack: () => {}
	  }
	}

	render () {
		console.log();
		return <ApiContext.Consumer>
			{({notes, folders}) =>{
			const note = notes? findNote(notes, this.props.match.params.noteId): null;
			const folder = note? findFolder(folders, note.folderId): null;
			return (
		    <div className='NotePageNav'>
		      <CircleButton
		        tag='button'
		        role='link'
		        onClick={() => this.props.history.goBack()}
		        className='NotePageNav__back-button'
		      >
		        <FontAwesomeIcon icon='chevron-left' />
		        <br />
		        Back
		      </CircleButton>
		      {folder && (
		        <h3 className='NotePageNav__folder-name'>
		          {folder.name}
		        </h3>
		      )}
		    </div>
		  )}}
		</ApiContext.Consumer>
	}
}
