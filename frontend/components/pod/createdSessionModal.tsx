"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, AlertCircle, Check, Loader2, Copy, X } from "lucide-react";

interface CreatedSessionModalProps {
    isOpen: boolean;
    onClose: () => void;
    inviteLink: string;
    sessionCode: string;
    isJoining: boolean;
    onJoinSession: () => void;
    scheduledTime?: string;
}

const CreatedSessionModal: React.FC<CreatedSessionModalProps> = ({
    isOpen,
    onClose,
    inviteLink,
    sessionCode,
    isJoining,
    onJoinSession
}) => {
    const [linkCopied, setLinkCopied] = useState(false);
    const [codeCopied, setCodeCopied] = useState(false);
    const [isCopyingLink, setIsCopyingLink] = useState(false);
    const [isCopyingCode, setIsCopyingCode] = useState(false);
    const [isJoiningInternal, setIsJoiningInternal] = useState(false);

    useEffect(() => {
        setIsJoiningInternal(isJoining);
    }, [isJoining]);

    const handleJoinSession = async () => {
        setIsJoiningInternal(true);
        try {
            await onJoinSession();
        } catch (error) {
            console.error("Join session error:", error);
            setIsJoiningInternal(false);
        }
    };

    const copyToClipboard = async (text: string, isCopyingLink: boolean) => {
        if (isCopyingLink) {
            setIsCopyingLink(true);
        } else {
            setIsCopyingCode(true);
        }

        try {
            await navigator.clipboard.writeText(text);
            if (isCopyingLink) {
                setLinkCopied(true);
                setTimeout(() => setLinkCopied(false), 2000);
            } else {
                setCodeCopied(true);
                setTimeout(() => setCodeCopied(false), 2000);
            }
        } catch (error) {
            console.error("Failed to copy text: ", error);
        } finally {
            if (isCopyingLink) {
                setIsCopyingLink(false);
            } else {
                setIsCopyingCode(false);
            }
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-gradient-to-b from-[#1E1E1E] to-[#252525] text-white rounded-[10px] p-6 w-full max-w-md border border-[#2C2C2C]/50 shadow-xl">
                <DialogHeader className="relative mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#6032F6]/10 flex items-center justify-center mb-4 mx-auto">
                        <Link className="w-6 h-6 text-[#6032F6]" />
                    </div>
                    <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-[#6032F6] to-[#8B5CF6] text-transparent bg-clip-text">
                        Your session is created
                    </DialogTitle>
                    <Button
                        onClick={onClose}
                        className="absolute -right-2 -top-2 h-8 w-8 rounded-full p-0 hover:bg-[#6032F6]/20"
                        variant="ghost"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </DialogHeader>

                <div className="space-y-6">
                    <div className="space-y-3">
                        <label className="text-[#A3A3A3] flex items-center text-sm font-medium">
                            <Link className="w-4 h-4 mr-2 text-[#6032F6]" />
                            Share invite link
                        </label>
                        <div className="flex gap-3">
                            <div className="flex-1 relative group">
                                <Input
                                    type="text"
                                    value={inviteLink}
                                    readOnly
                                    className="w-full bg-[#2C2C2C]/50 border-[#6032F6]/20 rounded-lg px-4 py-2.5 text-sm focus:ring-2 ring-[#6032F6]/30 transition-all duration-200"
                                />
                                <div className="absolute inset-0 bg-[#6032F6]/5 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-200" />
                            </div>
                            <Button
                                onClick={() => copyToClipboard(inviteLink, true)}
                                className={`min-w-[100px] bg-[#6032F6] hover:bg-[#4C28C4] text-white transition-all duration-200 ${
                                    linkCopied ? 'bg-green-500 hover:bg-green-600' : ''
                                }`}
                                disabled={isCopyingLink}
                            >
                                {isCopyingLink ? (
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                ) : linkCopied ? (
                                    <Check className="w-4 h-4 mr-2" />
                                ) : (
                                    <Copy className="w-4 h-4 mr-2" />
                                )}
                                {isCopyingLink ? "Copying..." : linkCopied ? "Copied!" : "Copy Link"}
                            </Button>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[#2C2C2C]" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-4 text-sm text-[#A3A3A3] bg-[#1E1E1E]">OR</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[#A3A3A3] text-sm font-medium">Session code</label>
                        <div className="flex gap-3">
                            <div className="flex-1 relative group">
                                <Input
                                    type="text"
                                    value={sessionCode}
                                    readOnly
                                    className="w-full bg-[#2C2C2C]/50 border-[#6032F6]/20 rounded-lg px-4 py-2.5 text-sm focus:ring-2 ring-[#6032F6]/30 font-mono transition-all duration-200"
                                />
                                <div className="absolute inset-0 bg-[#6032F6]/5 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-200" />
                            </div>
                            <Button
                                onClick={() => copyToClipboard(sessionCode, false)}
                                className={`min-w-[100px] bg-[#6032F6] hover:bg-[#4C28C4] text-white transition-all duration-200 ${
                                    codeCopied ? 'bg-green-500 hover:bg-green-600' : ''
                                }`}
                                disabled={isCopyingCode}
                            >
                                {isCopyingCode ? (
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                ) : codeCopied ? (
                                    <Check className="w-4 h-4 mr-2" />
                                ) : (
                                    <Copy className="w-4 h-4 mr-2" />
                                )}
                                {isCopyingCode ? "Copying..." : codeCopied ? "Copied!" : "Copy"}
                            </Button>
                        </div>
                    </div>

                    <Button
                        onClick={handleJoinSession}
                        className="w-full bg-[#6032F6] hover:bg-[#4C28C4] text-white py-6 font-medium
                                 rounded-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50
                                 disabled:hover:scale-100 shadow-lg hover:shadow-[#6032F6]/20"
                        disabled={isJoiningInternal}
                    >
                        {isJoiningInternal ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Joining Session...
                            </>
                        ) : (
                            "Join Session Now"
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CreatedSessionModal;