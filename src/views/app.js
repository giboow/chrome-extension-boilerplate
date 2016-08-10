import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'

import {load, onChanged} from '../database'
import removeEntry from './remove-entry'
import addEntry from './add-entry'

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

  componentWillMount() {
    onChanged.addListener(this.update)
  }

  componentWillUnmount() {
    onChanged.removeLister()
  }

  addEntry(e) {
    e.preventDefault()
    addEntry({
      name: 'example'
    }).then(() => {
    }).catch(err => {
      throw err
    })
  }

  removeEntry(ID) {
    removeEntry(ID).then(() => {
    }).catch(err => {
      throw err
    })
  }

  update() {
    load('entries').then(entries => {
      this.setState({
        entries
      })
      setBadge(entries.length)
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
