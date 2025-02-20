'use client'

import { Button } from "@/components/ui/button"
import Logo from "@/components/ui/logo"
import { useAppSelector } from "@/store/hooks"
import { LogOut, Video } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function EndScreen() {
    const router = useRouter()
    const user = useAppSelector((state) => state.user.user)

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-black to-[#0A0A0A] text-white">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,#ffffff05,transparent)]" />

            <div className="relative z-10 flex flex-col items-center justify-between min-h-screen p-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md flex flex-col items-center flex-grow gap-32 mt-20"
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Logo />
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-center"
                    >
                        <h1 className="text-3xl font-semibold mb-8 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                            The session has ended
                        </h1>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                                onClick={() => router.push("/pod")}
                                className="bg-gradient-to-r from-[#6032f6] to-[#4C28C4] hover:opacity-90 text-white font-medium py-3 px-6 rounded-xl w-full max-w-xs shadow-lg shadow-[#6032f6]/20 transition-all duration-300"
                            >
                                Return to home screen
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="w-full max-w-md flex flex-col items-center gap-8 mt-8"
                >
                    <motion.div 
                        className="flex items-center mb-4 bg-white/5 backdrop-blur-lg px-4 py-2 rounded-full"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#6032f6] to-[#4C28C4] flex items-center justify-center text-sm font-bold mr-3 shadow-lg">
                            {user?.username.slice(0,1)}
                        </div>
                        <span className="text-white/80">{user?.username}</span>
                    </motion.div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { }}
                        className="text-red-400 hover:text-red-300 flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-300"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                    </motion.button>
                </motion.div>
            </div>
        </div>
    )
}