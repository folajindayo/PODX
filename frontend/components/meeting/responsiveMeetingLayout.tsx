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

    useEffect(() => {
        const handleResize = () => {
            setScreenSize({
                isSmall: window.innerWidth <= 640,
                isMedium: window.innerWidth > 640 && window.innerWidth <= 1024,
            });
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const MAX_VISIBLE_PARTICIPANTS = 30;
    const EARLY_JOINERS_LIMIT = 10;

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

    const getOptimalGroupSize = () => {
        const visibleCount = getVisibleParticipants().length;
        
        if (screenSize.isSmall) {
            if (visibleCount === 1) return 1;
            if (visibleCount === 2) return 2;
            return visibleCount <= 4 ? 4 : 6;
        }
        
        if (screenSize.isMedium) {
            if (visibleCount === 1) return 1;
            if (visibleCount === 2) return 2;
            if (visibleCount <= 4) return 4;
            return visibleCount <= 6 ? 6 : 9;
        }

        // Large screens
        if (visibleCount === 1) return 1;
        if (visibleCount === 2) return 2;
        if (visibleCount <= 4) return 4;
        if (visibleCount <= 6) return 6;
        return visibleCount <= 9 ? 9 : 12;
    };

    if (hasOngoingScreenShare || isSpeaker) {
        return (
            <div className="meeting-layout screen-share">
                <SpeakerLayout
                    participantsBarPosition={screenSize.isSmall ? "bottom" : "right"}
                    participantsBarLimit={screenSize.isSmall ? 2 : 4}
                    pageArrowsVisible={participants.length > (screenSize.isSmall ? 2 : 4)}
                    mirrorLocalParticipantVideo={true}
                    participantsBar={{
                        participants: getVisibleParticipants(),
                        gap: 8,
                        style: {
                            background: '#1E1E1E',
                            padding: '8px',
                            borderRadius: '12px',
                            margin: '8px'
                        }
                    }}
                />
            </div>
        );
    }

    return (
        <div className="meeting-layout grid-view">
            <GridLayout
                groupSize={getOptimalGroupSize()}
                mirrorLocalParticipantVideo={true}
                participantsBar={{
                    participants: getVisibleParticipants(),
                    gap: 12,
                    style: {
                        background: '#1E1E1E',
                        padding: '16px',
                        borderRadius: '12px'
                    }
                }}
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