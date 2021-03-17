import useSWR, { mutate } from 'swr';

const swrFetch = (url) => {
  const fetcher = async (fetcherUrl) => {
    const res = await fetch(fetcherUrl);

    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.');
      // Attach extra info to the error object.
      error.info = await res.json();
      error.status = res.status;
      throw error;
    }

    return res.json();
  };
  const { data, error } = useSWR(url, fetcher, { shouldRetryOnError: false });
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const refetch = (url) => (mutate(url));

export default swrFetch;
