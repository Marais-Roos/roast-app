import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createEvent } from './actions'
import { Plus, ChevronRight } from 'lucide-react'
import Image from 'next/image'

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ error?: string; success?: string; creating?: string }> }) {
  const supabase = await createClient()
  const params = await searchParams
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch user's events
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const showCreateForm = params?.creating === 'true'

  return (
    <main className="min-h-screen bg-dark pt-4 pb-6 flex flex-col items-center gap-16 w-full max-w-[calc(100vw-48px)] md:max-w-[calc(100vw-96px)] lg:max-w-7xl mx-auto">
      <div className='relative w-32 h-9 md:w-40 md:h-12 lg:w-54 lg:h-16'>
         <Image src='/Logo horizontal.png' alt='Smukkel Smul Logo' fill className='object-contain'/>
       </div>
      <div className="w-full">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-headings font-extrabold text-3xl md:text-4xl lg:text-5xl text-white mb-2">
              Jou Paneelbord
            </h1>
            <p className="text-white text-lg md:text-xl lg:text-2xl">
              Hi {user.user_metadata?.full_name || user.email}!
            </p>
          </div>
        </div>

        {params?.error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 rounded-lg">
            <p className="text-red-800 text-sm">{params.error}</p>
          </div>
        )}

        {params?.success && (
          <div className="mb-6 p-4 bg-green-50 border-2 border-green-500 rounded-lg">
            <p className="text-green-800 text-sm">{params.success}</p>
          </div>
        )}

        <div className="bg-dark border-2 border-white/20 p-4 md:p-5 lg:p-6 rounded-xl shadow-lg mb-6">
          <div className="flex pb-4 mb-4 md:mb-5 lg:mb-6 gap-4 items-end border-b border-white/10">
            <h2 className="font-headings font-bold text-2xl md:text-3xl lg:text-4xl text-white flex-1">
              Jou Familie Gedoentes
            </h2>
            {!showCreateForm && (
              <Link
                href="/dashboard?creating=true"
                className="bg-gold text-white px-3 py-2 md:px-4 md:py-2 lg:px-6 lg:py-3 rounded-lg hover:opacity-90 transition font- text-sm md:text-base lg:text-lg flex items-center gap-2"
              >
                <Plus className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
                Skep Byeenkoms
              </Link>
            )}
          </div>

          {showCreateForm && (
            <form action={createEvent} className="mb-6 p-4 bg-dark rounded-lg">
              <h3 className="font-bold text-lg mb-4 text-white">Skep Nuwe Byeenkoms</h3>
              <div className="flex flex-col gap-4">
                <label className="flex flex-col gap-1">
                  <span className="font-bold text-sm text-white">Naam van Byeenkoms</span>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Papenfoes Kersfees 1903"
                    className="bg-dark text-white border-2 border-white/20 p-3 rounded-lg focus:border-gold/50 outline-none placeholder:text-white/40"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="font-bold text-sm text-white">URL Slug (uniek)</span>
                  <input
                    name="slug"
                    type="text"
                    required
                    pattern="[a-z0-9-]+"
                    placeholder="papenfoes-kersfees-1903"
                    className="bg-dark text-white border-2 border-white/20 p-3 rounded-lg focus:border-gold/50 outline-none placeholder:text-white/40"
                  />
                  <span className="text-xs text-white/60">Slegs kleinletters, nommers en koppeltekens.</span>
                </label>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="cursor-pointer bg-gold text-dark px-6 py-2 rounded-lg hover:opacity-90 transition font-bold"
                  >
                    Skep Byeenkoms
                  </button>
                  <Link
                    href="/dashboard"
                    className="cursor-pointer bg-red/50 text-white px-6 py-2 rounded-lg hover:opacity-90 transition font-bold"
                  >
                    Kanselleer
                  </Link>
                </div>
              </div>
            </form>
          )}

          {events && events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
              {events.map((event) => (
                <Link
                  key={event.id}
                  href={`/event/${event.slug}/manage`}
                  className="block p-4 hover:bg-mint/50 rounded-lg transition border border-mint/50"
                >
                  <div className="flex flex-col justify-start items-start gap-4 md:gap-5 lg:gap-6">
                    <div>
                      <h3 className="font-headings font-bold text-xl md:text-2xl lg:text-3xl text-white">{event.name}</h3>
                      <p className="text-sm md:text-base lg:text-lg text-white/60">/{event.slug}</p>
                    </div>
                    <div className="text-white text-bold text-sm md:text-base lg:text-lg flex gap-2 items-center">
                      Bekyk Byeenkoms
                      <ChevronRight className="-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : !showCreateForm && (
            <p className="text-white/70 text-center py-8">
              No events yet. Create your first roast event to get started!
            </p>
          )}
        </div>
      </div>
    </main>
  )
}
