import { createClient } from '@/utils/supabase/server'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { updateEvent } from '@/app/dashboard/actions'
import { DeleteEventButton } from './DeleteEventButton'
import { AddDishForm } from './AddDishForm'
import { DeleteDishButton } from './DeleteDishButton'

export default async function ManageEventPage({ 
  params,
  searchParams 
}: { 
  params: Promise<{ slug: string }>
  searchParams: Promise<{ error?: string; success?: string; editing?: string; adding?: string }> 
}) {
  const supabase = await createClient()
  const { slug } = await params
  const query = await searchParams
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch the event
  const { data: event, error: eventError } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .eq('user_id', user.id)
    .single()

  if (eventError || !event) {
    notFound()
  }

  // Fetch dishes for this event
  const { data: dishes } = await supabase
    .from('dishes')
    .select('*')
    .eq('event_id', event.id)
    .order('created_at', { ascending: false })

  const isEditing = query?.editing === 'true'
  const isAdding = query?.adding === 'true'

  return (
    <main className="min-h-screen bg-dark p-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/dashboard" 
          className="text-white hover:text-red mb-6 inline-block">
        
          ← Back to Dashboard
        </Link>

        {query?.error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 rounded-lg">
            <p className="text-red-800 text-sm">{query.error}</p>
          </div>
        )}

        {query?.success && (
          <div className="mb-6 p-4 bg-green-50 border-2 border-green-500 rounded-lg">
            <p className="text-green-800 text-sm">{query.success}</p>
          </div>
        )}

        <div className="bg-dark border-2 border-white/20 p-8 rounded-xl shadow-lg mb-6">
          {isEditing ? (
            <form action={updateEvent.bind(null, event.id)}>
              <h1 className="font-headings text-4xl text-red mb-2">Edit Event</h1>
              <div className="mb-4">
                <label className="flex flex-col gap-1">
                  <span className="font-bold text-sm text-white">Event Name</span>
                  <input
                    name="name"
                    type="text"
                    required
                    defaultValue={event.name}
                    className="bg-dark text-white border-2 border-white/20 p-3 rounded-lg focus:border-red outline-none placeholder:text-white/40"
                  />
                </label>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-red text-white px-6 py-2 rounded-lg hover:opacity-90 transition font-bold"
                >
                  Save Changes
                </button>
                <Link
                  href={`/event/${slug}/manage`}
                  className="bg-gray-300 text-white px-6 py-2 rounded-lg hover:opacity-90 transition font-bold"
                >
                  Cancel
                </Link>
              </div>
            </form>
          ) : (
            <>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="font-headings text-4xl text-red mb-2">{event.name}</h1>
                  <p className="text-white/60 mb-2">Event URL: /{event.slug}</p>
                  <Link 
                    href={`/event/${slug}`}
                    className="text-mint hover:underline"
                    target="_blank"
                  >
                    View Public Page →
                  </Link>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/event/${slug}/manage?editing=true`}
                    className="bg-mint text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
                  >
                    Edit
                  </Link>
                  <DeleteEventButton eventId={event.id} eventSlug={event.slug} eventName={event.name} />
                </div>
              </div>
            </>
          )}
        </div>

        {!isAdding && (
          <div className="mb-6">
            <Link
              href={`/event/${slug}/manage?adding=true`}
              className="bg-red text-white px-6 py-2 rounded-lg hover:opacity-90 transition font-bold"
            >
              + Add Dish
            </Link>
          </div>
        )}

        {isAdding && (
          <div className="mb-6">
            <AddDishForm eventId={event.id} eventSlug={event.slug} />
            <Link
              href={`/event/${slug}/manage`}
              className="inline-block mt-4 text-white hover:text-red"
            >
              ← Cancel
            </Link>
          </div>
        )}

        <div className="bg-dark border-2 border-white/20 p-8 rounded-xl shadow-lg">
          <h2 className="font-headings text-2xl text-white mb-4">Dishes</h2>
          {dishes && dishes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dishes.map((dish) => (
                <div key={dish.id} className="p-4 bg-mint rounded-lg border-2 border-white/20">
                  {dish.image_url && (
                    <img 
                      src={dish.image_url} 
                      alt={dish.dish_name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                  )}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-white">{dish.dish_name}</h3>
                      <p className="text-sm text-white/60">by {dish.chef_name}</p>
                      <p className="text-red font-bold mt-2">👎 {dish.yikes_count || 0} Yikes</p>
                    </div>
                    <DeleteDishButton dishId={dish.id} dishName={dish.dish_name} eventSlug={event.slug} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/70 text-center py-8">
              No dishes yet. Add the first dish to start the roast!
            </p>
          )}
        </div>
      </div>
    </main>
  )
}
