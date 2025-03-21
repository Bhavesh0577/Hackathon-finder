"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const AnimatedBackground = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", updateMousePosition);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
        };
    }, []);

    const variants = {
        default: {
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,214,170,0.15), transparent 80%)`,
        },
    };

    return (
        <motion.div
            className={`h-full w-full bg-gradient-to-br from-orange-100 to-orange-50 dark:from-gray-900 dark:to-gray-950 ${className}`}
            variants={variants}
            animate="default"
            transition={{ type: "spring", stiffness: 100, damping: 30 }}
        >
            {children}
        </motion.div>
    );
}; 