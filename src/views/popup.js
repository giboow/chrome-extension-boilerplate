import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'

import removeEntry from './remove-entry'

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
    removeEntry(ID).then(data => {
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
    const style = {
      width: 200
    }
    return (
      <div className={className} style={style}>
        {this.entries}
      </div>
    )
  }
}

App.propTypes = {
  data: PropTypes.object
}


export default App
