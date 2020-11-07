import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../ApiContext'
import PropTypes from 'prop-types';
import './Note.css'

export default class Note extends React.Component {
  static defaultProps ={
    onDeleteNote: () => {},
		id: '',
		name: ''
  }
  static contextType = ApiContext;

  handleClickDelete =async e => {
    try {
			e.preventDefault()
    	const noteId = this.props.id
    	await this.context.deleteNote(noteId)
      this.context.deleteNote(noteId)
      // allow parent to perform extra behaviour
      // this.props.onDeleteNote(noteId)
			} catch(error){
        console.error({ error })
      }
  }

	shouldComponentUpdate(nextProps) {
		if (nextProps === undefined ) {
			throw new Error('invalid note info');
		}
		return true;
	}

  render() {
    const { name, id, modified } = this.props
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${id}`}>
            {name}
          </Link>
        </h2>
        <button
          className='Note__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {format(modified, 'Do MMM YYYY')}
            </span>
          </div>
        </div>
      </div>
    )
  }
}
Note.propTypes= {
	name: PropTypes.string.isRequired,
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	modified: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};
