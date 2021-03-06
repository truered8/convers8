import React from "react";
import { Redirect } from "react-router-dom";

// components

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import { useAuth } from "../contexts/AuthContext";

export default function Landing() {
  const { currentUser } = useAuth();

  // if user is logged in, redirect to dashboard
  if (currentUser) {
    return <Redirect to="/admin/dashboard" />;
  } else {
    return (
      <>
        <Navbar transparent />
        <main>
          <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1486704155675-e4c07f8ad160?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80')",
              }}
            >
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-75 bg-black"
              ></span>
            </div>
            <div className="container relative mx-auto">
              <div className="items-center flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                  <div className="pr-12">
                    <h1 className="text-white font-semibold text-5xl">
                      Grammarly for Conversation
                    </h1>
                    <p className="mt-4 text-lg text-blueGray-200">
                      Not everybody is a master of conversation. Luckily,
                      Convers8 is here to help. Record your conversations and
                      get key info to convey your thoughts in a more meaningful
                      way.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
              style={{ transform: "translateZ(0)" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-blueGray-200 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
          </div>

          <section className="pb-20 bg-blueGray-200 -mt-24">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap">
                <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                        <i className="fas fa-award"></i>
                      </div>
                      <h6 className="text-xl font-semibold">Get Tips</h6>
                      <p className="mt-2 mb-4 text-blueGray-500">
                        Learn to improve your conversation by getting tips on
                        how you speak. Learn about your perceived intent,
                        sentiment, and anything that may hinder your
                        conversational goals.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-4/12 px-4 text-center">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
                        <i className="fas fa-retweet"></i>
                      </div>
                      <h6 className="text-xl font-semibold">
                        Track Your Progress
                      </h6>
                      <p className="mt-2 mb-4 text-blueGray-500">
                        Convers8 is an iterative platform. It helps you track
                        your progress by rating conversations that you have had
                        and displaying your improvement overtime.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                        <i className="fas fa-fingerprint"></i>
                      </div>
                      <h6 className="text-xl font-semibold">Review Calls</h6>
                      <p className="mt-2 mb-4 text-blueGray-500">
                        We transcribe your calls for you so that you can review
                        what was said and how it was said. See exactly where
                        there might have been some miscommunication.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="pt-20 pb-48 relative py-20">
            <div
              className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
              style={{ transform: "translateZ(0)" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-white fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center text-center mb-24">
                <div className="w-full lg:w-6/12 px-4">
                  <h2 className="text-4xl font-semibold">The Creators</h2>
                  <p className="text-lg leading-relaxed m-4 text-blueGray-500">
                    Just some recent high school grads creating something that
                    they think people would love to use.
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="">
                  <div className="px-6">
                    <img
                      alt="..."
                      src={require("assets/img/krish.jpg").default}
                      className="shadow-lg rounded-full mx-auto h-24 w-24 max-w-120-px"
                    />
                    <div className="pt-6 text-center">
                      <h5 className="text-xl font-bold">Krish Shah</h5>
                      <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                        Conversationalist Extraordinaire
                      </p>
                      <div className="mt-6">
                        <button
                          className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                          href="https://github.com/KrishKrosh"
                        >
                          <a href="https://twitter.com/krishrshah">
                            <i className="fab fa-twitter"></i>
                          </a>
                        </button>
                        <button
                          className="bg-black text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <a href="https://github.com/KrishKrosh">
                            <i className="fab fa-github"></i>
                          </a>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                  <div className="px-6">
                    <img
                      alt="..."
                      src={require("assets/img/saptarshi.jpg").default}
                      className="shadow-lg rounded-full mx-auto h-24 w-24 max-w-120-px"
                    />
                    <div className="pt-6 text-center">
                      <h5 className="text-xl font-bold">
                        Saptarshi Bhattacherya
                      </h5>
                      <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                        Techno Genius
                      </p>
                      <div className="mt-6">
                        <button
                          className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <a href="https://twitter.com/saptarshib20">
                            <i className="fab fa-twitter"></i>
                          </a>
                        </button>
                        <button
                          className="bg-black text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <a href="https://github.com/truered8">
                            <i className="fab fa-github"></i>
                          </a>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }
}
