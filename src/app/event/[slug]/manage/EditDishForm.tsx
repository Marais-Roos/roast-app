'use client'

import { useState, useRef } from 'react'
import { uploadDishImage, updateDish } from './actions'
import Image from 'next/image'
import Link from 'next/link'

export function EditDishForm({ 
  dishId, 
  dishName,
  chefName,
  currentImageUrl,
  eventSlug 
}: { 
  dishId: string
  dishName: string
  chefName: string
  currentImageUrl: string | null
  eventSlug: string
}) {
  const [imageUrl, setImageUrl] = useState<string>(currentImageUrl || '')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError('')

    const formData = new FormData()
    formData.append('image', file)

    try {
      const result = await uploadDishImage(formData)
      
      if (result.error) {
        setError(result.error)
      } else if (result.url) {
        setImageUrl(result.url)
      }
    } catch (err) {
      setError('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  return (
    <form action={updateDish.bind(null, dishId, eventSlug)} className="p-6 bg-dark border-2 border-white/20 rounded-xl">
      <h3 className="font-bold text-xl mb-4 text-white">Edit Dish</h3>
      
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="font-bold text-sm text-white">Chef Name</span>
          <input
            name="chef_name"
            type="text"
            required
            defaultValue={chefName}
            placeholder="Who made this?"
            className="bg-dark text-white border-2 border-white/20 p-3 rounded-lg focus:border-red outline-none placeholder:text-white/40"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-bold text-sm text-white">Dish Name</span>
          <input
            name="dish_name"
            type="text"
            required
            defaultValue={dishName}
            placeholder="What is this creation?"
            className="bg-dark text-white border-2 border-white/20 p-3 rounded-lg focus:border-red outline-none placeholder:text-white/40"
          />
        </label>

        <div className="flex flex-col gap-2">
          <span className="font-bold text-sm text-white">Dish Photo</span>
          
          {imageUrl && (
            <div className="relative aspect-3/4 w-full max-w-xs overflow-hidden rounded-lg mb-2">
              <Image
                src={imageUrl}
                alt="Dish preview"
                fill
                className="object-cover"
              />
            </div>
          )}
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageUpload}
            className="bg-dark text-white border-2 border-white/20 p-3 rounded-lg focus:border-red outline-none placeholder:text-white/40"
          />
          <p className="text-xs text-white/60">Upload a new photo or keep the current one</p>
          
          {uploading && (
            <p className="text-sm text-mint">Uploading image...</p>
          )}
          
          {error && (
            <p className="text-sm text-red">{error}</p>
          )}
          
          <input type="hidden" name="image_url" value={imageUrl} />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={uploading}
            className="bg-yellow text-dark px-6 py-2 rounded-lg hover:opacity-90 transition font-bold disabled:opacity-50"
          >
            Update Dish
          </button>
          <Link
            href={`/event/${eventSlug}/manage`}
            className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:opacity-90 transition font-bold"
          >
            Cancel
          </Link>
        </div>
      </div>
    </form>
  )
}
