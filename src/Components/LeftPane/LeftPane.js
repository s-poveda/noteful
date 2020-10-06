import React from 'react';
import './LeftPane.css';

export default function LeftPane (props) {
	return (
		<div className='left-pane'>
			<button onClick={props.goBack}>Go Back</button>
			<h2>{props.folder.name}</h2>
		</div>
	);
}
