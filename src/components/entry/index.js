import React, {PropTypes} from 'react'
import classnames from 'classnames'
import Button from '../button'

const Entry = (props) => {
  const className = classnames(`entry_${props.itemID}`, props.className)
  return (
    <Button onClick={props.remove} className={className}>
      Delete Item:
      {` ${props.itemID}: ${props.name}`}
    </Button>
  )
}

Entry.propTypes = {
  remove: PropTypes.func,
  name: PropTypes.string,
  itemID: PropTypes.number,
  className: PropTypes.string
}
export default Entry
