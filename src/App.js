import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import FolderMenu from './Components/FolderMenu/FolderMenu';
import MainDisplay from './Components/MainDisplay/MainDisplay';
import SingleNoteDisplay from './Components/SingleNoteDisplay/SingleNoteDisplay';

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
		<header className="App-header">
			<Link to="/"><h1>Noteful</h1></Link>
		</header>
			<div className='flex-container'>
				<Route exact path="/"
				// {component={FolderMenu}}
			 		render={ () => <FolderMenu folders={this.state.folders} selectedFolderId={this.state.selectedFolderId} />} />
					 <hr/>
					<Route exact path="/"
					// {component={FolderMenu}}
				 		render={ () =>  <MainDisplay notesToBeDisplayed={this.notesToBeDisplayed}/>} />

				<Route exact path='/folder/:folder-id'
					render={ () =>  <div> <FolderMenu /> <MainDisplay notesToBeDisplayed={this.notesToBeDisplayed}/> </div>} />
				<Route exact path='/note/:note-id' component={SingleNoteDisplay}/>
			</div>
    </div>
  	);
	}
}

export default App;
