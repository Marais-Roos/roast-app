import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { VoteDishButton } from './VoteDishButton'

export default async function PublicEventPage({ params }: { params: Promise<{ slug: string }> }) {
  const supabase = await createClient()
  const { slug } = await params
  
  // Fetch the event (no auth required)
  const { data: event, error: eventError } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .single()

  if (eventError || !event) {
    notFound()
  }

  // Fetch dishes for this event
  const { data: dishes } = await supabase
    .from('dishes')
    .select('*')
    .eq('event_id', event.id)
    .order('yikes_count', { ascending: false })

  // Check if current user is the owner
  const { data: { user } } = await supabase.auth.getUser()
  const isOwner = user?.id === event.user_id

  return (
    <main className="min-h-screen bg-roast-cream">
      {/* Header */}
      <header className="bg-white border-b-2 border-roast-dark/10 py-6 px-8">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="font-serif text-4xl text-roast-red mb-1">{event.name}</h1>
            <p className="text-roast-dark/60 text-sm">Vote for the worst dish!</p>
          </div>
          {isOwner && (
            <Link
              href={`/event/${slug}/manage`}
              className="bg-roast-dark text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
            >
              Manage Event
            </Link>
          )}
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-4xl mx-auto p-8">
        {dishes && dishes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dishes.map((dish) => (
              <div key={dish.id} className="bg-white p-6 rounded-xl shadow-lg border-2 border-roast-dark/10">
                {dish.image_url && (
                  <img 
                    src={dish.image_url} 
                    alt={dish.dish_name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h3 className="font-bold text-2xl text-roast-dark mb-2">{dish.dish_name}</h3>
                <p className="text-roast-dark/60 mb-4">by {dish.chef_name}</p>
                
                <div className="flex items-center justify-between">
                  <div className="text-roast-red font-bold text-xl">
                    👎 {dish.yikes_count || 0} Yikes
                  </div>
                  <VoteDishButton dishId={dish.id} currentCount={dish.yikes_count || 0} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-roast-dark/70 text-xl">
              No dishes yet. Check back soon!
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-roast-dark/40">
        Built for roasting the worst Christmas dishes 🎅
      </footer>
    </main>
  )
}
