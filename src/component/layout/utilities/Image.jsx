import React from 'react'

const Image = ({source , alt , styledimg , onClick}) => {
  return (
    <>
      <img src={source} alt={alt} className={styledimg} onClick={onClick} />
    </>
  )
}

export default Image
