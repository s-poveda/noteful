import React from 'react';
import FolderCard from '../FolderCard/FolderCard';

FolderMenu.defaultProps = {
	folders: [],
	selectedFolderId: null
}

export default function FolderMenu (props) {

	const displayFolders = props.folders.map( folder =>
	<FolderCard key={folder.id} name={folder.name} selected={folder.id === props.selectedFolderId}/>
	);

	return (
		<div>
			{displayFolders}
			<button>
				Add Folder
			</button>
		</div>
	);
}
