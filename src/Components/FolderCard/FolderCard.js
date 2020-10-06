import React from 'react';
import { Link } from 'react-router-dom';

function FolderCard (props){

  return (
    <Link>
      <input type='radio' checked={props.selected}> 
        {props.name}
      </input>
    </Link>
  )
}

export default FolderCard;