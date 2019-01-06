import React, { Component } from 'react'
import './item-add-form.css'

export default class ItemAddForm extends Component {

  state = {
    label: ''
  }

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value
    })
  }

  onSubmitItem = (event) => {
    event.preventDefault()

    this.props.addItem(this.state.label)
    this.setState({
      label: ''
    })
  }

  render () {
    return (
      <form className="item-add-from"
        onSubmit={ this.onSubmitItem }
      >
        <input type="text" className="form-control" placeholder="Add new item"
          onChange={ this.onLabelChange }
          value={ this.state.label }
        />
        <button className="btn btn-outline-secondary">Add Item</button>
      </form>
    )
  }

}
