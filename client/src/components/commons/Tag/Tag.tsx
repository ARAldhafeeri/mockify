import React from 'react'

type TagProps = {
  text : string
}
const Tag : React.FC<TagProps> = ({text}) =>{
  return (
    <p className=' text-xs p-0.5 font-sans border rounded-lg'>{text}</p>
  )
}

export default Tag;