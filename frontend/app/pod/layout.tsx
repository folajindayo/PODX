"use client";
import React, { useEffect, useState, memo } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { LoadingOverlay } from "@/components/ui/loading";
import { ErrorBoundary } from "@/components/pod/errorBoundary";
import nextDynamic from "next/dynamic";

interface LayoutProps {
    children: ReactNode;
    params: {
        id?: string;
    };
}

const DynamicMeetProvider = nextDynamic(
    () => import("@/providers/meetProvider/index"),
    {
        ssr: false,
        loading: () => (
            <div className="min-h-screen bg-[#121212] flex items-center justify-center">
                <LoadingOverlay 
                    text="Preparing your session..." 
                    className="animate-fade-in"
                />
            </div>
        ),
    }
);

const ErrorFallback = () => (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-white text-center p-6 rounded-lg bg-red-500/10 border border-red-500/20">
            <h2 className="text-xl font-semibold mb-2">Session Error</h2>
            <p>Failed to load meeting. Please try again.</p>
        </div>
    </div>
);

const LayoutContent = memo<LayoutProps>(({ children, params }) => {
    const { id } = useParams();
    const router = useRouter();
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    const meetingId = id as string | undefined;

    useEffect(() => {
        if (isMounted) {
            const isValidMeetingId = meetingId ? 
                /^[a-z]{3}-[a-z]{4}-[a-z]{3}$/.test(meetingId) : 
                true;

            if (pathname !== "/pod" && !pathname.startsWith("/pod/join") && !isValidMeetingId) {
                console.warn("Invalid meeting ID detected. Redirecting to /pod");
                router.replace("/pod");
            }
        }
    }, [isMounted, meetingId, pathname, router]);

    if (!isMounted) return null;

    return (
        <div className="max-h-screen bg-[#121212] overflow-hidden">
            <ErrorBoundary fallback={<ErrorFallback />}>
                <DynamicMeetProvider 
                    meetingId={meetingId} 
                    language="en"
                >
                    {children}
                </DynamicMeetProvider>
            </ErrorBoundary>
        </div>
    );
});

LayoutContent.displayName = "LayoutContent";

export default function Layout(props: LayoutProps) {
    return <LayoutContent {...props} />;
}