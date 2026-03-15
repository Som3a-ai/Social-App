import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../PostCard/PostCard";
import PlaceHolder from "../PlaceHolder/PlaceHolder";
import { defaultImg } from "../BackupImg";
import { useQuery } from "@tanstack/react-query";
import Suggestion from "../Suggestion/Suggestion";
import PostCreation from "../PostCreation/PostCreation";
import { Helmet } from "react-helmet";


export default function Home() {
  const postsBtns = [
    { name: "Feed", icon: "fas fa-square-poll-vertical" },
    { name: "My Posts", icon: "fa-regular fa-star" },
    { name: "Community", icon: "fas fa-earth-africa" },
    { name: "Saved", icon: "fa-regular fa-bookmark" },
  ];

  const [activeBtn, setActiveBtn] = useState(0);

  function getFeedPosts() {
    return axios.get("https://route-posts.routemisr.com/posts", {
      //  params:{sort:"-createdAt"},
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
  }

  function getFollowSuggestion(){

    return axios.get("https://route-posts.routemisr.com/users/suggestions?limit=5"  , {
     

      headers:{
        Authorization:`Bearer ${localStorage.getItem("userToken")}`,
      }
    })
  }

  const { data: posts, isLoading } = useQuery({
    queryKey: ["getFeed"],
    queryFn: getFeedPosts,
    select: (data) => data.data.data.posts,
  });

    const { data: profiles, isLoading:loading } = useQuery({
    queryKey: ["getFollowSuggestion"],
    queryFn: getFollowSuggestion,
    select: (data) => data.data.data.suggestions,
  });


  

  return (
    <>
    <Helmet>

    <title>Home Feed | Route Posts</title>


    </Helmet>
      <div className="grid gap-4 xl:grid-cols-[240px_minmax(0,1fr)_300px]">
        <aside className="hidden h-fit space-y-3 xl:sticky xl:top-21 xl:block">
          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            {postsBtns.map((btn, index) => {
              return (
                <button
                  key={index}
                  onClick={() => setActiveBtn(index)}
                  className={`mt-1 flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition
      ${
        activeBtn === index
          ? "bg-[#e7f3ff] text-[#1877f2]"
          : "text-slate-700 hover:bg-slate-100"
      }`}
                >
                  <i className={btn.icon}></i>
                  {btn.name}
                </button>
              );
            })}
          </div>
        </aside>

        <section className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm xl:hidden">
            <div className="grid grid-cols-2 gap-2">
              {postsBtns.map((btn, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => setActiveBtn(index)}
                    className={`flex items-center justify-center  cursor-pointer gap-2 rounded-xl px-3 py-2 text-sm font-bold transition    ${
                      activeBtn === index
                        ? "bg-[#e7f3ff] text-[#1877f2]"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <i className={btn.icon}></i>
                    {btn.name}
                  </button>
                );
              })}
            </div>
          </div>

          <PostCreation  feedQueryKey={"getFeed"}/>

          <div className="space-y-4">
            {isLoading ? (
              <>
                <PlaceHolder />
                <PlaceHolder />
                <PlaceHolder />
              </>
            ) : (
              posts.map((post) => {
                
                return <PostCard key={post.id} post={post} />;
              })
            )}
          </div>
        </section>

        <aside className="hidden h-fit xl:sticky xl:top-21 xl:block">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

            <div className="mb-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-user-group"></i>
                <h3 className="text-base font-extrabold text-slate-900">
                  Suggested Friends
                </h3>
              </div>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
                5
              </span>
            </div>
            <div className="mb-3">
              <label className="relative block">
                <i className="fas fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input placeholder="Search friends..." className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-[#1877f2] focus:bg-white"/>
              </label>
            </div>
            <div className="space-y-3">

              {profiles ? 
               profiles.map((profile)=>{
                return <Suggestion userProfile={profile} key={profile._id} />
               }): 
               <>
               <PlaceHolder/>
               <PlaceHolder/>
               <PlaceHolder/>
               <PlaceHolder/>
               </>
               }
            </div>
            <button className="mt-3 inline-flex w-full items-center cursor-pointer justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100">View more</button>
          </div>
        </aside>
      </div>
    </>
  );
}
{
  /* <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition ">…</button>flex */
}
{/* <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-search pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true">…</svg> */}