import React from 'react'

const Die = (props) => {
  const styles={
    backgroundColor: props.isHeld ? "rgba(89, 227, 145, 1)":"rgba(255, 255, 255, 1)"
  }

  
  return (
    <div className='dice' style={styles} onClick={props.handleClick}>
      <button style={styles}>{props.value}</button>
    </div>
  )
}

export default Die
