'use client'

import { useEffect, useState } from 'react'

interface GreetingProps {
  firstName: string
}

export function Greeting({ firstName }: GreetingProps) {
  const [greeting, setGreeting] = useState('Good morning')

  useEffect(() => {
    const hour = new Date().getHours()
    
    if (hour >= 5 && hour < 12) {
      setGreeting('Good morning')
    } else if (hour >= 12 && hour < 17) {
      setGreeting('Good afternoon')
    } else if (hour >= 17 && hour < 21) {
      setGreeting('Good evening')
    } else {
      setGreeting('Good night')
    }
  }, [])

  return (
    <h1 className="font-display font-bold text-3xl sm:text-4xl text-text-1">
      {greeting}, {firstName}!
    </h1>
  )
}
