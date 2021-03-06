import { useCallback, useEffect, useReducer, useRef, useState } from "react";

interface State<T> {
  data?: T;
  error?: Error;
}

type Cache<T> = { [url: string]: T };

// discriminated union type
type Action<T> =
  | { type: "loading" }
  | { type: "clear" }
  | { type: "fetched"; payload?: T | any }
  | { type: "error"; payload: Error };

function useFetch<T = unknown>(
  url?: string,
  options?: RequestInit
): {
  state: State<T>;
  fetchData: (value: React.SetStateAction<boolean>) => void;
  dispatch: React.Dispatch<Action<T>>;
} {
  const cache = useRef<Cache<T | Blob>>({});

  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
  };

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "clear":
      case "loading":
        return { ...initialState };
      case "fetched":
        return { ...initialState, data: action.payload };
      case "error":
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const [shouldFetchData, setShouldFetchData] = useState(false);

  const fetchData = useCallback(async () => {
    if (!url) return;

    cancelRequest.current = false;
    dispatch({ type: "loading" });

    // If a cache exists for this url, return it
    /*  if (cache.current[url]) {
      dispatch({ type: "fetched", payload: cache.current[url] });
      return;
    }*/

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      let data;
      if (url.includes("text-to-speech")) {
        data = await response.blob();
      } else {
        data = (await response.json()) as T;
      }
      cache.current[url] = data;
      if (cancelRequest.current) return;

      dispatch({ type: "fetched", payload: data });
    } catch (error) {
      if (cancelRequest.current) return;

      dispatch({ type: "error", payload: error as Error });
    }
  }, [options, url]);

  useEffect(() => {
    return () => {
      cancelRequest.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  useEffect(() => {
    if (shouldFetchData) {
      void fetchData();
    }
    setShouldFetchData(false);
  }, [fetchData, shouldFetchData]);

  return { state, fetchData: setShouldFetchData, dispatch };
}

export default useFetch;
