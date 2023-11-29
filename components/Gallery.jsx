import React from 'react'
import { useAutoFetch } from './custom'

const Gallery = () => {
  var myResults = useAutoFetch()
  if (myResults.isLoading) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    )
  }
  if (myResults.isError) {
    return (
      <section className="image-container">
        <h4>There was an error...</h4>
      </section>
    )
  }

  const results = myResults.data.results
  if (results.length < 1) {
    return (
      <section className="image-container">
        <h4>No results found...</h4>
      </section>
    )
  }
  return (
    <div className="image-container">
      {myResults.data.results.map((img) => {
        return (
          <div key={img.id}>
            <img src={img?.urls?.regular} alt={img.id} className="img" />
          </div>
        )
      })}
    </div>
  )
}

export default Gallery
