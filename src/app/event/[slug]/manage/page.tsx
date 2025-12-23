import { createClient } from '@/utils/supabase/server'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { updateEvent } from '@/app/dashboard/actions'
import { DeleteEventButton } from './DeleteEventButton'
import { AddDishForm } from './AddDishForm'
import { DishCard } from './DishCard'
import { ChevronLeft, ChevronRight, Pencil, Trash2, Plus } from 'lucide-react'

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
    <main className="min-h-screen bg-dark p-6 md:p-12 lg:p-20">
      <div className="w-full lg:max-w-7xl mx-auto">
        <Link 
          href="/dashboard" 
          className="text-gold hover:text-gold/80 mb-6 inline-block">
          <ChevronLeft className="w-4 h-4 inline-block mr-2" />
          Terug na Paneel
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

        <div className="bg-dark shadow-lg border-b-2 border-white/20 pb-6 mb-20">
          {isEditing ? (
            <form action={updateEvent.bind(null, event.id)} className=' border-2 border-white/20 p-4 md:p-5 lg:p-6 rounded-xl '>
              <h1 className="font-headings font-extrabold text-3xl md:text-4xl lg:text-5xl text-white mb-2">Wysig Byeenkoms</h1>
              <div className="mb-4">
                <label className="flex flex-col gap-1">
                  <span className="font-bold text-sm text-white">Byeenkoms Naam</span>
                  <input
                    name="name"
                    type="text"
                    required
                    defaultValue={event.name}
                    className="bg-dark text-white border-2 border-white/20 p-3 rounded-lg focus:border-gold/50 outline-none placeholder:text-white/40"
                  />
                </label>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-gold text-white px-6 py-2 rounded-lg hover:opacity-90 transition font-bold"
                >
                  Stoor
                </button>
                <Link
                  href={`/event/${slug}/manage`}
                  className="bg-gray-300 text-white px-6 py-2 rounded-lg hover:opacity-90 transition font-bold"
                >
                  Kanselleer
                </Link>
              </div>
            </form>
          ) : (
            <>
              <div className="flex flex-col md:justify-between md:flex-row items-start mb-6 gap-4">
                <div>
                  <h1 className="font-headings font-extrabold text-3xl md:text-4xl lg:text-5xl text-white mb-2">{event.name}</h1>
                  <p className="text-white/60 mb-2">Geleentheid URL: /{event.slug}</p>
                  <Link 
                    href={`/event/${slug}`}
                    className="text-gold hover:underline"
                    target="_blank"
                  >
                    Besoek Publieke Blad
                    <ChevronRight className="w-4 h-4 inline-block ml-2" />
                  </Link>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/event/${slug}/manage?editing=true`}
                    className="bg-gold/20 text-gold px-4 py-2 rounded-lg hover:opacity-90 transition border-[0.5] border-gold"
                  >
                    <Pencil className="w-4 h-4 inline-block mr-2" />
                    Wysig
                  </Link>
                  <DeleteEventButton eventId={event.id} eventSlug={event.slug} eventName={event.name} />
                </div>
              </div>
            </>
          )}
        </div>

        

        <div>
          <div className='flex justify-between mb-4'>
            <h2 className="font-headings font-bold text-2xl md:text-3xl lg:text-4xl text-white">Disse</h2>
            {!isAdding && (
              <Link
                href={`/event/${slug}/manage?adding=true`}
                className="bg-gold text-dark flex gap-2 items-center px-6 py-2 rounded-lg hover:opacity-90 transition font-bold"
              >
                <Plus className='h-4 w-4'/>
                Voeg Dis By
              </Link>
            )}
          </div>

          {isAdding && (
            <div className="mb-6">
              <AddDishForm eventId={event.id} eventSlug={event.slug} />
              <Link
                href={`/event/${slug}/manage`}
                className="inline-block mt-4 text-white hover:text-red"
              >
                <ChevronLeft className="w-4 h-4 inline-block mr-2" />
                Kanselleer
              </Link>
            </div>
          )}
          
          {!isAdding && (
            <>
              {dishes && dishes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
                  {dishes.map((dish) => (
                    <DishCard key={dish.id} dish={dish} eventSlug={event.slug} />
                  ))}
                </div>
              ) : (
                <p className="text-white/70 text-center py-8">
                  Geen geregte nie. Voeg die eerste dis by om die kompetisie te begin!
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  )
}
