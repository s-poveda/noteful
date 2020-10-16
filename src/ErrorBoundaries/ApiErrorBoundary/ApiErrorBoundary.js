import React from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './ApiEB.css';

export default class ApiErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

	static getDerivedStateFromError (error) {
		return { error }
	}

  render() {
    if (this.state.error && this.state.error.fromApi === true ) {
			return (
				<div className="App">
					<nav className="App__nav"></nav>
					<header className="App__header">
							<h1>
								<a href="/">Noteful</a>{' '}
								<FontAwesomeIcon icon="check-double" />
							</h1>
						</header>
						<main className="App__main">
							<h2>{this.props.message}</h2>
							<p><a href='/'>Reload</a> the page</p>
						</main>
				</div>
			);
		}
    return this.props.children;
  }
}

ApiErrorBoundary.propTypes = {
	message: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object
	])
}
