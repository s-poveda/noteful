import cuid from 'cuid';

const URL = 'http://localhost:9090';

function fetchHandler (...args) {
	args[1] = args[1]
		? Object.assign(args[1].headers, {'content-type': 'application/json'})
		:	{headers: {'content-type': 'application/json'}};
		console.log(args[1]);
	return fetch(...args).then(
		(res) => {
			if (!res.ok) {
				return Promise.reject(res.status);
			}
			return res.json()
		}).then(data => data);
}

function getNotesAndFolders() {
	const notes = fetchHandler(URL+'/notes');
	const folders = fetchHandler(URL + '/folders');
	return Promise.all([notes,folders]).then( (data) =>{ return {notes: data[0], folders: data[1]} });
}

function addNote(noteObject) {
	noteObject.id = cuid();
	const body = JSON.stringify(noteObject);
	return fetchHandler(URL, {
		method: 'POST',
		body
	});
}

function deleteNote (noteId) {
	if(typeof noteId !== 'string') throw new Error('Please provide a string as a note ID');
	return fetchHandler(URL, {
		method: 'DELETE',
		body: noteId
	});
}

export default {
	getNotesAndFolders,
	addNote,
	deleteNote
}
