import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import ApiContext from '../ApiContext';
import AddFolder from '../AddFolder/AddFolder';
import AddNotePage from '../AddNote/AddNote';
import FolderSubmissionErrorBoundary from '../ErrorBoundaries/FolderSubmissionErrorBoundary/FolderSubmissionErrorBoundary';
import NoteSubmissionErrorBoundary from '../ErrorBoundaries/NoteSubmissionErrorBoundary/NoteSubmissionErrorBoundary';
import api from '../api';
import cuid from 'cuid';
import './App.css';

class App extends Component {
    state = {
        notes: [],
        folders: [],

				//networkError is a custom error thrown from the api request
				networkError: null
    };

    componentDidMount() {
      api.getNotesAndFolders()
			.then(({notes, folders}) => this.setState({notes, folders}))
			.catch( networkError => {
				this.setState({ networkError })
			});
    }

    handleDeleteNote = async noteId => {
			// try {
				api.deleteNote(noteId).then( ()=> {
					this.setState({
						notes: this.state.notes.filter(note => note.id !== noteId)
					});
				})
			// }
			 .catch((e)=> {
				throw new Error('Couldn\'t delete note');
			})
    };

    //update local state with new note
    updateStateOnAddNote = note => {
        let tempNotes = [...this.state.notes, note]
        this.setState({
            notes: tempNotes
        });
    }

    //compound function to call api and update local state with new note
    handleAddNote = note => {
				return api.addNote(note)
				.then( res => {
					this.updateStateOnAddNote(res);
					return true;
				})
				.catch( e =>{
					return false;
				});
    }

    //update local state with new folder
    updateStateOnAddFolder = folder => {
        let tempFolders = [...this.state.folders, folder]
        this.setState({
            folders: tempFolders
        });
    }

    //compound function to call api and update local state with new folder
    handleAddFolder = name => {
        let folder = {name};
        return api.addFolder(folder).then(res => {
          this.updateStateOnAddFolder(folder);
					return true;
        }).catch(er =>{
          return false;
        });
    }

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route exact path="/note/:noteId" component={NotePageNav} />
                <Route exact path="/add-folder" component={NotePageNav} />
                <Route exact path="/add-note" component={NotePageNav} />
            </>
        );
    }



    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}

                <Route path="/note/:noteId" component={NotePageMain} />

								<FolderSubmissionErrorBoundary
									message='There was an error submitting the new folder. Please try again later'
								>
									<Route path="/add-folder" component={AddFolder} />
								</FolderSubmissionErrorBoundary>

								<NoteSubmissionErrorBoundary
									message='There was an error submitting your new note. Please try again later'
								>
									<Route path='/add-note' component={AddNotePage} />
								</NoteSubmissionErrorBoundary>
            </>
        );
    }

		shouldThrowNetworkError () {
			if (this.state.networkError !== null) throw this.state.networkError;
		}

		setNotesAndFolders  = (notes, folders) => {
			this.setState({ notes, folders })
		}

    render() {
      const value = {
        notes: this.state.notes,
        folders: this.state.folders,
        deleteNote: this.handleDeleteNote,
        addFolder: this.handleAddFolder,
				addNote: this.handleAddNote,
      };

			this.shouldThrowNetworkError();
      return (
        <ApiContext.Provider value={value}>
          <div className="App">
              <nav className="App__nav">
								{this.renderNavRoutes()}
							</nav>
              <header className="App__header">
                <h1>
                  <Link to="/">Noteful</Link>{' '}
                  <FontAwesomeIcon icon="check-double" />
                </h1>
              </header>
              <main className="App__main">
								{this.renderMainRoutes()}
							</main>
          </div>
        </ApiContext.Provider>
      );
    }
}

export default App;
