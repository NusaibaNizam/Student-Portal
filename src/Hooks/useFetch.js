import { useEffect, useState } from 'react';

const useFetch=(url,method,isDeleted=false,setIsDeleted=null, setUrl=null)=>{
    const [datas,setDatas] = useState()
    const [isPending,setIsPending]=useState(true)
    const [error,setError]=useState(null)
    if(isDeleted===true){
      if(url!=="http://localhost:8080/api/students"){
        setUrl(("http://localhost:8080/api/students"))
        setIsDeleted(false)
      }
    }
    useEffect(()=>{
      setIsPending(true)
      fetch(url,{
        method: method,
        headers: new Headers({
          'Authorization':localStorage.getItem('access_token')
        })
      })
      .then((response) => {
        if(!response.ok){
          return response.json().then(data=>{
            throw Error(data.message)
          })
        }
        return response.json();
      })
      .then(data => {
        setDatas(data)
        setIsPending(false)
        setError(null)
        if(url==="http://localhost:8080/api/students" && isDeleted===true){
          setIsDeleted(true)
        }
      }).catch(e=>{
        setError(e.message)
        setIsPending(false)
      })
      
    },[url,method,isDeleted,setIsDeleted,setUrl])
    return {datas,isPending,error}
}
export default useFetch