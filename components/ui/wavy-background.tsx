"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WavyBackgroundProps {
    children?: React.ReactNode;
    className?: string;
    waveColor?: string;
    backgroundFill?: string;
}

export const WavyBackground = ({
    children,
    className,
    waveColor = "#ff9a47",
    backgroundFill = "#ffffff",
}: WavyBackgroundProps) => {
    const waveRef = useRef<SVGPathElement>(null);

    return (
        <div className={cn("relative overflow-hidden", className)}>
            <svg
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="none"
                viewBox="0 0 1200 120"
                xmlns="http://www.w3.org/2000/svg"
            >
                <motion.path
                    ref={waveRef}
                    fill={waveColor}
                    d="M0,0 C200,40 500,0 800,35 C1000,60 1200,40 1200,0 L1200,120 L0,120 Z"
                    animate={{
                        d: [
                            "M0,0 C200,40 500,0 800,35 C1000,60 1200,40 1200,0 L1200,120 L0,120 Z",
                            "M0,0 C300,60 400,10 700,45 C900,70 1100,30 1200,0 L1200,120 L0,120 Z",
                            "M0,0 C200,40 500,0 800,35 C1000,60 1200,40 1200,0 L1200,120 L0,120 Z"
                        ]
                    }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 10,
                        ease: "easeInOut"
                    }}
                    opacity={0.2}
                />
                <motion.path
                    fill={waveColor}
                    d="M0,40 C150,20 350,70 600,50 C900,30 1050,80 1200,60 L1200,120 L0,120 Z"
                    animate={{
                        d: [
                            "M0,40 C150,20 350,70 600,50 C900,30 1050,80 1200,60 L1200,120 L0,120 Z",
                            "M0,60 C250,40 450,90 700,70 C900,50 1050,30 1200,40 L1200,120 L0,120 Z",
                            "M0,40 C150,20 350,70 600,50 C900,30 1050,80 1200,60 L1200,120 L0,120 Z"
                        ]
                    }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 8,
                        ease: "easeInOut"
                    }}
                    opacity={0.3}
                />
                <rect x="0" y="120" width="1200" height="120" fill={backgroundFill} />
            </svg>
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}; 