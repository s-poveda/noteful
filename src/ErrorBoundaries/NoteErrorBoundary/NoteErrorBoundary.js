import React from 'react';
import PropTypes from 'prop-types';

export default class NoteErrorBoundary extends React.Component {
	state = { error: false }

	static getDerivedStateFromError (error) {
		return { error : true }
	}

	render () {
		console.trace();
			if (this.state.error === true ) {
				return (
					<div className='NotePageMain'>
						<div className='Note'>
							<h2 className='Note__title'>
							There was an error getting this note.
							</h2>
						</div>
					</div>
				);
			}
			return this.props.children;
	}
}

NoteErrorBoundary.propTypes = {
	children: PropTypes.object
}
