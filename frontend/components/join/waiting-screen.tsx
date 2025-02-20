import React from "react";

const WaitingScreen = () => (
    <div className="w-full min-h-screen flex flex-col items-center justify-center 
                    text-white bg-gradient-to-b from-[#121212] to-[#1a1a1a] px-4 sm:px-6">
        <div className="max-w-md w-full text-center space-y-8 backdrop-blur-lg bg-white/5 p-8 rounded-2xl shadow-xl">
            <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#6032f6] to-[#8b5cf6] text-transparent bg-clip-text">
                    Getting Ready
                </h2>
                <p className="text-base sm:text-lg md:text-xl font-medium text-gray-200">
                    Please wait while we prepare your pod meeting experience.
                </p>
            </div>

            <div className="relative">
                <div className="absolute inset-0 bg-[#6032f6]/20 blur-xl rounded-full animate-pulse"></div>
                <div className="relative animate-spin-slow">
                    <svg
                        className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-[#6032f6]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                    </svg>
                </div>
            </div>

            <div className="space-y-3">
                <p className="text-sm sm:text-base text-gray-300">
                    You'll be joining the meeting shortly...
                </p>
                <div className="flex justify-center space-x-2">
                    <span className="w-2 h-2 bg-[#6032f6] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-[#6032f6] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-[#6032f6] rounded-full animate-bounce"></span>
                </div>
            </div>
        </div>
    </div>
);

export default WaitingScreen;