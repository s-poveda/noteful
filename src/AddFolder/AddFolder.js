import React, { Component } from 'react'
import './AddFolder.css'
import ApiContext from '../ApiContext'

class AddFolder extends Component {

  static contextType = ApiContext

  state = {
    title: {
			value: '' ,
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

	submitIsValid() {
		const title = Object.assign(this.state.title, {touched: true})
		this.setState({title});
		if (this.state.title.value.length > 0) return true;
		return false;
	}

	onSubmit= e => {
		const { addFolder } = this.context
		e.preventDefault();
		if (this.submitIsValid()) {
			addFolder(this.state.title.value)
			.then(success => {
				if (!success) {
					this.setState({ submitError: true });
				} else {
					this.props.history.goBack();
				}
			});
		}
	}

  render() {
    return (
		<form
      id='add-folder-form'
      className='Noteful-form'
      onSubmit={this.onSubmit}
    >
      <label htmlFor='folder-name-input'>New Folder Name:
        {this.getErrorMessage()}
      </label>
      <input type='text' name='folder-title' className='field' id='folder-name-input' onChange={e => {
        this.setState({
          title: {value: e.target.value, touched: true}
        })}}/>
      <button type='submit' className='buttons'>Create Folder</button>
    </form>
  )
  }


}

export default AddFolder
