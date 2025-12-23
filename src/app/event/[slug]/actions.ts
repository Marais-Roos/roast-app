'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export async function voteDish(dishId: string, eventId: string) {
  const supabase = await createClient()
  const cookieStore = await cookies()
  
  // Check if user has already voted for this event (using cookie)
  const voteKey = `voted_event_${eventId}`
  const hasVoted = cookieStore.get(voteKey)
  
  if (hasVoted) {
    return { success: false, error: 'You have already voted for this event' }
  }
  
  // Get current dish to find the event slug for revalidation
  const { data: dish } = await supabase
    .from('dishes')
    .select('event_id, yikes_count, events(slug)')
    .eq('id', dishId)
    .single()

  if (!dish) {
    throw new Error('Dish not found')
  }

  // Increment the yikes count
  const { error } = await supabase
    .from('dishes')
    .update({ yikes_count: (dish.yikes_count || 0) + 1 })
    .eq('id', dishId)

  if (error) {
    console.error('Error voting:', error)
    throw new Error('Failed to vote')
  }

  // Set cookie to prevent voting again (expires in 30 days)
  cookieStore.set(voteKey, dishId, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: true,
    sameSite: 'strict'
  })

  // Revalidate the event page
  const eventSlug = (dish.events as any)?.slug
  if (eventSlug) {
    revalidatePath(`/event/${eventSlug}`)
  }

  return { success: true }
}

export async function checkIfVoted(eventId: string) {
  const cookieStore = await cookies()
  const voteKey = `voted_event_${eventId}`
  const voted = cookieStore.get(voteKey)
  
  return { hasVoted: !!voted, votedDishId: voted?.value }
}
