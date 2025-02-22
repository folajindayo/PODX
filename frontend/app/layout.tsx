import type { Metadata } from "next";
import localFont from "next/font/local";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "stream-chat-react/dist/css/v2/index.css";
import "./globals.css";
import '@/styles/meeting.css';

// Providers
import StoreProvider from "@/providers/storeProvider";
import PrivyProvider from "@/providers/privyProvider";
import AppProvider from "@/providers/appProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Components
import { Toaster } from "react-hot-toast";
import { AlertCircle, CheckCircle2, DollarSign } from "lucide-react";

// Font configurations
const clashGroteskRegular = localFont({
    src: "./fonts/ClashGrotesk-Regular.woff",
    variable: "--font-clashgrotesk-sans",
    weight: "100 900",
    display: "swap",
});

const clashgroteskMedium = localFont({
    src: "./fonts/ClashGrotesk-Medium.woff",
    variable: "--font-clashgrotesk-mono",
    weight: "100 900",
    display: "swap",
});

// Enhanced metadata
export const metadata: Metadata = {
    title: "Pod X - Real-time Video Meetings on Chain",
    description: "Real-time meetings by Podx on chain Using your browser, share your video, desktop.",
    keywords: ["video meetings", "blockchain", "real-time", "desktop sharing"],
    authors: [{ name: "Pod X Team" }],
    viewport: "width=device-width, initial-scale=1",
    themeColor: "#6032f6",
};

// Toast styles configuration
const toastStyles = {
    success: {
        icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
        style: {
            background: "#1E1E1E",
            color: "#FFFFFF",
            border: "1px solid #22C55E",
            borderRadius: "12px",
            padding: "16px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        },
    },
    error: {
        icon: <AlertCircle className="w-5 h-5 text-red-500" />,
        style: {
            background: "#1E1E1E",
            color: "#FFFFFF",
            border: "1px solid #EF4444",
            borderRadius: "12px",
            padding: "16px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        },
    },
    loading: {
        icon: <DollarSign className="w-5 h-5 text-[#DDB958] animate-pulse" />,
        style: {
            background: "#1E1E1E",
            color: "#FFFFFF",
            border: "1px solid #EAB308",
            borderRadius: "12px",
            padding: "16px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AppProvider>
            <html lang="en" className="dark">
                <body 
                    className={`
                        ${clashGroteskRegular.variable} 
                        ${clashgroteskMedium.variable} 
                        antialiased 
                        min-h-screen 
                        bg-gradient-to-b 
                        from-background 
                        to-background/95
                    `}
                >
                    <StoreProvider>
                        <PrivyProvider>
                            {children}
                            <Toaster
                                position="bottom-right"
                                toastOptions={toastStyles}
                                containerStyle={{
                                    bottom: 40,
                                    right: 40,
                                    gap: '1rem',
                                }}
                            />
                            <SpeedInsights />
                        </PrivyProvider>
                    </StoreProvider>
                </body>
            </html>
        </AppProvider>
    );
}