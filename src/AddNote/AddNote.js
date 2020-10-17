import React, { Component } from 'react';
import ApiContext from '../ApiContext';

export default class AddNote extends Component {
	static contextType = ApiContext;

	state = {
		name: {
			value: '',
			touched: false
		},
		content: {
			value: ''
		},
		folderIdIndex: {
			value: null,
			touched: false
		},
		submitError: false
	}

	getNameErrorMessage() {
    if(this.state.name.touched){
      let message = this.state.name.value.length ? "" : "please enter a name";
      return <p className='error'>{message}</p>
    }
    return <></>
  }

	getFolderErrorMessage() {
		if(this.state.folderIdIndex.touched || this.state.folderIdIndex.value === null) {
			let message = this.state.folderIdIndex.touched && this.state.folderIdIndex.value ? '' : 'please select a folder';
			return <p className='error'>{message}</p>
		}
		return <></>
	}

	validateInfo() {
		let [name, folderIdIndex] = [Object.assign({}, this.state.name, {touched: true}), Object.assign({}, this.state.folderIdIndex, {touched: true})];
		this.setState( { name, folderIdIndex });
		if (this.state.name.value.length > 0 && this.context.folders[this.state.folderIdIndex.value]) return true;
		return false;
	}

	onSubmit = e => {
		e.preventDefault();
		if (this.validateInfo()) {
			const { folders, addNote } = this.context;
			const {name, content, folderIdIndex } = this.state;
			const note = {
				name: name.value,
				content: content.value,
				folderId: folders[folderIdIndex.value].id
			}
			addNote(note)
			.then( success =>{
				if (!success){
					this.setState({ submitError: true })
				} else {
					this.props.history.goBack();
				}
			});
		}
	}

	shouldComponentUpdate (nextProps, nextState) {
		if (nextState.submitError) {
			throw new Error('Submission Problem');
		}
		return true;
	}

	render()  {

		const { folders } = this.context;
		const [nameError, folderError] = [ this.getNameErrorMessage(), this.getFolderErrorMessage()]
		return (
			<form
	      className='Noteful-form'
				onSubmit={this.onSubmit}
			>
				<label htmlFor='name-input'>Note Name:
				{nameError}
				</label>
				<input type='text' id='name-input'  onChange={ e=>this.setState({name:{value: e.target.value, touched: true} }) }/>

				<label htmlFor='content'>Description:</label>
				<textarea id='content' placeholder="(Optional)" onChange={ e=> this.setState({ content :{value: e.target.value}}) }></textarea>

				<label htmlFor='folder-selection'>Select Folder
					{folderError}
				</label>
				<select id='folder-selection' onChange={ e=> this.setState({ folderIdIndex :{value: e.target.value, touched: true} }) }>
					<option value=''>--- Select Folder ---</option>
					{folders.map( (folder, i) =>
						<option value={i} key={folder.id}>{folder.name}</option>)}
				</select>

				<button type='submit' className='buttons'>Create Note</button>
			</form>
		)
	}
}
