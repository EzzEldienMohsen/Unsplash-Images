import React from 'react'
import { useGlobalContext } from './Context'

const SearchForm = () => {
  var { setSearchTerm } = useGlobalContext()
  var handleSubmit = (e) => {
    e.preventDefault()
    var searchValue = e.target.elements.search.value
    if (!searchValue) return
    console.log(searchValue)
    setSearchTerm(searchValue)
  }
  return (
    <div>
      <h1 className="title"> Unsplash images </h1>

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          placeholder="sword"
          className="fom-input search-input"
        />
        <button type="submit" className="btn">
          Search
        </button>
      </form>
    </div>
  )
}

export default SearchForm
