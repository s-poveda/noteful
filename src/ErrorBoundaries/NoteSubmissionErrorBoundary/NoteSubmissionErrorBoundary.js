import React from 'react';
import PropTypes from 'prop-types';

export default class NoteSubmissionErrorBoundary extends React.Component {
	state = { error: false }

	static getDerivedStateFromError (error) {
		return { error : true }
	}

	componentDidUpdate(previousProps) {
    if (previousProps.children!==this.props.children)
        this.setState({error: false});
		}

	render () {
			if (this.state.error === true ) {
				return (
					<div className='Error__main'>
							<h2 className=''>
							{this.props.message}
							</h2>
							<p>Return to the <a className='to-homescreen' href='/'>Homescreen</a></p>
					</div>
				);
			}
			return this.props.children;
	}
}

NoteSubmissionErrorBoundary.propTypes = {
	message: PropTypes.string,
	children: PropTypes.object
}
