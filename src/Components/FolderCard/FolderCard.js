import React from 'react';
import { Link } from 'react-router-dom';
const FOLDER_KEY = 'folder';
function FolderCard (props){

  return (
    <Link to={`/folder/${props.folderId}`}>
			<input id={`${FOLDER_KEY + props.folderId}`} type='radio' checked={props.selected}/>
    	<label htmlFor={`${FOLDER_KEY + props.folderId}`}>{props.name}</label>
    </Link>
  )
}

export default FolderCard;
