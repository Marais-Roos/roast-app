import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { VoteDishButton } from './VoteDishButton'
import Image from 'next/image'
import { Vote } from 'lucide-react'
import { checkIfVoted } from './actions'

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

  // Check if user has already voted
  const { hasVoted, votedDishId } = await checkIfVoted(event.id)

  // Fetch dishes for this event (for voting grid)
  const { data: dishes } = await supabase
    .from('dishes')
    .select('*')
    .eq('event_id', event.id)
    .order('yikes_count', { ascending: false })

  // Fetch dishes for standings (ordered by yikes_count descending - most to least)
  const { data: standingsDishes } = await supabase
    .from('dishes')
    .select('*')
    .eq('event_id', event.id)
    .order('yikes_count', { ascending: false })

  // Check if current user is the owner
  const { data: { user } } = await supabase.auth.getUser()
  const isOwner = user?.id === event.user_id

  return (
    <main className="min-h-screen bg-dark">
      {/* Header */}
      <header className="bg-dark border-b-2 border-white/20 py-6 px-8 flex flex-col items-center gap-4">
        <div className='relative w-32 h-9 md:w-40 md:h-12 lg:w-54 lg:h-16'>
          <Image src='/Logo horizontal.png' alt='Smukkel Smul Logo' fill className='object-contain'/>
        </div>
        <div className="max-w-4xl mx-auto flex justify-start items-center gap-6">
          <div className='flex flex-col items-center'>
            <h1 className="font-headings font-extrabold text-3xl md:text-4xl lg:text-5xl text-white mb-1">{event.name}</h1>
            <p className="text-white/60 text-sm">Stem vir jou gunsteling!</p>
          </div>
          {isOwner && (
            <Link
              href={`/event/${slug}/manage`}
              className="bg-dark text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
            >
              Bestuur byeenkoms
            </Link>
          )}
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 md:py-12 mt-16">
        {/* Live Standings */}
        {standingsDishes && standingsDishes.length > 0 && (
          <div className="mb-12">
            <h2 className="font-headings font-bold text-3xl text-white mb-6 text-center">
              Telbord
            </h2>
            <div className="bg-dark border-2 border-white/20 p-4 md:p-5 lg:p-6 rounded-xl shadow-lg">
              <div className="space-y-3">
                {standingsDishes.map((dish, index) => {
                  const isFirst = index === 0
                  const isLast = index === standingsDishes.length - 1
                  const borderColor = isFirst 
                    ? 'border-green/70' 
                    : isLast 
                      ? 'border-red/30' 
                      : 'border-white/20'
                  
                  return (
                    <div 
                      key={dish.id} 
                      className={`flex items-center p-4 md:p-5 lg:p-6 rounded-lg border ${borderColor}`}
                    >
                      <div className="flex items-center gap-4 md:gap-5 lg:gap-6 flex-1">
                        <div className="text-lg md:text-2xl lg:text-3xl font-bold text-white/40">
                          #{index + 1}
                        </div>
                        {dish.image_url && (
                          <div className='relative aspect-3/4 h-21 md:h-32 lg:h-40 overflow-hidden rounded-lg'>
                            <Image
                              src={dish.image_url} 
                              alt={dish.dish_name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between flex-1 gap-3 lg:gap-4">
                          <div>
                            <h3 className="font-headings font-bold text-lg md:text-xl lg:text-2xl text-white">{dish.dish_name}</h3>
                            <p className="text-sm md:text-base lg:text-lg text-white/60">{dish.chef_name}</p>
                          </div>
                          <div className="flex items-center gap-2 font-bold text-sm md:text-base lg:text-lg text-white">
                            <Vote className="w-5 h-5"/>
                            {dish.yikes_count || 0} Stemme
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Voting Grid */}
        <h2 className="font-headings font-bold text-3xl text-white mb-6 text-center">
          Maak Jou Stem
        </h2>
        {dishes && dishes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
            {dishes.map((dish) => (
              <div key={dish.id} className="p-4 bg-dark border-2 border-white/20 rounded-xl shadow-lg overflow-hidden">
                {dish.image_url && (
                  <div className='relative aspect-3/4 w-full overflow-hidden rounded-lg mb-4'>
                    <Image
                      src={dish.image_url} 
                      alt={dish.dish_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-2xl text-white mb-1">{dish.dish_name}</h3>
                      <p className="text-white/60">{dish.chef_name}</p>
                    </div>
                    <div className="flex items-center gap-1 text-yellow font-bold text-lg">
                      <Vote className="w-5 h-5"/>
                      <span>{dish.yikes_count || 0}</span>
                    </div>
                  </div>
                  
                  <VoteDishButton 
                    dishId={dish.id} 
                    eventId={event.id}
                    hasVoted={hasVoted}
                    votedDishId={votedDishId}
                  />
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
        Gebou om die beste Kersdag gereg op te spoor. 🎅
      </footer>
    </main>
  )
}
