import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'

import {load, save, remove} from '../database'

import ChromeExtension from '../helpers/chrome-extension'

import Entry from '../components/entry'
import Button from '../components/button'

const {setBadge} = ChromeExtension

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      entries: this.props.data.entries
    }
    this.removeEntry = this.removeEntry.bind(this)
    this.addEntry = this.addEntry.bind(this)
    this.update = this.update.bind(this)
  }

  addEntry(e) {
    e.preventDefault()
    load().then(loaded => {
      const {entries, itemID} = loaded
      const newID = 1 + parseInt(itemID, 10)
      entries.push({
        itemID: newID
      })
      const newData = {
        entries,
        itemID: newID
      }
      save(newData).then((saved) => {
        this.setState({
          entries: saved.entries
        })
        setBadge(saved.itemID)
      })
    }).catch(err=>{
      throw err
    })
  }

  removeEntry(ID) {
    remove(ID).then(rest => {
      this.setState({
        entries: rest.entries
      })
    }).catch(err => {
      throw err
    })
  }

  update() {
    load('entries').then(entries => {
      this.setState({
        entries
      })
    })
  }

  get entries() {
    return this.state.entries.map((entry, index) => {
      return <Entry {...entry}
                    remove={this.removeEntry.bind(this, entry.itemID)}
                    key={index}/>
    })
  }

  render() {
    const className = classnames('app')
    return (
      <div className={className}>
        <form onSubmit={this.addEntry}>
          <fieldset>
            <Button type='submit'>
              Add
            </Button>
            <Button type='reset' onClick={this.update}>
              Update
            </Button>
          </fieldset>
        </form>
        <div>
          {this.entries}
        </div>
      </div>
    )
  }
}

App.propTypes = {
  data: PropTypes.object
}


export default App
