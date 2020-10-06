import React from 'react';

export default function LeftPane (props) {
	return (
		<div>
			<button>Go Back</button>
			<h2>{props.folder.name}</h2>
		</div>
	);
}
