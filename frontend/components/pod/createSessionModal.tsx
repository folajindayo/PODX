"use client";
import React, { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Mic, Video, CalendarIcon, Clock } from "lucide-react";
import { format, addDays, isBefore, startOfDay } from "date-fns";
import { sessionType } from "@/constants";
import SimpleTimePicker from "./simpleTimePicker";
import DotPattern from "../ui/dot-pattern";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface SessionCountProps {
    sessionCount: number;
}

interface CreateSessionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateSession: (title: string, type: sessionType, scheduledDate?: Date) => void;
    sessionCount: number; // Add this line
}

interface SessionFormState {
    title: string;
    type: sessionType;
    isScheduled: boolean;
    date?: Date;
    time?: string;
}

const getDefaultSessionTitle = (count: number) => `Session-${count + 1}`;

const CreateSessionModal: React.FC<CreateSessionModalProps> = ({ 
    isOpen, 
    onClose, 
    onCreateSession,
    sessionCount // Add this parameter
}) => {
    const [formState, setFormState] = useState<SessionFormState>({
        title: getDefaultSessionTitle(sessionCount),
        type: sessionType.POD,
        isScheduled: false,
        date: undefined,
        time: undefined,
    });
    
    useEffect(() => {
        if (formState.title === DEFAULT_SESSION_TITLE || formState.title.match(/^Session-\d+$/)) {
            updateFormState({ title: getDefaultSessionTitle(sessionCount) });
        }
    }, [sessionCount]);

    const [isCreating, setIsCreating] = useState(false);
    const [customTime, setCustomTime] = useState("");
    const [timeError, setTimeError] = useState("");

    // Memoized time slots for dropdown
    const timeSlots = React.useMemo(() => Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`), []);

    const validateTime = (time: string): boolean => {
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        return timeRegex.test(time);
    };

    const isDateTimeInPast = (date: Date, timeStr?: string): boolean => {
        if (!timeStr) return false;
        const [hours, minutes] = timeStr.split(":").map(Number);
        const dateWithTime = new Date(date);
        dateWithTime.setHours(hours, minutes, 0, 0);
        return isBefore(dateWithTime, new Date());
    };

    const handleTimeChange = (value: string) => {
        setCustomTime(value);
        setTimeError("");

        if (value === "") {
            updateFormState({ time: undefined });
            return;
        }

        if (validateTime(value)) {
            if (formState.date && isDateTimeInPast(formState.date, value)) {
                setTimeError("Cannot schedule for a past time");
                return;
            }
            updateFormState({ time: value });
        } else {
            setTimeError("Please enter time in HH:mm format");
        }
    };

    const handleTimeSelect = useCallback((value: string) => {
        if (!value.trim()) {
            setTimeError("");
            setCustomTime("");
            updateFormState({ time: undefined });
            return;
        }
    
        if (!validateTime(value)) {
            setTimeError("Invalid time format. Please use HH:mm");
            return;
        }
    
        if (formState.date && isDateTimeInPast(formState.date, value)) {
            setTimeError("Cannot schedule for a past time");
            setCustomTime(value);
            return;
        }
    
        // If all validations pass
        setCustomTime(value);
        updateFormState({ time: value });
        setTimeError("");
    }, [formState.date, updateFormState, validateTime, isDateTimeInPast]);

    const handleCreateSession = useCallback(async () => {
        if (!formState.title.trim()) {
            toast?.error("Please enter a session title");
            return;
        }
        if (formState.isScheduled && timeError) {
            toast?.error(timeError);
            return;
        }
    
        setIsCreating(true);
        try {
            let scheduledDate: Date | undefined;
    
            if (formState.isScheduled && formState.date && formState.time) {
                const [hours, minutes = 0] = formState.time.split(":").map(Number);
                scheduledDate = new Date(formState.date);
                scheduledDate.setHours(hours, minutes, 0, 0);
    
                // Additional validation for scheduled date
                if (scheduledDate < new Date()) {
                    toast?.error("Cannot schedule a session in the past");
                    return;
                }
            }
    
            await onCreateSession(formState.title, formState.type, scheduledDate);
            toast?.success("Session created successfully!");
            onClose();
        } catch (error) {
            toast?.error("Failed to create session. Please try again.");
            console.error("Session creation error:", error);
        } finally {
            setIsCreating(false);
        }
    }, [formState, onCreateSession, onClose, timeError, toast]);
    
    const updateFormState = useCallback((updates: Partial<SessionFormState>) => {
        setFormState((prev) => {
            const newState = { ...prev, ...updates };
            // Reset time error when changing schedule type
            if ('isScheduled' in updates) {
                setTimeError('');
            }
            return newState;
        });
    }, []);
    
    const isSubmitDisabled = useMemo(() => {
        if (isCreating) return true;
        if (!formState.title.trim()) return true;
        if (formState.isScheduled) {
            return !formState.date || !formState.time || !!timeError;
        }
        return false;
    }, [formState, isCreating, timeError]);

        return (
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="text-white rounded-[20px] p-[32px] w-full max-w-[500px] flex flex-col gap-[8px] bg-gradient-to-b from-[#1d1d1d] to-[#252525] overflow-hidden border border-white/5 shadow-xl">
                    <div className="absolute inset-0 bg-[#6032F6]/5 backdrop-blur-[2px] pointer-events-none" />
                    <DotPattern
                        width={20}
                        height={20}
                        cx={2}
                        cy={2}
                        cr={1}
                        className={cn(
                            "[mask-image:radial-gradient(to_bottom_right,white,transparent,transparent)] rounded-[20px] top-[6px] left-[8px] px-[10px] opacity-30"
                        )}
                    />
                    <DialogHeader className="flex flex-row justify-between items-center mb-8">
                        <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                            Create session
                        </DialogTitle>
                    </DialogHeader>
        
                    <div className="flex items-center gap-4 mb-8">
                        <Button
                            size="sm"
                            className={`rounded-full px-6 py-5 transition-all duration-300 ${
                                !formState.isScheduled 
                                    ? "bg-gradient-to-r from-[#6032F6] to-[#8B5CF6] hover:shadow-lg hover:shadow-[#6032F6]/20 hover:scale-105" 
                                    : "bg-[#2C2C2C]/50 border border-white/10 hover:bg-[#2C2C2C]/70"
                            }`}
                            onClick={() => updateFormState({ isScheduled: false })}
                        >
                            <span className="font-medium">Instant session</span>
                        </Button>
                        <Button
                            size="sm"
                            className={`rounded-full px-6 py-5 transition-all duration-300 ${
                                formState.isScheduled 
                                    ? "bg-gradient-to-r from-[#6032F6] to-[#8B5CF6] hover:shadow-lg hover:shadow-[#6032F6]/20 hover:scale-105" 
                                    : "bg-[#2C2C2C]/50 border border-white/10 hover:bg-[#2C2C2C]/70"
                            }`}
                            onClick={() => updateFormState({ isScheduled: true })}
                        >
                            <span className="font-medium">Schedule session</span>
                            <span className="ml-2 text-yellow-300 rounded-full px-2 py-0.5 text-xs bg-yellow-700/50 border border-yellow-600/30">
                                New
                            </span>
                        </Button>
                    </div>
        
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-white/60">Session title</label>
                            <Input
                                value={formState.title}
                                onChange={(e) => updateFormState({ title: e.target.value })}
                                className="w-full bg-[#2C2C2C]/50 rounded-xl px-4 py-3 border-white/5 focus:border-[#6032F6]/50 focus:ring-[#6032F6]/20 transition-all duration-200"
                                placeholder="Enter session title..."
                            />
                        </div>
        
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-white/60">Session type</label>
                            <Select value={formState.type} onValueChange={(value: sessionType) => updateFormState({ type: value })}>
                                <SelectTrigger className="w-full bg-[#2C2C2C]/50 rounded-xl px-4 py-3 border-white/5 focus:border-[#6032F6]/50 focus:ring-[#6032F6]/20 transition-all duration-200">
                                    <SelectValue>
                                        {formState.type === sessionType.AUDIO && (
                                            <Mic className="h-5 w-5 text-[#6032F6] mr-2 animate-pulse" />
                                        )}
                                        {formState.type === sessionType.POD && (
                                            <Video className="h-5 w-5 text-[#6032F6] mr-2 animate-pulse" />
                                        )}
                                        <span className="font-medium">{formState.type}</span>
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent className="bg-[#2C2C2C] border border-white/5 rounded-xl shadow-xl">
                                    <SelectItem value={sessionType.AUDIO} className="focus:bg-[#6032F6]/20 rounded-lg transition-colors">
                                        <div className="flex items-center space-x-2 py-1">
                                            <Mic className="h-5 w-5 text-[#6032F6]" />
                                            <span className="font-medium">Audio Session</span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value={sessionType.POD} className="focus:bg-[#6032F6]/20 rounded-lg transition-colors">
                                        <div className="flex items-center space-x-2 py-1">
                                            <Video className="h-5 w-5 text-[#6032F6]" />
                                            <span className="font-medium">Pod Session</span>
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                    {/* Date and Time Selection - Only shown when scheduled */}
                    {formState.isScheduled && (
                        <div>
                            <label className="block text-[#A3A3A3] mb-2">Date and time</label>
                            <div className="grid grid-cols-2 gap-4">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start text-left font-normal bg-[#2C2C2C] rounded-[10px] px-4 py-2 border-[#3c3c3c] hover:bg-[#3c3c3c]"
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4 text-[#6032F6]" />
                                            {formState.date ? format(formState.date, "PPP") : "Pick a date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 bg-[#2C2C2C]" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={formState.date}
                                            onSelect={(date) => {
                                                updateFormState({ date });
                                                setTimeError("");
                                            }}
                                            disabled={(date) => isBefore(date, startOfDay(new Date())) || date > addDays(new Date(), 30)}
                                            className="bg-[#2C2C2C] text-white"
                                        />
                                    </PopoverContent>
                                </Popover>

                                {/* New Time Picker */}
                                <SimpleTimePicker
                                    value={formState.time || ""}
                                    onChange={(newTime) => {
                                        if (formState.date && isDateTimeInPast(formState.date, newTime)) {
                                            setTimeError("Cannot schedule for a past time");
                                            return;
                                        }
                                        updateFormState({ time: newTime });
                                        setTimeError("");
                                    }}
                                    error={timeError}
                                />
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-between gap-6 pt-3">
                        <Button onClick={onClose} className="w-1/2 px-4 py-6 bg-[#2C2C2C] hover:bg-[#3C3C3C]">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleCreateSession}
                            disabled={isSubmitDisabled}
                            className="w-1/2 px-4 py-6 bg-[#6032F6] hover:bg-[#6D28D9] disabled:bg-gray-500"
                        >
                            {isCreating ? "Creating..." : "Create session"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default React.memo(CreateSessionModal);