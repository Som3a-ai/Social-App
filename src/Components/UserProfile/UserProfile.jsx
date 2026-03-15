import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { TokenContext } from "./../../Context/TokenContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import PlaceHolder from "./../PlaceHolder/PlaceHolder";
import PostCard from "./../PostCard/PostCard";

export default function UserProfile() {
  const { userInfo } = useContext(TokenContext);

  const [savedPosts, setsavedPosts] = useState(false);

 
  const { data, isLoading } = useQuery({
    queryKey: ["getMyProfile"],
    queryFn: getUserPosts,
    select: (data) => data.data.data.posts,
    enabled: !!userInfo,
  });

  function getUserPosts() {
    return axios.get(
      `https://route-posts.routemisr.com/users/${userInfo._id}/posts`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }


   if (!userInfo) {
    return <PlaceHolder />;
  }


  return (
    <>
      <Helmet>
        <title>{userInfo?.name || "User"}'s Profile | Route Posts</title>
      </Helmet>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,.06)] sm:rounded-[28px]">
        <div
          className={`group/cover relative h-44  sm:h-52 lg:h-60 ${userInfo.cover ? `bg-[url('${userInfo?.cover}')]` : "bg-[linear-gradient(112deg,#0f172a_0%,#1e3a5f_36%,#2b5178_72%,#5f8fb8_100%)]"}`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_24%,rgba(255,255,255,.14)_0%,rgba(255,255,255,0)_36%)]"></div>
        </div>
        <div className="relative -mt-12 px-3 pb-5 sm:-mt-16 sm:px-8 sm:pb-6">
          <div className="rounded-3xl border border-white/60 bg-white/92 p-5  backdrop-blur-xl sm:p-7">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0">
                <div className="flex items-end gap-4">
                  <div className="group/avatar relative shrink-0">
                    <button
                      type="button"
                      className="cursor-pointer rounded-full"
                    >
                      <img
                        alt="Chanda Benson"
                        className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md ring-2 ring-[#dbeafe]"
                        src={userInfo?.photo}
                      />
                    </button>
                    <button
                      type="button"
                      className="absolute bottom-1 left-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-[#1877f2] opacity-100 shadow-sm ring-1 ring-slate-200 transition duration-200 hover:bg-slate-50 sm:opacity-0 sm:group-hover/avatar:opacity-100 sm:group-focus-within/avatar:opacity-100"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-expand"
                      >
                        <path d="m15 15 6 6"></path>
                        <path d="m15 9 6-6"></path>

                        <path d="M21 16v5h-5"></path>
                        <path d="M21 8V3h-5"></path>
                        <path d="M3 16v5h5"></path>
                        <path d="M3 8V3h5"></path>
                        <path d="M9 9 3 3"></path>
                      </svg>
                    </button>

                    <label className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#1877f2] text-white opacity-100 shadow-sm transition duration-200 hover:bg-[#166fe5] sm:opacity-0 sm:group-hover/avatar:opacity-100 sm:group-focus-within/avatar:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-camera"
                        aria-hidden="true"
                      >
                        <path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"></path>

                        <circle cx="12" cy="13" r="3"></circle>
                      </svg>
                      <input className="hidden" type="file" />
                    </label>
                  </div>

                  <div className="min-w-0 pb-1">
                    <h2 className="truncate text-2xl font-black tracking-tight text-slate-900 sm:text-4xl">
                      {userInfo.name}
                    </h2>

                    <p className="mt-1 text-lg font-semibold text-slate-500 sm:text-xl">
                      @{userInfo.username}
                    </p>

                    <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#d7e7ff] bg-[#eef6ff] px-3 py-1 text-xs font-bold text-[#0b57d0]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-users"
                        aria-hidden="true"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                      </svg>
                      Route Posts member
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid w-full grid-cols-3 gap-2 lg:w-130">
                <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">
                    Followers
                  </p>

                  <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                    {userInfo.followersCount}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">
                    Following
                  </p>
                  <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                    {userInfo.followingCount}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">
                    Bookmarks
                  </p>
                  <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                    {userInfo.bookmarksCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-[1.3fr_.7fr]">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-extrabold text-slate-800">About</h3>

                <div className="mt-3 space-y-2 text-sm text-slate-600">
                  <p className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-mail text-slate-500"
                      aria-hidden="true"
                    >
                      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    </svg>
                    verysebar@mailinator.com
                  </p>

                  <p className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-users text-slate-500"
                      aria-hidden="true"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                    </svg>
                    Active on Route Posts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4 mt-4">
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="grid w-full grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1.5 sm:inline-flex sm:w-auto sm:gap-0">
            <button
              onClick={() => setsavedPosts(false)}
              className={` cursor-pointer flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition  shadow-sm ${!savedPosts ? "active" : "text-slate-600 hover:text-slate-900"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-file-text"
                aria-hidden="true"
              >
                <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path>
                <path d="M14 2v5a1 1 0 0 0 1 1h5"></path>
                <path d="M10 9H8"></path>
                <path d="M16 13H8"></path>
                <path d="M16 17H8"></path>
              </svg>
              My Posts
            </button>

            <button
              onClick={() => setsavedPosts(true)}
              className={`cursor-pointer flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition ${savedPosts ? "active" : "text-slate-600 hover:text-slate-900"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-bookmark"
                aria-hidden="true"
              >
                <path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"></path>
              </svg>
              Saved
            </button>
          </div>

          <span className="rounded-full bg-[#e7f3ff] px-3 py-1 text-xs font-bold text-[#1877f2]">
            5
          </span>
        </div>

        <div className="space-y-3">
          {isLoading && (
            <>
              <PlaceHolder />
              <PlaceHolder />
              <PlaceHolder />
              <PlaceHolder />
            </>
          )}

          {data &&
            data.map((post) => {
              return <PostCard key={post.id} post={post} />;
            })}
        </div>
      </section>
    </>
  );
}
{
  /* <div class="group/cover relative h-44 bg-[linear-gradient(112deg,#0f172a_0%,#1e3a5f_36%,#2b5178_72%,#5f8fb8_100%)] sm:h-52 lg:h-60" style="background-image: linear-gradient(rgba(15, 23, 42, 0.22), rgba(15, 23, 42, 0.4)), url("https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/1773610771305-a3ffa7b6-5bda-439d-87d4-9e764ebceef6-Screenshot-2026-01-20-101622.webp"); background-size: cover; background-position: center center;">…</div> */
}
