import React from 'react'

const Conditional = ({ condition, children }) => (
  condition() ? <div>{ children }</div> : null
)

export default Conditional
