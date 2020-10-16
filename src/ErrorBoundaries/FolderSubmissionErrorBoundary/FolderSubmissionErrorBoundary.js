import React from 'react';
import PropTypes from 'prop-types';

export default class FolderSubmissionErrorBoundary extends React.Component {
	state = { error: false }

	static getDerivedStateFromError (error) {
		return { error : true }
	}

	componentDidUpdate(prevProps) {
		if (prevProps.children !== this.props.children){
			this.setState({error:false})
		}
	}

	componentDidCatch(e) {
		console.log('did',e);
	}
	render () {
			if (this.state.error === true ) {
				return (
					<div className='Error__main'>
							<h2 className=''>
							{this.props.message}
							</h2>
							<p>Return to the <a href='/'>Homescreen</a></p>
					</div>
				);
			}
			return this.props.children;
	}
}

FolderSubmissionErrorBoundary.propTypes = {
	message: PropTypes.string,
	children: PropTypes.object
}
