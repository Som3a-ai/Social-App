import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const TokenContext = createContext();

export default function TokenContextProvider({ children }) {
  const [userToken, setuserToken] = useState(null);
  const [loggedUserId,setloggedUserId] = useState(null)
  const [userInfo, setuserInfo] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setuserToken(token);
    }
  }, []);

function getUserInfo(){


  if(localStorage.getItem("userToken")){

    axios.get(`https://route-posts.routemisr.com/users/profile-data`,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("userToken")}`
      }
    })
    .then((data)=>{
      setuserInfo(data.data.data.user)
    })
  }

  



}
  useEffect(()=>{
    if(localStorage.getItem("userToken")){
      const {user} = jwtDecode(localStorage.getItem("userToken"));
      setloggedUserId(user)
      getUserInfo()
    }
  },[userToken])

  return (
    <TokenContext.Provider value={{ userToken, setuserToken , loggedUserId , userInfo }}>
      {children}
    </TokenContext.Provider>
  );
}
