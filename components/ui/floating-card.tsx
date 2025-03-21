"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingCardProps {
    children: React.ReactNode;
    className?: string;
}

export const FloatingCard = ({
    children,
    className,
}: FloatingCardProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const card = ref.current;
        const rect = card.getBoundingClientRect();

        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;

        const mouseX = e.clientX - cardCenterX;
        const mouseY = e.clientY - cardCenterY;

        // Calculate rotation (limit tilt to 10 degrees)
        const rotateY = (mouseX / (rect.width / 2)) * 5;
        const rotateX = -(mouseY / (rect.height / 2)) * 5;

        setRotateX(rotateX);
        setRotateY(rotateY);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <motion.div
            ref={ref}
            className={cn(
                "relative rounded-xl bg-white p-6 shadow-md dark:bg-slate-900",
                className
            )}
            style={{
                transformStyle: "preserve-3d",
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transition: "transform 0.2s ease-out",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.02 }}
        >
            <div
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-400/20 to-amber-400/20"
                style={{
                    transform: "translateZ(-10px)",
                    filter: "blur(20px)",
                }}
            />
            {children}
        </motion.div>
    );
}; 