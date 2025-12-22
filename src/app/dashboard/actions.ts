'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createEvent(formData: FormData) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  const name = formData.get('name') as string
  const slug = formData.get('slug') as string

  if (!name || !slug) {
    redirect('/dashboard?error=Name and slug are required')
  }

  const { data, error } = await supabase
    .from('events')
    .insert([
      { 
        name, 
        slug,
        user_id: user.id 
      }
    ])
    .select()
    .single()

  if (error) {
    console.error('Error creating event:', error)
    redirect('/dashboard?error=Failed to create event. Slug may already be taken.')
  }

  revalidatePath('/dashboard')
  redirect(`/event/${data.slug}`)
}

export async function updateEvent(eventId: string, formData: FormData) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  const name = formData.get('name') as string

  const { error } = await supabase
    .from('events')
    .update({ name })
    .eq('id', eventId)
    .eq('user_id', user.id)

  if (error) {
    console.error('Error updating event:', error)
    redirect(`/event/${eventId}?error=Failed to update event`)
  }

  revalidatePath('/dashboard')
  redirect('/dashboard?success=Event updated successfully')
}

export async function deleteEvent(eventId: string, slug: string) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', eventId)
    .eq('user_id', user.id)

  if (error) {
    console.error('Error deleting event:', error)
    redirect('/dashboard?error=Failed to delete event')
  }

  revalidatePath('/dashboard')
  redirect('/dashboard?success=Event deleted successfully')
}
