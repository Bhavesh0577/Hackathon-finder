import React from 'react'

interface HackathonLayoutProps{
    children:React.ReactNode
}

const HackathonLayout = ({children}:HackathonLayoutProps) => {
  return (
    <div>
        {children}
    </div>
  )
}

export default HackathonLayout