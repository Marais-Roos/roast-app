'use client'

import { useState, useTransition } from 'react'
import { voteDish } from './actions'
import { Plus } from 'lucide-react'

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
      className={`w-full py-3 rounded-lg font-bold transition flex items-center justify-center gap-2 ${
        voted 
          ? 'bg-gray-400 text-white cursor-not-allowed'
          : 'bg-gold text-dark hover:opacity-90'
      }`}
    >
      {voted ? (
        'Gestem'
      ) : isPending ? (
        'Stem...'
      ) : (
        <>
          <Plus className="w-5 h-5" />
          <span>Stem</span>
        </>
      )}
    </button>
  )
}
