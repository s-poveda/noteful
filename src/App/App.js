import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import ApiContext from '../ApiContext/ApiContext';
import Api from '../Api/api';
import './App.css';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    componentDidMount() {
        // fake date loading from API call
        Api.getNotesAndFolders().then(state => this.setState(state))
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
                <Route
                    path="/note/:noteId"
										component={NotePageNav}
                />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
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
                <Route
                    path="/note/:noteId"
										component={NotePageMain}
                />
            </>
        );
    }

    render() {
			const context = {
				notes: this.state.notes,
				folders: this.state.folders,
				addNote: this.addNote,
				deleteNote: this.deleteNote
			}
        return (
					<ApiContext.Provider value={context} >
            <div className="App">
                <nav className="App__nav">{this.renderNavRoutes()}</nav>
                <header className="App__header">
                    <h1>
                        <Link to="/">Noteful</Link>{' '}
                        <FontAwesomeIcon icon="check-double" />
                    </h1>
                </header>
                <main className="App__main">{this.renderMainRoutes()}</main>
            </div>
						</ApiContext.Provider >
        );
    }
}

export default App;
