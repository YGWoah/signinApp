import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Profile = (props) => {
  let id = props.id
    useEffect(()=>{
      getData()
    },[])
    const [isRespond,setIsRespond] = useState(false)
    const [response,setResponce] = useState({})
    const getData = async ()=>{
      const response = await axios.post(`/getdata?id=${id}`)
      .then((res)=>{
        setResponce(res.data.data)
        console.log(res.data.data)
        setIsRespond(true)
      }).catch((error)=>{
        console.log(error);
    })
    }
    useEffect(()=>{
    console.log(response);

    },[response])
  return (
    <div>{(!isRespond)?"Is Loading":(
      <p>name : {response.name}</p>
    )}</div>
  )
}

export default Profile