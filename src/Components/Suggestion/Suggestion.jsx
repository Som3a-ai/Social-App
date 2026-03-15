import React from "react";
import { Link } from "react-router-dom";

export default function Suggestion({ userProfile }) {
  const { _id, name, username, photo, followersCount } = userProfile;
  return (
    <>
      <div className="rounded-xl border border-slate-200 p-2.5">
        <div className="flex items-center justify-between gap-2">
          <Link
            to={`/profile/${_id}`}
            className="flex min-w-0 items-center cursor-pointer gap-2 rounded-lg px-1 py-1 text-left transition hover:bg-slate-50"
          >
            <img
              alt={`${name}'s profile pic`}
              className="h-10 w-10 rounded-full object-cover"
              src={photo}
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-900 hover:underline">
                {name}
              </p>
              <p className="truncate text-xs text-slate-500">{username}</p>
            </div>
          </Link>

          <button className="inline-flex items-center gap-1 cursor-pointer rounded-full px-3 py-1.5 text-xs font-bold transition disabled:opacity-60 bg-[#e7f3ff] text-[#1877f2] hover:bg-[#d8ebff]">
            <i className="fa-solid fa-user-plus"></i>
            Follow
          </button>
        </div>

        <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-slate-500">
          <span className="rounded-full bg-slate-100 px-2 py-0.5">
            {followersCount} followers
          </span>
        </div>
      </div>
    </>
  );
}
