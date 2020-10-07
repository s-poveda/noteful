import React from 'react';

const ApiContext = React.createContext({
	notes: [],
	folders: [],
	addNote: () => {},
	deleteNote: () => {}
});

ApiContext.displayName = "ApiContext"

export default ApiContext;
