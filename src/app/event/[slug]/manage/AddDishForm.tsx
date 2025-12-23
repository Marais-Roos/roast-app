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
    <form action={createDish.bind(null, eventId, eventSlug)} className="p-6 bg-white/20 rounded-lg border-2 border-white/30">
      <h3 className="font-headings font-bold text-xl mb-4 text-white">Voeg Nuwe Dis By</h3>
      
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="font-bold text-sm text-white">Naam van Kok</span>
          <input
            name="chef_name"
            type="text"
            required
            placeholder="Who made this?"
            className="bg-dark text-white border-2 border-white/20 p-3 rounded-lg focus:border-gold/50 outline-none placeholder:text-white/40"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-bold text-sm text-white">Naam van Dis</span>
          <input
            name="dish_name"
            type="text"
            required
            placeholder="What is this creation?"
            className="bg-dark text-white border-2 border-white/20 p-3 rounded-lg focus:border-gold/50 outline-none placeholder:text-white/40"
          />
        </label>

        <div className="flex flex-col gap-2">
          <span className="font-bold text-sm text-white">Foto van Dis</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageUpload}
            className="bg-dark text-white border-2 border-white/20 p-3 rounded-lg focus:border-gold/50 outline-none placeholder:text-white/40"
          />
          <p className="text-xs text-white/60">Neem 'n foto of laai een op vanaf jou gallery.</p>
          
          {uploading && (
            <p className="text-sm text-mint">Foto laai op...</p>
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
            className="bg-gold text-dark px-6 py-2 rounded-lg hover:opacity-90 transition font-bold disabled:opacity-50"
          >
            Voeg Dis By
          </button>
        </div>
      </div>
    </form>
  )
}
