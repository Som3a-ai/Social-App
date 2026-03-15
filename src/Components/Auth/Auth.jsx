import React, { useState , useContext } from "react";
import Login from "./../Login/Login";
import Register from './../Register/Register';
import { TokenContext } from "../../Context/TokenContext";
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";


export default function Auth() {
  const statsInfo = [
    { num: "2012", subTitle: "FOUNDED" },
    { num: "40K+", subTitle: "Graduates" },
    { num: "50+", subTitle: "Partner Companies" },
    { num: "5", subTitle: "Branches" },
    { num: "20", subTitle: "Diplomas Available" },
  ];

  const [isLogin, setIsLogin] = useState(true);
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate()

  const {userToken} = useContext(TokenContext)

  // userToken && navigate("/home") 

  function setLoginActive() {
    setIsLogin(true);
    setIsRegister(false);
  }
  function setRegisterActive() {
    setIsRegister(true);
    setIsLogin(false);
  }

  return (
    <>
    <Helmet>
      <title>Sign In | Route Posts</title>
    </Helmet>
      <div className="min-h-screen bg-[#f0f2f5] px-4 py-8 sm:py-12 lg:flex">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between">
          <section className="w-full max-w-xl hidden md:block">
            <h1 className="hidden text-5xl font-extrabold tracking-tight text-[#00298d] sm:text-6xl lg:block">
              Route Posts
            </h1>

            <p className="hidden mt-4 text-2xl font-medium leading-snug text-slate-800 lg:block">
              Connect with friends and the world around you on Route Posts.
            </p>
            <div className="mt-6 rounded-2xl border border-[#c9d5ff] bg-white/80 p-4 shadow-sm backdrop-blur sm:p-5">
              <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#00298d]">
                About Route Academy
              </p>
              <p className="mt-1 text-lg font-bold text-slate-900">
                Egypt's Leading IT Training Center Since 2012
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Route Academy is the premier IT training center in Egypt,
                established in 2012. We specialize in delivering high-quality
                training courses in programming, web development, and
                application development. We've identified the unique challenges
                people may face when learning new technology and made efforts to
                provide strategies to overcome them.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {statsInfo.map((stat) => {
                  return (
                   
                      <div
                        className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2"
                        key={stat.subTitle}
                      >
                        <p className="text-base font-extrabold text-[#00298d]">
                          {stat.num}
                        </p>
                        <p className="text-[11px] font-bold uppercase  text-slate-600">
                          {stat.subTitle}
                        </p>
                      </div>
                    
                  );
                })}
              </div>
            </div>
          </section>

          <section className="w-full max-w-107.5 lg:order-2">
            <div className="rounded-2xl bg-white p-4 sm:p-6">
              <div className="mb-4 text-center lg:hidden">
                <h1 className="text-3xl font-extrabold tracking-tight text-[#00298d]">
                  Route Posts
                </h1>
                <p className="mt-1 text-base font-medium leading-snug text-slate-700">
                  Connect with friends and the world around you on Route Posts.
                </p>
              </div>

              <div className="mb-5 grid grid-cols-2 rounded-xl bg-slate-100 p-1">
                <button
                  className={`rounded-lg py-2 text-sm font-extrabold transition cursor-pointer ${isLogin ? "shadow-sm text-[#00298d] bg-white" : "transition text-slate-600 hover:text-slate-800"}`}
                  onClick={setLoginActive}
                >
                  Login
                </button>
                <button
                  className={`rounded-lg py-2 text-sm font-extrabold transition cursor-pointer ${isRegister ? "shadow-sm text-[#00298d] bg-white" : "transition text-slate-600 hover:text-slate-800"}`}
                  onClick={setRegisterActive}
                >
                  Register
                </button>
              </div>



              {isLogin ? <Login/> : <Register/>}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
