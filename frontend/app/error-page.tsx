import Image from "next/image"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"

export default function ErrorPage() {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-[#0A0A0A] text-white p-4 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,#ffffff05,transparent)]" />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="flex justify-center mb-12">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Image
                            src="/placeholder.svg?height=40&width=40"
                            alt="Logo"
                            width={40}
                            height={40}
                            className="text-purple-500 filter drop-shadow-[0_0_10px_rgba(147,51,234,0.3)]"
                        />
                    </motion.div>
                </div>
                <div className="text-center mb-12 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-xl">
                    <motion.div 
                        className="flex justify-center mb-6"
                        animate={{ 
                            scale: [1, 1.02, 1],
                            rotate: [0, -1, 1, -1, 0]
                        }}
                        transition={{ 
                            duration: 4,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    >
                        <Image
                            src="/placeholder.svg?height=96&width=96"
                            alt="Network Error"
                            width={96}
                            height={96}
                            className="filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                        />
                    </motion.div>
                    <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                        Network Error
                    </h1>
                    <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
                        Unfortunately, there seems to be a problem with the network at the moment, please try again later
                    </p>
                    <motion.div 
                        className="flex items-center justify-center space-x-3"
                        whileHover={{ scale: 1.02 }}
                    >
                        <Avatar className="h-7 w-7 ring-2 ring-purple-500/20">
                            <AvatarImage src="/placeholder.svg" alt="User" />
                            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600">U</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-zinc-400 font-medium">folajinisayo.base.eth</span>
                    </motion.div>
                </div>
                <motion.div 
                    className="flex justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Button
                        variant="ghost"
                        className="text-red-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 px-6 py-2 rounded-xl"
                    >
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    )
}