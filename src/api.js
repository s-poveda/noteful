import cuid from 'cuid';

const URL = 'http://localhost:9090';

function fetchHandler (...args) {
	args[1] = args[1]
	? Object.assign(args[1].headers, { 'content-type': 'application/json'})
	: Object.assign({}, {'content-type': 'application/json'});
	return fetch(...args).then(res => {
		console.log('first res:',res);
		if (!res.ok) {
			return Promise.reject(res.status);
		}
		return res.json();
	}).then(data => data);
}

function getNotesAndFolders () {
	return Promise.all([
			fetchHandler(`${URL}/notes`),
			fetchHandler(`${URL}/folders`)
	]).then( ([notesRes, foldersRes]) =>{ return {notes: notesRes, folders: foldersRes } });
}

function addNote (noteObject) {
	let body = Object.assign(noteObject, {id: cuid()});
	body = JSON.stringify(body);
	return fetchHandler(`${URL}/notes`, {
		method: 'POST',
		body
	});
}

function deleteNote (id) {
	return fetchHandler(`${URL}/notes/${id}`, {
		method: 'DELETE'
	});
}

function addFolder (folderObj) {
	// folderObj.id = cuid();
	let body = Object.assign(folderObj, { id: cuid() } );
	body = JSON.stringify(body);

	return fetchHandler(`${URL}/folders`, {
		method: 'POST',
		body
	});
}

function deleteFolder (id) {
	return fetchHandler(`${URL}/folders/${id}`,{
		method: 'DELETE'
	});
}

export default {
	getNotesAndFolders,
	addNote,
	deleteNote,
	addFolder,
	deleteFolder
}
