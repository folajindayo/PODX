import React, { useState, useEffect } from "react";
import {
    SpeakerLayout,
    PaginatedGridLayout as GridLayout,
    StreamVideoParticipant
} from "@stream-io/video-react-sdk";

interface ResponsiveMeetingLayoutProps {
    hasOngoingScreenShare: boolean;
    isSpeaker: boolean;
    participants: StreamVideoParticipant[];
}
const ResponsiveMeetingLayout: React.FC<ResponsiveMeetingLayoutProps> = ({ 
    hasOngoingScreenShare, 
    isSpeaker, 
    participants 
}) => {
    const [screenSize, setScreenSize] = useState({
        isSmall: false,
        isMedium: false,
    });

    // Handle responsive breakpoints with resize listener
    useEffect(() => {
        const handleResize = () => {
            setScreenSize({
                isSmall: window.innerWidth <= 640,
                isMedium: window.innerWidth > 640 && window.innerWidth <= 1024,
            });
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const MAX_VISIBLE_PARTICIPANTS = 30;
    const EARLY_JOINERS_LIMIT = 10;

    // Calculate visible and summarized participants
    const getVisibleParticipants = () => {
        if (participants.length <= MAX_VISIBLE_PARTICIPANTS) {
            return participants;
        }
        return participants.slice(0, EARLY_JOINERS_LIMIT);
    };

    const getSummarizedCount = () => {
        if (participants.length <= MAX_VISIBLE_PARTICIPANTS) {
            return 0;
        }
        return participants.length - EARLY_JOINERS_LIMIT;
    };

    // Modified getOptimalGroupSize to consider summarized view
    const getOptimalGroupSize = () => {
        const visibleCount = getVisibleParticipants().length;
        
        if (screenSize.isSmall) {
            return visibleCount <= 2 ? 2 : 4;
        }
        
        if (screenSize.isMedium) {
            if (visibleCount <= 2) return 2;
            if (visibleCount <= 6) return 6;
            return 8;
        }

        if (visibleCount <= 2) return 2;
        if (visibleCount <= 9) return 9;
        return 12;
    };

    if (hasOngoingScreenShare || isSpeaker) {
        return (
            <div className="meeting-layout screen-share">
                <SpeakerLayout
                    participantsBarPosition={screenSize.isSmall ? "bottom" : "right" as const}
                    mirrorLocalParticipantVideo={true}
                    pageArrowsVisible={participants.length > (screenSize.isSmall ? 2 : 4)}
                    participantBarWidth={screenSize.isSmall ? "100%" : "25%"}
                    participants={getVisibleParticipants()}
                    participantsBarHeight={screenSize.isSmall ? "30%" : "auto"} // Add this line
                    participantsBarGap={8} // Add this line
                />
            </div>
        );
    }

    return (
        <div className="meeting-layout grid-view">
            <GridLayout
                groupSize={getOptimalGroupSize()}
                mirrorLocalParticipantVideo={true}
                participants={getVisibleParticipants()}
            />
            {getSummarizedCount() > 0 && (
                <div className="participant-summary">
                    +{getSummarizedCount()}
                </div>
            )}
        </div>
    );

};


export default ResponsiveMeetingLayout;