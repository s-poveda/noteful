import React from 'react';
import { Link } from 'react-router-dom';

function FolderCard (props){

  return (
    <Link to={props.folderId}>
      <input type='radio' checked={props.selected}>
        {props.name}
      </input>
    </Link>
  )
}

export default FolderCard;
