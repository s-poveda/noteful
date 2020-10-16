import React from 'react';
import PropTypes from 'prop-types';

export default class NoteErrorBoundary extends React.Component {
	state = { error: false }

	static getDerivedStateFromError (error) {
		return { error : true }
	}

	render () {
		console.log('sub bound:', this.state);
			if (this.state.error === true ) {
				return (
					<div className='Noteful-form'>
							<h2 className=''>
							{this.props.message}
							</h2>
					</div>
				);
			}
			return this.props.children;
	}
}

NoteErrorBoundary.propTypes = {
	message: PropTypes.string,
	children: PropTypes.object
}
