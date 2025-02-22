// ... existing imports ...
import { useState, useEffect } from "react";

interface ResponsiveMeetingLayoutProps {
    hasOngoingScreenShare: boolean;
    isSpeaker: boolean;
    participants: StreamVideoParticipant[];
}

const ResponsiveMeetingLayout: React.FC<ResponsiveMeetingLayoutProps> = ({ hasOngoingScreenShare, isSpeaker, participants }) => {
    // ... existing screen size state ...

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

    // ... existing screen share and speaker conditions ...

    return (
        <div className="w-full h-full">
            <PaginatedGridLayout
                groupSize={getOptimalGroupSize()}
                mirrorLocalParticipantVideo={true}
                pageArrowsVisible={participants.length > getOptimalGroupSize()}
                className="meeting-layout grid-view"
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