import React, { Component } from 'react';
import ApiContext from '../ApiContext';

export default class AddNotePage extends Component {
	static contextType = ApiContext;

	state = {
		name: {
			value: '',
			touched: false
		},
		content: {
			value: ''
		},
		folderId: {
			value: null,
			touched: false
		}
	}

	getNameErrorMessage() {
    if(this.state.name.touched){
      let message = this.state.name.value.length ? "" : "please enter a name";
      return <p className='error'>{message}</p>
    }
    return <></>
  }

	getFolderErrorMessage() {
		if(this.state.folderId.touched) {
			let message = this.state.folderId.touched && this.state.folderId.value.length ? '' : 'please select a folder';
			return <p className='error'>{message}</p>
		}
		return <></>
	}

	validateInfo() {
		if (this.state.name.value.length !== 0) return this.context.folders.some( folder => folder.id === this.state.folderId.value)
		return false
	}

	render()  {
		const { folders, addNote } = this.context;
		const [nameError, folderError] = [ this.getNameErrorMessage(), this.getFolderErrorMessage()]
		return (
			<form
	      className='Noteful-form'
				onSubmit={ e => {
					e.preventDefault();
					if (this.validateInfo()) {
						const {name, content, folderId } = this.state;
						const note = {
							name: name.value,
							content: content.value,
							folderId: folderId.value
						}
						addNote(note);
						this.props.history.goBack();
					} else {
						console.log('invalid');
					}
				}}
			>
			<label htmlFor='name-input'>Note Name:
			{nameError}
			</label>
				<input type='text' id='name-input'  onChange={ e=>this.setState({name:{value: e.target.value, touched: true} }) }/>

			<label htmlFor='content'>Description:</label>
			<textarea id='content' placeholder="(Optional)" onChange={ e=> this.setState({ content :{value: e.target.value}}) }></textarea>

			<label htmlFor='folder-selection'>Select Folder
			{folderError}</label>
				<select id='folder-selection' onChange={ e=> this.setState({ folderId :{value: e.target.value, touched: true} }) }>
					<option value=''>--- Select Folder ---</option>
					{folders.map( folder =>
						<option value={folder.id} key={folder.id}>{folder.name}</option>)}
				</select>

				<button type='submit' className='buttons'>Create Note</button>
			</form>
		)
	}
}
