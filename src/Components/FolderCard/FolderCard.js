import React from 'react';
import { Link } from 'react-router-dom';
const FOLDER_KEY = 'folder';
function FolderCard (props){
  return (
		<li>
    <Link onClick={() => props.onFolderClick(props.folderId)} to={`/folder/${props.folderId}`}>
			<input onChange={() => console.log('changed')} id={`${FOLDER_KEY + props.folderId}`} type='radio' checked={props.selected}/>
    	<label htmlFor={`${FOLDER_KEY + props.folderId}`}>{props.name}</label>
    </Link>
		</li>
  )
}

export default FolderCard;
