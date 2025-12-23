'use client'

import { Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function EditDishButton({ dishId, eventSlug }: { dishId: string; eventSlug: string }) {
  const router = useRouter()
  
  const handleEdit = () => {
    router.push(`/event/${eventSlug}/manage?editing-dish=${dishId}`)
  }
  
  return (
    <button
      onClick={handleEdit}
      className="p-2 bg-gold rounded-lg hover:opacity-90 transition"
    >
      <Pencil className="w-4 h-4 text-white" />
    </button>
  )
}
