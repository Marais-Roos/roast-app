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
    <form action={createDish.bind(null, eventId, eventSlug)} className="p-6 bg-roast-cream rounded-lg">
      <h3 className="font-bold text-xl mb-4 text-roast-dark">Add New Dish</h3>
      
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="font-bold text-sm text-roast-dark">Chef Name</span>
          <input
            name="chef_name"
            type="text"
            required
            placeholder="Who made this?"
            className="border-2 border-roast-dark/20 p-3 rounded-lg focus:border-roast-red outline-none"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-bold text-sm text-roast-dark">Dish Name</span>
          <input
            name="dish_name"
            type="text"
            required
            placeholder="What is this creation?"
            className="border-2 border-roast-dark/20 p-3 rounded-lg focus:border-roast-red outline-none"
          />
        </label>

        <div className="flex flex-col gap-2">
          <span className="font-bold text-sm text-roast-dark">Dish Photo</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageUpload}
            className="border-2 border-roast-dark/20 p-3 rounded-lg focus:border-roast-red outline-none"
          />
          <p className="text-xs text-roast-dark/60">Take a photo or upload from gallery</p>
          
          {uploading && (
            <p className="text-sm text-roast-sage">Uploading image...</p>
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
            className="bg-roast-red text-white px-6 py-2 rounded-lg hover:opacity-90 transition font-bold disabled:opacity-50"
          >
            Add Dish
          </button>
        </div>
      </div>
    </form>
  )
}
