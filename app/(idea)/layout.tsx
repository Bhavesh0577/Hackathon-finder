import { Orbitron } from 'next/font/google';
import React from 'react'

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Add desired weights
  display: "swap",
});

interface IdeaLayoutProps{
    children : React.ReactNode
}

const IdeaLayout = ({children}:IdeaLayoutProps) => {
  return (
    <div className={`font-obitron ${orbitron.variable}`}>
        {children}
    </div>
  )
}

export default IdeaLayout