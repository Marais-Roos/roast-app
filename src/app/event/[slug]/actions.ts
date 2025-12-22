'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function voteDish(dishId: string) {
  const supabase = await createClient()
  
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

  // Revalidate the event page
  const eventSlug = (dish.events as any)?.slug
  if (eventSlug) {
    revalidatePath(`/event/${eventSlug}`)
  }

  return { success: true }
}
