import { useState, useEffect, useContext } from 'react';
import { LoaderContext } from '../context/loader.jsx';
import { ModalContext } from '../context/modal.jsx';

const useFetch = (url) => {
  const {setLoader} = useContext(LoaderContext);
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const {showState} = useContext(ModalContext);
  const [status,setStatus] = useState();

  useEffect(() => {
    setLoader(true);
    const abortCont = new AbortController();
      fetch(url, { signal: abortCont.signal })
      .then(res => {
        if (!res.ok) { // error coming back from server
          throw Error('could not fetch the data for that resource');
        } 
        setStatus(res.status);
        return res.json();
      })
      .then(data => {        
        setData(data);
        setError(null);
        setLoader(false);
      })
      .catch(err => {
        if (err.name === 'AbortError') {
        } else {
          setError(err.message);
        }
        setLoader(false);
      })

    return () => abortCont.abort();
  }, [url])

  return { data, isPending, error,status };
}
 
export default useFetch;