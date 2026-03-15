import React, { useContext, useRef, useState } from "react";
import { defaultImg } from "../BackupImg";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TokenContext } from "../../Context/TokenContext";

export default function PostCreation() {
  const [isUploaded, setisUploaded] = useState(false);
  const [changeText, setchangeText] = useState(false);

  const textInput = useRef(null);
  const imgInput = useRef(null);


  const {userInfo} = useContext(TokenContext)


  const query =  useQueryClient()
  const {isPending, mutate} = useMutation({
    mutationFn: sendPostData,
    onSuccess:()=>{
        console.log("post Created")
        query.invalidateQueries({
        queryKey : ["getFeed"]
        })
        textInput.current.value = ""
        imgInput.current.value = ""
        setchangeText(false)
        setisUploaded(false)

    }
  })

  function handleImgPreview(e) {
    setisUploaded(URL.createObjectURL(e.target.files[0]));
  }

  function prepareData() {
    const formData = new FormData();

    if (textInput.current.value) formData.append("body" , textInput.current.value);
    if (imgInput.current.files[0]) formData.append("image",imgInput.current.files[0]);

    return formData
  }


  function sendPostData(){

    return axios.post(`https://route-posts.routemisr.com/posts` , prepareData() ,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    })
  }


  function removeImgPreview() {
    setisUploaded(false);

    imgInput.current.value = "";
  }
  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-start gap-3">
          <img
            alt="Vladimir Franks"
            className="h-11 w-11 rounded-full object-cover"
            src={userInfo?.photo || defaultImg}
          />
          <div className="flex-1">
            <p className="text-base font-extrabold text-slate-900">
              {userInfo?.name || "User"}
            </p>
          </div>
        </div>
        <div className="relative">
          <textarea
            ref={textInput}
            rows="4"
            onChange={(e) => setchangeText(e.target.value.trim().length > 0)}
            placeholder={`What's on your mind, ${userInfo?.name || "User"}?`}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[17px] leading-relaxed text-slate-800 outline-none transition focus:border-[#1877f2] focus:bg-white"
          ></textarea>
        </div>
        {isUploaded && (
          <>
            <div className="relative mt-2">
              <img
                alt="Preview"
                className="max-h-60 w-full rounded-lg object-cover"
                src={isUploaded}
              />
              <button
                className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white backdrop-blur-sm cursor-pointer"
                onClick={removeImgPreview}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          </>
        )}

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
          <div className="relative flex items-center gap-2">
            <label className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">
              <i
                className="fa-solid fa-image"
                style={{ color: "rgb(99, 230, 190)" }}
              ></i>
              <span className="hidden sm:inline">Photo/video</span>
              <input
                className="hidden"
                type="file"
                ref={imgInput}
                onChange={handleImgPreview}
              />
            </label>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="flex items-center gap-2 rounded-lg bg-[#1877f2] px-5 py-2 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-[#166fe5] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              disabled={(!isUploaded && !changeText) || isPending}
              onClick={mutate}
            >
              {isPending ? "Loading...." : "Post"}
              <i className="fa-regular fa-paper-plane"></i>
              
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
