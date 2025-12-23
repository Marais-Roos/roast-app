'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Vote, Pencil } from 'lucide-react'
import { DeleteDishButton } from './DeleteDishButton'
import { updateDish } from './actions'

export function DishCard({ 
  dish, 
  eventSlug 
}: { 
  dish: { 
    id: string
    dish_name: string
    chef_name: string
    image_url: string | null
    yikes_count: number | null
  }
  eventSlug: string
}) {
  const [isEditing, setIsEditing] = useState(false)

  if (isEditing) {
    return (
      <div className="bg-dark border-2 border-white/20 rounded-xl shadow-lg p-4">
        <h3 className="font-bold text-lg text-white mb-4">Edit Dish</h3>
        <form action={async (formData: FormData) => {
          await updateDish(dish.id, eventSlug, formData)
          setIsEditing(false)
        }}>
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-1">
              <span className="font-bold text-sm text-white">Dish Name</span>
              <input
                name="dish_name"
                type="text"
                required
                defaultValue={dish.dish_name}
                className="bg-dark text-white border-2 border-white/20 p-2 rounded-lg focus:border-yellow outline-none"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-bold text-sm text-white">Chef Name</span>
              <input
                name="chef_name"
                type="text"
                required
                defaultValue={dish.chef_name}
                className="bg-dark text-white border-2 border-white/20 p-2 rounded-lg focus:border-yellow outline-none"
              />
            </label>

            <input type="hidden" name="image_url" value={dish.image_url || ''} />

            <div className="flex gap-2">
              <button
                type="submit"
                className="cursor-pointer bg-gold text-dark px-4 py-2 rounded-lg hover:opacity-90 transition font-bold flex-1"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="cursor-pointer bg-gray-400 text-white px-4 py-2 rounded-lg hover:opacity-90 transition font-bold flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="bg-dark border-2 border-white/20 rounded-xl shadow-lg overflow-hidden p-4 md:p-5 lg:p-6">
      {dish.image_url && (
        <div className='relative aspect-3/4 w-full overflow-hidden rounded-lg mb-4'>
          <Image
            src={dish.image_url} 
            alt={dish.dish_name}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-headings font-bold text-xl md:text-2xl lg:text-3xl text-white">{dish.dish_name}</h3>
            <p className="text-sm text-white/60">{dish.chef_name}</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsEditing(true)}
              className=" cursor-pointer p-2 bg-gold rounded-lg hover:opacity-90 transition"
            >
              <Pencil className="w-4 h-4 text-white" />
            </button>
            <DeleteDishButton dishId={dish.id} dishName={dish.dish_name} eventSlug={eventSlug} />
          </div>
        </div>
        <div className="flex items-center gap-1 text-yellow font-bold text-lg">
          <Vote className="w-5 h-5"/>
          <span>{dish.yikes_count || 0} Stemme</span>
        </div>
      </div>
    </div>
  )
}
