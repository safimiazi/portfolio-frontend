import { useState, useEffect } from 'react';

const LoadingComponent = () => {
    // Portfolio-specific loading messages
    const messages = [
        'Loading Portfolio...',
        'Fetching Projects...',
        'Building Experience Showcase...',
        'Crafting Skills Display...',
        'Preparing Contact Info...',
        'Polishing UI...',
    ];

    const [currentMessage, setCurrentMessage] = useState(messages[0]);

    // Cycle through messages every 2.5 seconds for smoother pacing
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessage((prev) => {
                const currentIndex = messages.indexOf(prev);
                const nextIndex = (currentIndex + 1) % messages.length;
                return messages[nextIndex];
            });
        }, 2500);

        return () => clearInterval(interval);
    }, [messages]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-primary py-20">
            <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 border-4 border-t-transparent border-primary rounded-full animate-[spin_2s_linear_infinite]"></div>
                <div className="absolute inset-3 border-4 border-t-transparent border-primary/70 rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                        className="w-10 h-10 text-primary animate-pulse"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                    </svg>
                </div>
            </div>
            <div className="text-xl font-mono text-primary animate-[fadeIn_1s_ease-in-out]">
                {currentMessage}
            </div>
        </div>
    );
};

export default LoadingComponent;