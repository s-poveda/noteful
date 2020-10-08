import React, { Component } from 'react'
import './AddFolder.css'
import ApiContext from '../ApiContext'

class AddFolder extends Component {
  
  static contextType = ApiContext

  state = {
    title: { value: 'sample title' }
  }

    
  render() {
    const { addFolder } = this.context

    return (
    <form
      id='add-folder-form'
      className='Noteful-form'
      action='#'
      onSubmit={e => {e.preventDefault();  addFolder(this.state.title)}}
    >
      <label htmlFor='folder-name-input'>New Folder Name:</label>
      <input type='text' name='folder-title' className='field' id='folder-name-input' value={this.state.title.value} onChange={e => {
        console.log(e.target.value);
        this.setState({
          title: {value: e.target.value}
        })
      }}/>
      <button type='submit' className='buttons'>Create Folder</button>
    </form>
  )
  }
  

}

export default AddFolder