import React from 'react';
import { useGlobalContext } from './Context';
import { useInfiniteQuery } from '@tanstack/react-query';
import { autoFetch } from './custom';

const Gallery = () => {
  const [page, setPage] = React.useState(1);
  const { searchTerm } = useGlobalContext();
  const fetchingFn = async ({ pageParam }) => {
    var res = await autoFetch(`${searchTerm}&page=${page}`);
    return res;
  };
  const { data, isFetching, status } = useInfiniteQuery({
    queryKey: ['images', searchTerm, page],
    queryFn: fetchingFn,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });
  const total = data?.pages ? [0]?.data?.total_pages : 0;
  const nextPage = () => {
    var newPage = page + 1;
    if (newPage > total) {
      newPage = 0;
    }
    setPage(newPage);
  };
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
        <button className="btn" onClick={() => nextPage()}>
          Load More
        </button>
      </div>
    </>
  );
};

export default Gallery;
