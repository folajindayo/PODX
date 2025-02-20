"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Mic, MicOff } from "lucide-react";

interface VideoPreviewProps {
    isMuted: boolean;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ isMuted }) => (
    <div className="bg-gradient-to-b from-[#1E1E1E] to-[#252525] rounded-[10px] overflow-hidden mb-6 shadow-lg transition-transform duration-300 hover:scale-[1.02]">
        <div className="relative aspect-video group">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
            <Image
                src="/images/woman.png"
                alt="Video preview"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                width={640}
                height={360}
                priority
            />
            {isMuted ? (
                <div className="absolute top-2 left-2 bg-red-500/90 backdrop-blur-sm text-white text-xs py-1.5 px-3 rounded-full flex items-center gap-1.5 shadow-lg">
                    <MicOff className="w-3.5 h-3.5" />
                    <span className="font-medium">Muted</span>
                </div>
            ) : (
                <div className="absolute top-2 left-2 bg-[#6032F6]/90 backdrop-blur-sm text-white text-xs py-1.5 px-3 rounded-full flex items-center gap-1.5 shadow-lg">
                    <div className="relative">
                        <div className="absolute inset-0 bg-white/50 rounded-full animate-ping" />
                        <div className="w-2 h-2 bg-white rounded-full relative" />
                    </div>
                    <Mic className="w-3.5 h-3.5" />
                    <span className="font-medium">Speaking...</span>
                </div>
            )}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
    </div>
);

export default VideoPreview;