import useSWR from 'swr';

const swrFetch = (url) => {
  const fetcher = (fetcherUrl) => fetch(fetcherUrl).then((r) => r.json());
  const { data, error } = useSWR(url, fetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default swrFetch;
