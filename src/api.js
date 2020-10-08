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

export default {
	getNotesAndFolders
}
