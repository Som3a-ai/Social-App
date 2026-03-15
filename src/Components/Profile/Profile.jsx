import {  useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'


export default function Profile() {

const {id} = useParams()

function getUserProfile(id){

  return axios.get(`https://route-posts.routemisr.com/users/${id}/profile` , {
    headers:{
      Authorization: `Bearer ${localStorage.getItem('userToken')}`
    }
  })
}

const {data:userInfo , isLoading} = useQuery({

  queryKey:['getUserProfile',id],
  queryFn:()=>getUserProfile(id),
  select:(data)=>data.data.data
})

if(isLoading){
  return <h1>Loading...</h1>
}


    
    
  return (
   <>

   <Helmet>


    <title>{userInfo.user.name}'s' Profile</title>
   </Helmet>
   <div className="space-y-4">


<button className="inline-flex items-center gap-2 cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
<i className="fas fa-arrow-left"></i>
Back
</button>
<section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">


<div
  className="h-48 bg-[linear-gradient(112deg,#0f172a_0%,#1e3a5f_36%,#2b5178_72%,#5f8fb8_100%)]"
  style={{
    backgroundImage:
      `linear-gradient(rgba(15, 23, 42, 0.2), rgba(15, 23, 42, 0.35)), url(${userInfo.user.cover})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
></div>

<div className="relative -mt-14 px-3 pb-5 sm:px-5">
  <div className="flex flex-wrap items-end justify-between gap-4 rounded-2xl border border-white/70 bg-white/95 p-4">

  <div className="flex items-end gap-3">
    <img alt={`${userInfo.user.name}'s profile pic`} className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-sm sm:h-24 sm:w-24" src={userInfo.user.photo}/>
    <div>
      <p className="text-xl font-black text-slate-900 sm:text-2xl">{userInfo.user.name}</p>
      <p className="text-sm font-semibold text-slate-500 sm:text-base">{`@${userInfo.user.username}`}</p>
    </div>
  </div>

  <button type="button" className="cursor-pointer inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-extrabold transition sm:w-auto bg-[#1877f2] text-white hover:bg-[#166fe5]">
    <i className="fa-solid fa-user-plus" style={{color:"rgb(251, 251, 251);"}}></i>
    FOLLOW
  </button>
  
  </div>
</div>
</section>





   </div>
   
   
   </>
  )
}
