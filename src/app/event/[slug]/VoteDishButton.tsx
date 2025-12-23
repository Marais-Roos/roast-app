'use client'

import { useState, useTransition, useEffect } from 'react'
import { voteDish } from './actions'
import { Plus } from 'lucide-react'

export function VoteDishButton({ 
  dishId, 
  eventId,
  hasVoted,
  votedDishId 
}: { 
  dishId: string
  eventId: string
  hasVoted: boolean
  votedDishId?: string
}) {
  const [isPending, startTransition] = useTransition()
  const [voted, setVoted] = useState(hasVoted)
  const [error, setError] = useState<string>('')
  const isThisDishVoted = votedDishId === dishId

  useEffect(() => {
    setVoted(hasVoted)
  }, [hasVoted])

  const handleVote = () => {
    if (voted) return
    
    startTransition(async () => {
      const result = await voteDish(dishId, eventId)
      
      if (result.success) {
        setVoted(true)
        // Store in localStorage as backup
        localStorage.setItem(`voted_event_${eventId}`, dishId)
      } else if (result.error) {
        setError(result.error)
      }
    })
  }

  return (
    <div>
      <button
        onClick={handleVote}
        disabled={isPending || voted}
        className={`cursor-pointer w-full py-3 rounded-lg font-bold transition flex items-center justify-center gap-2 ${
          isThisDishVoted
            ? 'bg-mint text-dark cursor-not-allowed'
            : voted 
            ? 'bg-gray-400 text-white cursor-not-allowed'
            : 'bg-gold text-dark hover:opacity-90'
        }`}
      >
        {isThisDishVoted ? (
          'Jou Stem ✓'
        ) : voted ? (
          'Reeds Gestem'
        ) : isPending ? (
          'Stem...'
        ) : (
          <>
            <Plus className="w-5 h-5" />
            <span>Stem</span>
          </>
        )}
      </button>
      {error && (
        <p className="text-red text-xs mt-1">{error}</p>
      )}
    </div>
  )
}
