'use client'

import { useState, useRef } from 'react'
import { uploadDishImage, createDish } from './actions'

export function AddDishForm({ eventId, eventSlug }: { eventId: string; eventSlug: string }) {
  const [imageUrl, setImageUrl] = useState<string>('')
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
    <form action={createDish.bind(null, eventId, eventSlug)} className="p-6 bg-mint rounded-lg">
      <h3 className="font-bold text-xl mb-4 text-white">Add New Dish</h3>
      
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="font-bold text-sm text-white">Chef Name</span>
          <input
            name="chef_name"
            type="text"
            required
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
            placeholder="What is this creation?"
            className="bg-dark text-white border-2 border-white/20 p-3 rounded-lg focus:border-red outline-none placeholder:text-white/40"
          />
        </label>

        <div className="flex flex-col gap-2">
          <span className="font-bold text-sm text-white">Dish Photo</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageUpload}
            className="bg-dark text-white border-2 border-white/20 p-3 rounded-lg focus:border-red outline-none placeholder:text-white/40"
          />
          <p className="text-xs text-white/60">Take a photo or upload from gallery</p>
          
          {uploading && (
            <p className="text-sm text-mint">Uploading image...</p>
          )}
          
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
          
          {imageUrl && (
            <div className="mt-2">
              <img src={imageUrl} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
              <input type="hidden" name="image_url" value={imageUrl} />
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-2">
          <button
            type="submit"
            disabled={uploading}
            className="bg-red text-white px-6 py-2 rounded-lg hover:opacity-90 transition font-bold disabled:opacity-50"
          >
            Add Dish
          </button>
        </div>
      </div>
    </form>
  )
}
