import React from 'react';
import { useGlobalContext } from './Context';
import { useInfiniteQuery } from '@tanstack/react-query';
import { autoFetch } from './custom';

const Gallery = () => {
  const { searchTerm } = useGlobalContext();
  const fetchingFn = async ({ pageParam }) => {
    var res = await autoFetch(`${searchTerm}&page=${pageParam}`);
    console.log(pageParam);
    return res;
  };
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['images', searchTerm],
    queryFn: fetchingFn,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });

  return status === 'pending' || isFetching ? (
    <section className="image-container">
      <h4>Loading...</h4>
    </section>
  ) : status === 'error' ? (
    <section className="image-container">
      <h4>There was an error...</h4>
    </section>
  ) : (
    <>
      {console.log(data)}
      {data.pages.map((page, i) => (
        <div key={i} className="image-container">
          {page?.data.results.map((img) => {
            return (
              <div key={img.id}>
                <img src={img?.urls?.regular} alt={img.id} className="img" />
              </div>
            );
          })}
        </div>
      ))}
      <div className="image-container">
        <button
          className="btn"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </button>
      </div>
      <div className="image-container">
        {isFetching && !isFetchingNextPage ? 'Fetching...' : null}
      </div>
    </>
  );
};

export default Gallery;
