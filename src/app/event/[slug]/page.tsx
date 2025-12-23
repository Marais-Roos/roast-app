import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { VoteDishButton } from './VoteDishButton'
import Image from 'next/image'

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

  // Fetch dishes for this event (for voting grid)
  const { data: dishes } = await supabase
    .from('dishes')
    .select('*')
    .eq('event_id', event.id)
    .order('yikes_count', { ascending: false })

  // Fetch dishes for standings (ordered by yikes_count ascending - least to most)
  const { data: standingsDishes } = await supabase
    .from('dishes')
    .select('*')
    .eq('event_id', event.id)
    .order('yikes_count', { ascending: true })

  // Check if current user is the owner
  const { data: { user } } = await supabase.auth.getUser()
  const isOwner = user?.id === event.user_id

  return (
    <main className="min-h-screen bg-dark">
      {/* Header */}
      <header className="bg-dark border-b-2 border-white/20 py-6 px-8">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="font-headings font-extrabold text-4xl text-white mb-1">{event.name}</h1>
            <p className="text-white/60 text-sm">Vote for the worst dish!</p>
          </div>
          {isOwner && (
            <Link
              href={`/event/${slug}/manage`}
              className="bg-dark text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
            >
              Manage Event
            </Link>
          )}
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-4xl mx-auto p-8">
        {/* Live Standings */}
        {standingsDishes && standingsDishes.length > 0 && (
          <div className="mb-12">
            <h2 className="font-headings font-bold text-3xl text-white mb-6 text-center">
              Live Standings
            </h2>
            <div className="bg-dark border-2 border-white/20 p-6 rounded-xl shadow-lg">
              <div className="space-y-3">
                {standingsDishes.map((dish, index) => (
                  <div 
                    key={dish.id} 
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      index === standingsDishes.length - 1 
                        ? 'bg-red/10 border-2 border-red/50' 
                        : 'bg-green/20 border-2 border-mint/20'
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`text-2xl font-bold ${
                        index === standingsDishes.length - 1 
                          ? 'text-red' 
                          : 'text-white/40'
                      }`}>
                        {index === standingsDishes.length - 1 ? '💩' : `#${index + 1}`}
                      </div>
                      {dish.image_url && (
                        <img 
                          src={dish.image_url} 
                          alt={dish.dish_name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}
                      <div>
                        <h3 className="font-bold text-lg text-white">{dish.dish_name}</h3>
                        <p className="text-sm text-white/60">by {dish.chef_name}</p>
                      </div>
                    </div>
                    <div className={`font-bold text-xl ${
                      index === standingsDishes.length - 1 
                        ? 'text-red' 
                        : 'text-white'
                    }`}>
                      👎 {dish.yikes_count || 0}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Voting Grid */}
        <h2 className="font-headings text-3xl text-white mb-6 text-center">
          Cast Your Vote
        </h2>
        {dishes && dishes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dishes.map((dish) => (
              <div key={dish.id} className=" bg-dark border-2 border-white/20 p-6 rounded-xl shadow-lg">
                {dish.image_url && (
                  <img 
                    src={dish.image_url} 
                    alt={dish.dish_name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h3 className="font-bold text-2xl text-white mb-2">{dish.dish_name}</h3>
                <p className="text-white/60 mb-4">by {dish.chef_name}</p>
                
                <div className="flex items-center justify-between">
                  <div className="text-red font-bold text-xl">
                    👎 {dish.yikes_count || 0} Yikes
                  </div>
                  <VoteDishButton dishId={dish.id} currentCount={dish.yikes_count || 0} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-white/70 text-xl">
              No dishes yet. Check back soon!
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-white/40">
        Built for roasting the worst Christmas dishes 🎅
      </footer>
    </main>
  )
}
