'use client'

import { deleteEvent } from '@/app/dashboard/actions'

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
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
      >
        Delete
      </button>
    </form>
  )
}
