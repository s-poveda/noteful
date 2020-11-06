import { API_TOKEN, API_URL } from './config';

class ApiError extends Error {
	constructor(message, code) {
		super(message);
		this.fromApi = true;
	}
}

function fetchHandler (...args) {
	return fetch(...args).then( async res => {
		if (!res.ok) {
			throw new ApiError(res.message);
		}
		if( res.status === 204) return {};
		return res.json();
	})
	.then(data => {
		return data;
	})
	.catch(e => {
		console.log(e);
		throw new ApiError(e);
	});
}

function getNotesAndFolders () {
	return Promise.all([
			fetchHandler(`${API_URL}/notes`),
			fetchHandler(`${API_URL}/folders`)
	]).then( ([notesRes, foldersRes]) =>{ return {notes: notesRes, folders: foldersRes } });
}

function addNote (noteObject) {
	noteObject.modified = new Date();
	let body = JSON.stringify(noteObject);

	return fetchHandler(`${API_URL}/notes`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'Authorization': `Bearer ${API_TOKEN}`
		},
		body
	});
}

function deleteNote (id) {
	return fetchHandler(`${API_URL}/notes/${id}`, {
		method: 'DELETE',
		headers: {
			'content-type': 'application/json',
			'Authorization':`Bearer ${API_TOKEN}`
		}
	});
}

function addFolder (folderObj) {
	let body = JSON.stringify(folderObj);

	return fetchHandler(`${API_URL}/folders`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'Authorization': `Bearer ${API_TOKEN}`
		},
		body
	});
}

function deleteFolder (id) {
	return fetchHandler(`${API_URL}/folders/${id}`,{
		method: 'DELETE',
		headers: {
			'content-type': 'application/json',
			'Authorization':`Bearer ${API_TOKEN}`
		}
	});
}

export default {
	getNotesAndFolders,
	addNote,
	deleteNote,
	addFolder,
	deleteFolder
}
