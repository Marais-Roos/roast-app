'use client'

import { deleteDish } from './actions'

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
        className="text-red-600 hover:text-red-800 text-sm font-bold"
      >
        Delete
      </button>
    </form>
  )
}
