"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import { cn } from "@/lib/utils";

interface SparklesProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

export const Sparkles = ({ children, className, id }: SparklesProps) => {
    const generateSparkle = () => {
        return {
            id: Math.random().toString(36).substring(2),
            createdAt: Date.now(),
            color: randomColor(),
            size: Math.random() * 10 + 10,
            style: {
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                zIndex: 2,
            },
        };
    };

    const colors = ["#FFD700", "#FFA500", "#FF4500", "#FF6347", "#FF8C00"];
    const randomColor = () => colors[Math.floor(Math.random() * colors.length)];

    const [sparkles, setSparkles] = useState<any[]>([]);

    useEffect(() => {
        const sparkleInterval = setInterval(() => {
            const now = Date.now();
            const newSparkle = generateSparkle();

            // Clean up old sparkles
            setSparkles((currentSparkles) => {
                const filtered = currentSparkles.filter(
                    (sparkle) => now - sparkle.createdAt < 1000
                );
                return [...filtered, newSparkle];
            });
        }, 300);

        return () => clearInterval(sparkleInterval);
    }, []);

    return (
        <span className={cn("relative inline-block", className)} id={id}>
            {sparkles.map((sparkle) => (
                <Sparkle
                    key={sparkle.id}
                    color={sparkle.color}
                    size={sparkle.size}
                    style={sparkle.style}
                />
            ))}
            <span className="relative z-10">{children}</span>
        </span>
    );
};

const Sparkle = ({ color, size, style }: any) => {
    const path =
        "M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 71 34 71C34 71 35.8193 50.7065 43.5 43.5C51.6435 35.836 71 34 71 34C71 34 51.6947 32.0939 43.5 25.5C36.5605 20.2731 34 0 34 0C34 0 32.6591 19.9706 26.5 25.5Z";

    return (
        <motion.svg
            width={size}
            height={size}
            viewBox="0 0 68 68"
            style={style}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute"
            initial={{ scale: 0, rotate: 0 }}
            animate={{
                scale: [0, 1, 0],
                rotate: [0, 360],
            }}
            transition={{
                duration: 1,
                ease: "easeInOut",
            }}
        >
            <path d={path} fill={color} />
        </motion.svg>
    );
}; 