import React, {PropTypes} from 'react'
import classnames from 'classnames'
import styles from './style.css'

const Button = props => {

  const className = classnames(styles.button, props.className)

  return (
    <button {...props} className={className}>
      {props.children}
    </button>
  )
}
Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}
export default Button
