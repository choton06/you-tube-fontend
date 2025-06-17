import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);

        // Check if the response is OK (status in the range 200-299)
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result);  // Set the data if response is successful
      } catch (error) {
        setError(error);  // Set the error if there is an issue
      } finally {
        setLoading(false);  // Set loading to false when the fetch is complete
      }
    };

    fetchData();
  }, [url]);  // Only refetch when the URL changes

  return { data, error, loading };  // Return the state
}

export default useFetch;
