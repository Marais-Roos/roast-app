'use client'

import { deleteEvent } from '@/app/dashboard/actions'
import { Trash2 } from 'lucide-react'

export function DeleteEventButton({ eventId, eventSlug, eventName }: { eventId: string; eventSlug: string; eventName: string }) {
  return (
    <form action={deleteEvent.bind(null, eventId, eventSlug)}>
      <button
        type="submit"
        onClick={(e) => {
          if (!confirm(`Are you sure you want to delete "${eventName}"? This will also delete all dishes.`)) {
            e.preventDefault()
          }
        }}
        className="bg-red/20 text-red px-4 py-2 rounded-lg hover:opacity-90 transition border-[0.5] border-red cursor-pointer"
      >
        <Trash2 className="w-4 h-4 inline-block mr-2" />
        Verwyder
      </button>
    </form>
  )
}
