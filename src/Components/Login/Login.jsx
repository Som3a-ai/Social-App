import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useState ,useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { TokenContext } from './../../Context/TokenContext';


const schema = z.object({
  email: z
    .string()
    .nonempty("Email or username is required")
    .email("Invalid email address"),
  password: z.string().nonempty("Password is required"),
});

export default function Login() {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const [apiError, setApiError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const {userToken,setuserToken} = useContext(TokenContext)

  const navigateUser = useNavigate();

  function handleLogIn(object) {
    setisLoading(true);
    axios
      .post("https://route-posts.routemisr.com/users/signin", object)
      .then((res) => {
        localStorage.setItem("userToken", res.data.data.token);
        setuserToken(res.data.data.token);
        
        navigateUser("/home");
      })
      .catch((err) => {
        setApiError(err.response?.data.errors);
      })
      .finally(() => setisLoading(false));
  }

  return (
    <>
      <h2 className="text-2xl font-extrabold text-slate-900">
        Log in to Route Posts
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Log in and continue your social journey.
      </p>
      <form className="mt-5 space-y-3.5" onSubmit={handleSubmit(handleLogIn)}>
        <div className="relative">
          <span
            className={`absolute left-3 top-1/2 -translate-y-${formState.errors.password ? "5" : "1/2"}`}
          >
            <i className="fa-regular fa-user text-slate-400"></i>
          </span>

          <input
            {...register("email")}
            placeholder="Email or username"
            className={`w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition ${formState.errors.email ? "border-rose-300 focus:border-rose-300" : "border-slate-200 focus:border-[#00298d]"} focus:bg-white`}
            type="text"
          />

          {formState.errors.email && (
            <p className="text-xs font-semibold text-rose-600 mt-2">
              {formState.errors.email?.message}
            </p>
          )}
        </div>

        <div className="relative">
          <span
            className={`absolute left-3 top-1/2 -translate-y-${formState.errors.password ? "5" : "1/2"}`}
          >
            <i className="fa-solid fa-key text-slate-400"></i>
          </span>
          <input
            {...register("password")}
            placeholder="Password"
            className={`w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition ${formState.errors.password ? "border-rose-300 focus:border-rose-300" : "border-slate-200 focus:border-[#00298d]"} focus:bg-white`}
            type="password"
          />

          {formState.errors.password && (
            <p className="text-xs font-semibold text-rose-600 mt-2">
              {formState.errors.password?.message}
            </p>
          )}
        </div>

        <button
          disabled={isLoading}
          className="w-full disabled:bg-blue-300 disabled:cursor-not-allowed rounded-2xl text-white bg-blue-700 font-extrabold hover:bg-blue-900 transition py-3 cursor-pointer"
        >
          {" "}
          {isLoading ? "Please wait" : "Log In"}
        </button>

        <p className="text-center text-blue-700 text-sm hover:underline cursor-pointer">
          Forgot Password ?
        </p>

        {apiError && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-700">
            {apiError}
          </div>
        )}
      </form>
    </>
  );
}
