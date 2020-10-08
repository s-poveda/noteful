import React, { Component } from 'react'
import './AddFolder.css'
import ApiContext from '../ApiContext'

class AddFolder extends Component {
  
  static contextType = ApiContext
  state = {
    title: { value: 'sample title' }
  }

    
  render() {


    const { className, ...otherProps } = this.props
    return (
    <form
      id='add-folder-form'
      className={['Noteful-form', className].join(' ')}
      action='#'
      {...otherProps}
      onSubmit={e => { }}
    >
      <label htmlFor='folder-name-input'>New Folder Name:</label>
      <input type='text' className='field' id='folder-name-input' value={this.state.title.value} onChange={e => {
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