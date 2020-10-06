import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

class App extends Component {
	static defaultProps = {
		notes: [],
		folders: [],
	}

	state = {
		notes: this.props.notes,
		folders: this.props.folders,
		selectedFolderId: null
	}

	setSelectedFolderId = (id) => {
		this.setState({ selectedFolderId: id });
	}

	notesToBeDisplayed = () => {
		return this.state.selectedFolderId? this.state.notes.filter(note => note.folderId === this.state.selectedFolderId): this.state.notes;
	}

  render () {
		return (
    <div className="App">
			<Route exact path="/"
			// {component={FolderMenu}}
			 	render={ () =>  <div> <FolderMenu /> <MainDisplay notesToBeDisplayed={this.notesToBeDisplayed}/> </div>} />
			<Route exact path='/folder/:folder-id'
				render={ () =>  <div> <FolderMenu /> <MainDisplay notesToBeDisplayed={this.notesToBeDisplayed}/> </div>} />
			<Route exact path='/note/:note-id' component={singleNoteDisplay}/>
    </div>
  	);
	}
}

export default App;
