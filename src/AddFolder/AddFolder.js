import React, { Component } from 'react'
import './AddFolder.css'
import ApiContext from '../ApiContext'

import FolderSubmissionErrorBoundary from '../ErrorBoundaries/FolderSubmissionErrorBoundary/FolderSubmissionErrorBoundary';


class AddFolder extends Component {

  static contextType = ApiContext

  state = {
    title: { value: 'sample title' ,
		touched: false
		},
		submitError: false
  }

  getErrorMessage() {
    if(this.state.title.touched){
      let message = this.state.title.value.length ? "" : "please enter a folder name";
      return <p className='error'>{message}</p>
    }
    return <p></p>
  }

	shouldComponentUpdate (nextProps, nextState) {
		if (nextState.submitError) {
			throw new Error('Submission Problem');
		}
		return true;
	}

  render() {
    const { addFolder } = this.context
    const getErrors = this.getErrorMessage();


    return (
		<form
      id='add-folder-form'
      className='Noteful-form'
      onSubmit={e => {
				e.preventDefault();
				const isValid = addFolder(this.state.title.value);
				if ( !!isValid ) {
					this.setState({ submitError: true })
				} else {
					this.props.history.goBack();
				}
			}
			}
    >
      <label htmlFor='folder-name-input'>New Folder Name:
        {getErrors}
      </label>
      <input type='text' name='folder-title' className='field' id='folder-name-input' onChange={e => {
        console.log(e.target.value);
        this.setState({
          title: {value: e.target.value, touched: true}
        })
      }}/>
      <button type='submit' className='buttons'>Create Folder</button>
    </form>
  )
  }


}

export default AddFolder
