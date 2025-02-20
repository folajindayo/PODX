"use client";

import { useCallback } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useAppDispatch } from "@/store/hooks";
import { logOut } from "@/store/slices/userSlice";
import localFont from "next/font/local";
import Logo from "@/assets/icons/Logo";
import { motion } from "framer-motion";

const balige = localFont({
  src: "../fonts/Balige - Personal Use.otf",
  variable: "--font-balige",
});

export default function LandingPage() {
  const dispatch = useAppDispatch();
  const { login, logout, ready } = usePrivy();

  const handleConnect = useCallback(async () => {
    try {
      await logout();
      dispatch(logOut());
      await login();
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  }, [logout, dispatch, login]);

  if (!ready) return null;

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen bg-gradient-to-b from-black to-[#0A0A0A] relative overflow-hidden ${balige.variable}`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,#552fc910,transparent)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="min-h-screen flex flex-col items-center justify-center py-12 sm:py-16">
          <motion.div 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="mb-16 sm:mb-20"
          >
            <Logo className="w-16 h-16 sm:w-20 sm:h-20" />
          </motion.div>

          <div className="flex flex-col gap-16 sm:gap-20 max-w-4xl mx-auto">
            <div className="flex flex-col items-center gap-8">
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="relative"
              >
                <div className="flex justify-center items-center rounded-full bg-gradient-to-r from-[#552FC9] to-[#D7B35D] p-[1px] shadow-lg">
                  <span className="rounded-full bg-[#212121] text-white text-xs sm:text-sm uppercase tracking-wider py-2 px-6 backdrop-blur-sm">
                    A creator's workspace
                  </span>
                </div>
              </motion.div>

              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl sm:text-4xl lg:text-6xl text-center font-balige leading-relaxed sm:leading-tight text-light-gray"
              >
                Host meetings, record sessions, earn proof of attendance,
                and{" "}
                <span className="relative inline-block group">
                  <span className="bg-gradient-to-r from-[#D7B35D] to-[#552FC9] text-transparent bg-clip-text hover:opacity-80 transition-opacity">
                    tip
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#D7B35D] to-[#552FC9] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </span>{" "}
                seamlessly
              </motion.h1>
            </div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="py-3 px-10 rounded-xl bg-gradient-to-r from-[#6032F6] to-[#4C28C4] text-white font-medium text-lg sm:text-xl shadow-lg shadow-[#6032F6]/20 hover:shadow-xl hover:shadow-[#6032F6]/30 transition-all duration-300"
                onClick={handleConnect}
              >
                Get started
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}