import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export default function Settings() {
  const [changedSuccessfully, setchangedSuccessfully] = useState(false);
  const [failed, setfailed] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    getValues,
  } = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
      rePassword: "",
    },
  });

  const password = watch("password");
  const newPassword = watch("newPassword");
  const rePassword = watch("rePassword");

  const isDisabled = !password || !newPassword || !rePassword;

  // API request
  function changePasswordRequest(data) {
    return axios.patch(
      "https://route-posts.routemisr.com/users/change-password",
      {
        password: data.password,
        newPassword: data.newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }

  const { mutate, isPending } = useMutation({
    mutationFn: changePasswordRequest,
    onSuccess: (data) => {
      const newToken = data.data.data.token;
      localStorage.setItem("userToken", newToken);
      setchangedSuccessfully(true);
      
    },
    onError: (error) => {
      setfailed(true)
    },
  });

  function submitHandler(data) {
    mutate(data);
  }

  return (
    <>
      <Helmet>
        <title>Change Password</title>
      </Helmet>

      <main className="min-w-0">
        <div className="mx-auto max-w-2xl">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#e7f3ff] text-[#1877f2]">
                <i className="fa-solid fa-key"></i>
              </span>

              <div>
                <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                  Change Password
                </h1>
                <p className="text-sm text-slate-500">
                  Keep your account secure by using a strong password.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit(submitHandler)}
              className="space-y-4"
              noValidate
            >
              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-slate-700">
                  Current password
                </span>

                <input
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Current password is required",
                    },
                  })}
                  type="password"
                  placeholder="Enter current password"
                  className="w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition border-slate-200 focus:border-[#1877f2] focus:bg-white"
                />

                {errors.password && (
                  <span className="mt-1 block text-xs font-semibold text-rose-600">
                    {errors.password.message}
                  </span>
                )}
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-slate-700">
                  New password
                </span>

                <input
                  {...register("newPassword", {
                    required: {
                      value: true,
                      message: "New password is required",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()[\]{}\-_=+|;:'",.<>\/?`~]).{8,}$/,
                      message:
                        "Password must be 8+ characters with uppercase, lowercase, number and special character",
                    },
                  })}
                  type="password"
                  placeholder="Enter new password"
                  className="w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition border-slate-200 focus:border-[#1877f2] focus:bg-white"
                />

                {errors.newPassword ? (
                  <span className="mt-1 block text-xs font-semibold text-rose-600">
                    {errors.newPassword.message}
                  </span>
                ) : (
                  <span className="mt-1 block text-xs text-slate-500">
                    At least 8 characters with uppercase, lowercase, number, and
                    special character.
                  </span>
                )}
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-slate-700">
                  Confirm new password
                </span>

                <input
                  {...register("rePassword", {
                    required: {
                      value: true,
                      message: "Please confirm your password",
                    },
                    validate: (value) =>
                      value === getValues("newPassword") ||
                      "Passwords do not match",
                  })}
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition border-slate-200 focus:border-[#1877f2] focus:bg-white"
                />

                {errors.rePassword && (
                  <span className="mt-1 block text-xs font-semibold text-rose-600">
                    {errors.rePassword.message}
                  </span>
                )}
              </label>

              {changedSuccessfully && (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                  Password changed successfully.
                </div>
              )}

              {failed && (
                <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700">
                  Current Password incorrect
                </div>
              )}
              <button
                disabled={isDisabled || isPending}
                type="submit"
                className="cursor-pointer w-full items-center justify-center rounded-xl bg-[#1877f2] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#166fe5] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending ? "Updating..." : "Update password"}
              </button>
            </form>
          </section>
        </div>
      </main>
    </>
  );
}
