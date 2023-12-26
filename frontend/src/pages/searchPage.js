import React from 'react'
import { useParams } from 'react-router-dom'

const SearchPage = () => {
    const {searchQuery} = useParams() 
  return (
    <div>SearchPage</div>
  )
}

export default SearchPage