import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useState ,useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { TokenContext } from './../../Context/TokenContext';

const schema = z
  .object({
    name: z.string().nonempty("Full name is required"),
    username: z.string().optional(), // This field is optional
    email: z
      .string()
      .nonempty("Email is required")
      .email("Invalid email address"),
    dateOfBirth: z.string().nonempty("Date of birth is required"),
    gender: z.string().nonempty("Gender is required"),
    password: z
      .string()
      .nonempty("Password is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must include uppercase, lowercase, number, and special character.",
      ),
    rePassword: z.string().nonempty("Please re-confirm your password"),
  })
  .refine(
    (object) => {
      return object.password === object.rePassword;
    },
    { error: "Passwords do not match.", path: ["rePassword"] },
  );

export default function Register() {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(schema),
  });

  const {userToken,setuserToken} = useContext(TokenContext)

  const [apiError, setApiError] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const navigate = useNavigate();

  function handleRegisteration(object) {
    setisLoading(true);
    console.log(object);
    axios
      .post(`https://route-posts.routemisr.com/users/signup`, object)
      .then((res) => {
        localStorage.setItem("userToken",res.data.data.token)
        setuserToken(res.data.data.token)
        navigate("/home");
      })
      .catch((err) => {
        setApiError(err.response?.data.errors);
      })
      .finally(() => setisLoading(false));
  }

  return (
    <>
      <h2 className="text-2xl font-extrabold text-slate-900">
        Create a new account
      </h2>

      <p className="mt-1 text-sm text-slate-500">It is quick and easy.</p>

      <form
        className="space-y-3.5 mt-5"
        onSubmit={handleSubmit(handleRegisteration)}
      >
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2">
            <i className="fa-regular fa-user text-slate-400"></i>
          </span>

          <input
            {...register("name")}
            placeholder="Full name"
            className={`w-full rounded-xl border focus:outline-none bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 ${formState.errors.name ? "border-rose-300 focus:border-rose-300" : "border-slate-200 focus:border-[#00298d]"} transition focus:bg-white  `}
            type="text"
          />
        </div>
        {formState.errors.name && (
          <p className="text-xs font-semibold text-rose-600">
            {formState.errors.name?.message}
          </p>
        )}

        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2">
            <i className="fa-solid fa-at text-slate-400"></i>
          </span>

          <input
            {...register("username")}
            placeholder="Username (optional)"
            className={`w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white `}
            type="text"
          />
        </div>

        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2">
            <i className="fa-solid fa-at text-slate-400"></i>
          </span>

          <input
            {...register("email")}
            placeholder="Email Address"
            className={`w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white ${formState.errors.email ? "border-rose-300 focus:border-rose-300" : "border-slate-200 focus:border-[#00298d]"}`}
            type="text"
          />
        </div>
        {formState.errors.email && (
          <p className="text-xs font-semibold text-rose-600">
            {formState.errors.email?.message}
          </p>
        )}

        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2">
            <i className="fa-regular fa-user text-slate-400"></i>
          </span>

          <select
            {...register("gender")}
            className={`w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white ${formState.errors.gender ? "border-rose-300 focus:border-rose-300" : "border-slate-200 focus:border-[#00298d]"}`}
          >
            <option value={""} disabled>
              Select gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        {formState.errors.gender && (
          <p className="text-xs font-semibold text-rose-600">
            {formState.errors.gender?.message}
          </p>
        )}

        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2">
            <i className="fa-regular fa-calendar text-slate-400"></i>
          </span>

          <input
            {...register("dateOfBirth")}
            className={`w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white ${formState.errors.dateOfBirth ? "border-rose-300 focus:border-rose-300" : "border-slate-200 focus:border-[#00298d]"}`}
            type="date"
          />
        </div>
        {formState.errors.gender && (
          <p className="text-xs font-semibold text-rose-600">
            {formState.errors.dateOfBirth?.message}
          </p>
        )}

        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2">
            <i className="fa-solid fa-key text-slate-400"></i>
          </span>

          <input
            {...register("password")}
            placeholder="Password"
            className={`w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white ${formState.errors.password ? "border-rose-300 focus:border-rose-300" : "border-slate-200 focus:border-[#00298d]"}`}
            type="password"
          />
        </div>
        {formState.errors.password && (
          <p className="text-xs font-semibold text-rose-600">
            {formState.errors.password?.message}
          </p>
        )}

        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2">
            <i className="fa-solid fa-key text-slate-400"></i>
          </span>

          <input
            {...register("rePassword")}
            placeholder="Confirm Password"
            className={`w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white ${formState.errors.rePassword ? "border-rose-300 focus:border-rose-300" : "border-slate-200 focus:border-[#00298d]"}`}
            type="password"
          />
        </div>
        {formState.errors.rePassword && (
          <p className="text-xs font-semibold text-rose-600">
            {formState.errors.rePassword?.message}
          </p>
        )}

        <button
          disabled={isLoading}
          className="w-full bg-blue-800 hover:bg-blue-900 text-white disabled:cursor-not-allowed cursor-pointer rounded-2xl py-3 font-extrabold disabled:bg-blue-300"
        >
          {isLoading ? "Please wait" : "Create New Account"}
        </button>

        {apiError && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-700">
            {apiError}
          </div>
        )}
      </form>
    </>
  );
}
