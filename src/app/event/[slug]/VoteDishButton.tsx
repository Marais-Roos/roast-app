'use client'

import { useState, useTransition } from 'react'
import { voteDish } from './actions'

export function VoteDishButton({ dishId, currentCount }: { dishId: string; currentCount: number }) {
  const [isPending, startTransition] = useTransition()
  const [voted, setVoted] = useState(false)

  const handleVote = () => {
    if (voted) return
    
    startTransition(async () => {
      await voteDish(dishId)
      setVoted(true)
    })
  }

  return (
    <button
      onClick={handleVote}
      disabled={isPending || voted}
      className={`px-6 py-2 rounded-lg font-bold transition ${
        voted 
          ? 'bg-gray-400 text-white cursor-not-allowed'
          : 'bg-red text-white hover:opacity-90'
      }`}
    >
      {voted ? '✓ Voted' : isPending ? 'Voting...' : 'Vote Yikes!'}
    </button>
  )
}
