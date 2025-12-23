'use client'

import { deleteDish } from './actions'
import { Trash2 } from 'lucide-react'

export function DeleteDishButton({ dishId, dishName, eventSlug }: { dishId: string; dishName: string; eventSlug: string }) {
  return (
    <form action={deleteDish.bind(null, dishId, eventSlug)}>
      <button
        type="submit"
        onClick={(e) => {
          if (!confirm(`Delete "${dishName}"?`)) {
            e.preventDefault()
          }
        }}
        className="cursor-pointer p-2 bg-red rounded-lg hover:opacity-90 transition"
      >
        <Trash2 className="w-4 h-4 text-white" />
      </button>
    </form>
  )
}
