import React, { Component } from 'react'
import AppHeader from '../app-header'
import SearchPanel from '../search-panel'
import TodoList from '../todo-list'
import ItemStatusFilter from '../item-status-filter'
import ItemAddForm from '../item-add-form'

import './app.css'

export default class App extends Component {

  state = {
    todoData : [
      { label: 'Drink Coffee', important: false, id: 11, done: false },
      { label: 'Make Awesome App', important: true, id: 22, done: false },
      { label: 'Have a lunch', important: false, id: 33, done: true }
    ],
    term: '',
    filter: ''
  }

  idMin = 100

  deleteItem = (id) => {

    this.setState(({todoData}) => {

      const newData = todoData.filter((item) => {
        return !(item.id === id)
      })

      return {
        todoData : newData
      }

    })
  }

  addItem = (text) => {

    this.setState(({todoData}) => {

      const newItem = [
        {
          label: text,
          important: false,
          done: false,
          id: this.idMin++
        }
      ]

      const newData = [...todoData, ...newItem]

      return {
        todoData: newData
      }

    })

    this.search(this.state.todoData, this.state.term)

  }

  onToggleImportant = (id) => {

    this.setState(({ todoData }) => {

      const newData = [...todoData]

      newData.forEach(( item, i, arr ) => {
        if ( item.id === id ) {
          arr[i].important = !todoData[i].important
        }
      })

      return {
        todoData: newData
      }

    })

  }

  onToggleDone = (id) => {

    this.setState(({ todoData }) => {

      const newData = [...todoData]

      newData.forEach((item, i, arr) => {
        if ( item.id === id ) {
          arr[i].done = !todoData[i].done
        }
      })

      return {
        todoData: newData
      }

    })

  }

  search = (items, term) => {

    if (items.length === 0) {
      return items
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
    })

  }

  onSearchChange = (term) => {
    this.setState({
      term: term
    })
  }

  filter = (items, filter) => {
    switch (filter) {
      case 'all':
        return items
      case 'active':
        return items.filter((item) => !item.done)
      case 'done':
        return items.filter((item) => item.done)
      default:
        return items
    }
  }

  onFilterChange = (filter) => {
    this.setState({
      filter: filter
    })
  }

  render () {

    const { todoData, term, filter } = this.state

    const visibleItems = this.filter(this.search(todoData, term), filter)

    const doneCount = todoData.filter((item) => {
      return item.done
    }).length

    const todoCount = todoData.length - doneCount

    return (
      <div className="todo-app">
        <AppHeader toDo={ todoCount } done={ doneCount } />
        <div className="top-panel d-flex">
          <SearchPanel
            onSearchChange={ this.onSearchChange }
          />
          <ItemStatusFilter
            filter={ filter }
            onFilterChange={ this.onFilterChange }
          />
        </div>

        <TodoList
          todos={ visibleItems }
          onDeleted={ this.deleteItem }
          onToggleImportant={ this.onToggleImportant }
          onToggleDone={ this.onToggleDone }
        />
        <ItemAddForm addItem={ this.addItem } />
      </div>
    )

  }

}
