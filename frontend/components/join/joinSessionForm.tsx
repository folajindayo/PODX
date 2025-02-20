import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, CheckCircle2, LogIn, Loader2 } from "lucide-react";

const JoinSessionForm: React.FC = () => {
    const [name, setName] = useState("");
    const [isBasenameConfirmed, setIsBasenameConfirmed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleJoinSession = async () => {
        if (!name.trim()) {
            setError("Please enter your name");
            return;
        }
        setError("");
        setIsLoading(true);
        try {
            // Implement join session logic here
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
        } catch (err) {
            setError("Failed to join session. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md space-y-6 bg-black/20 p-6 rounded-xl backdrop-blur-sm">
            <div className="space-y-4">
                <label htmlFor="name" className="block text-lg font-medium text-gray-200">
                    What shall we call you?
                </label>
                <Input 
                    id="name" 
                    type="text" 
                    value={name} 
                    onChange={(e) => {
                        setName(e.target.value);
                        setError("");
                    }} 
                    className="w-full bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    placeholder="Enter your name"
                    disabled={isLoading}
                />
                {error && (
                    <p className="text-red-400 text-sm">{error}</p>
                )}
            </div>

            {isBasenameConfirmed ? (
                <div className="flex items-center text-green-400 text-sm p-3 bg-green-500/10 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    <p>Basename confirmed</p>
                </div>
            ) : (
                <div className="flex items-start text-[#DDB958] text-sm p-3 bg-[#DDB958]/10 rounded-lg">
                    <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                    <p>For better experience, connect your wallet and get a base name</p>
                </div>
            )}

            <Button 
                className={`w-full h-12 text-base font-medium transition-all duration-200 ${
                    isLoading 
                        ? 'bg-[#DDB958]/70' 
                        : 'bg-[#DDB958] hover:bg-[#DDB958]/90'
                } text-black`} 
                onClick={handleJoinSession}
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Joining...
                    </>
                ) : (
                    <>
                        <LogIn className="w-5 h-5 mr-2" />
                        Join session
                    </>
                )}
            </Button>
        </div>
    );
};

export default JoinSessionForm;