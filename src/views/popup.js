import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'

import {remove} from '../database'

import Entry from '../components/entry'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      entries: this.props.data.entries
    }
    this.removeEntry = this.removeEntry.bind(this)
  }

  removeEntry(ID) {
    remove(ID).then(data => {
      this.setState({
        entries: data.entries
      })
    }).catch(err => {
      throw err
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
        {this.entries}
      </div>
    )
  }
}

App.propTypes = {
  data: PropTypes.object
}


export default App
