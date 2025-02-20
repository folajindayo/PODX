import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, Tag, X } from "lucide-react";
import { format } from "date-fns";

interface ScheduledMeetDialogProps {
    isOpen: boolean;
    onClose: () => void;
    sessionTitle: string;
    startTime: string;
    creator?: {
      id: string;
      name: string;
      username: string;
    };
    type: string;
    sessionId: string;
    createdAt: string;
}

const InfoRow = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
    <div className="flex items-center gap-3 text-sm group hover:bg-white/5 p-2 rounded-lg transition-all duration-200">
        <Icon className="w-4 h-4 text-[#6032F6] group-hover:scale-110 transition-transform duration-200" />
        <span className="text-[#A3A3A3] min-w-[60px]">{label}:</span>
        <span className="text-white font-medium">{value}</span>
    </div>
);
  
  const ScheduledMeetDialog: React.FC<ScheduledMeetDialogProps> = ({
    isOpen,
    onClose,
    sessionTitle,
    startTime,
    creator,
    type,
    sessionId,
    createdAt
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-gradient-to-b from-[#1E1E1E] to-[#252525] text-white rounded-[10px] p-6 w-full max-w-md border border-[#2C2C2C]/50 shadow-xl backdrop-blur-sm">
                <DialogHeader>
                    <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-[#2C2C2C] flex items-center justify-center mb-4 mx-auto group hover:bg-[#6032F6]/10 transition-all duration-300">
                            <Calendar className="w-6 h-6 text-[#6032F6] group-hover:scale-110 transition-transform duration-200" />
                        </div>
                        <Button
                            onClick={onClose}
                            className="absolute -right-2 -top-2 h-8 w-8 rounded-full p-0 hover:bg-[#6032F6]/20"
                            variant="ghost"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                    <DialogTitle className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-[#6032F6] to-[#8B5CF6] text-transparent bg-clip-text">
                        Scheduled Meeting
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    <div className="text-center space-y-3 bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                        <p className="text-[#A3A3A3] text-sm">The meeting you're trying to join is scheduled for:</p>
                        <p className="text-xl font-semibold mb-1 break-words">{sessionTitle}</p>
                        <p className="text-[#6032F6] font-medium bg-[#6032F6]/10 py-2 px-4 rounded-full inline-block">
                            {format(new Date(startTime), "PPP 'at' p")}
                        </p>
                    </div>

                    <div className="bg-[#2C2C2C]/50 p-4 rounded-lg space-y-2 backdrop-blur-sm">
                        {creator && <InfoRow icon={User} label="Host" value={creator.username || creator.name} />}
                        {type && <InfoRow icon={Tag} label="Type" value={type} />}
                        {createdAt && <InfoRow icon={Clock} label="Created" value={format(new Date(createdAt), "MMM d, yyyy")} />}
                        {sessionId && (
                            <div className="text-xs text-[#A3A3A3] mt-4 pt-4 border-t border-white/10">
                                Meeting ID: <span className="font-mono text-white/70">{sessionId}</span>
                            </div>
                        )}
                    </div>

                    <div className="pt-2">
                        <Button
                            onClick={onClose}
                            className="w-full bg-[#6032F6] hover:bg-[#4C28C4] text-white font-medium
                                     rounded-[10px] py-6 transition-all duration-200 hover:scale-[1.02]
                                     shadow-lg hover:shadow-[#6032F6]/20"
                        >
                            Back to Pod
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ScheduledMeetDialog;