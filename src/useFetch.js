import React,{useState,useEffect} from 'react';

const useFetch = (url) => {
    const [data,setData] = useState(null);
    const [isPending,setPending] = useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{
        //clean up function
        const abortCont = new AbortController();

        //fetching from database
        setTimeout(()=>{
            fetch(url,{signal:abortCont.signal}).then(res =>{
                // Error handling
                if(!res.ok){
                    throw Error('could not fetch the data for that resource');
                }  
            return res.json(); 
            }).then(data =>{
                setData(data);
                setPending(false);
                setError(null);
            })
            .catch(error =>{
                if(error.name == 'AbortError'){
                    console.log('fetch aborted');
                }
                else{
                    setPending(false)
                    setError(error.message)
                }
            })
        },1000);
        return () => abortCont.abort();
    },[url]);
    return {data,isPending,error};
}
export default useFetch;