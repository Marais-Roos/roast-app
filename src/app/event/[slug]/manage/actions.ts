'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function uploadDishImage(formData: FormData) {
  const supabase = await createClient()
  const file = formData.get('image') as File
  
  if (!file || file.size === 0) {
    return { error: 'No file provided' }
  }

  // Generate unique filename
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
  
  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from('dishes')
    .upload(fileName, file, {
      contentType: file.type,
      cacheControl: '3600',
      upsert: false
    })

  if (error) {
    console.error('Upload error:', error)
    return { error: 'Failed to upload image' }
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('dishes')
    .getPublicUrl(fileName)

  return { url: publicUrl }
}

export async function createDish(eventId: string, eventSlug: string, formData: FormData) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  // Verify user owns this event
  const { data: event } = await supabase
    .from('events')
    .select('user_id')
    .eq('id', eventId)
    .single()

  if (!event || event.user_id !== user.id) {
    redirect('/dashboard?error=Unauthorized')
  }

  const chefName = formData.get('chef_name') as string
  const dishName = formData.get('dish_name') as string
  const imageUrl = formData.get('image_url') as string

  if (!chefName || !dishName) {
    redirect(`/event/${eventSlug}/manage?error=Chef name and dish name are required`)
  }

  const { error } = await supabase
    .from('dishes')
    .insert([
      {
        event_id: eventId,
        chef_name: chefName,
        dish_name: dishName,
        image_url: imageUrl || null,
        yikes_count: 0
      }
    ])

  if (error) {
    console.error('Error creating dish:', error)
    redirect(`/event/${eventSlug}/manage?error=Failed to create dish`)
  }

  revalidatePath(`/event/${eventSlug}`)
  revalidatePath(`/event/${eventSlug}/manage`)
  redirect(`/event/${eventSlug}/manage?success=Dish added successfully`)
}

export async function deleteDish(dishId: string, eventSlug: string) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  // Get dish to find image and verify ownership
  const { data: dish } = await supabase
    .from('dishes')
    .select('image_url, events(user_id, slug)')
    .eq('id', dishId)
    .single()

  if (!dish || (dish.events as any)?.user_id !== user.id) {
    redirect('/dashboard?error=Unauthorized')
  }

  // Delete image from storage if exists
  if (dish.image_url) {
    const fileName = dish.image_url.split('/').pop()
    if (fileName) {
      await supabase.storage.from('dishes').remove([fileName])
    }
  }

  // Delete dish
  const { error } = await supabase
    .from('dishes')
    .delete()
    .eq('id', dishId)

  if (error) {
    console.error('Error deleting dish:', error)
    redirect(`/event/${eventSlug}/manage?error=Failed to delete dish`)
  }

  revalidatePath(`/event/${eventSlug}`)
  revalidatePath(`/event/${eventSlug}/manage`)
  redirect(`/event/${eventSlug}/manage?success=Dish deleted successfully`)
}
