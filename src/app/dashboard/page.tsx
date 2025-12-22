import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createEvent } from './actions'

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
    <main className="min-h-screen bg-roast-cream p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-serif text-5xl text-roast-red mb-2">
              Your Dashboard 🎅
            </h1>
            <p className="text-roast-dark text-xl">
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

        <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-roast-dark/10 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-2xl text-roast-dark">
              Your Roast Events
            </h2>
            {!showCreateForm && (
              <Link
                href="/dashboard?creating=true"
                className="bg-roast-red text-white px-6 py-2 rounded-lg hover:opacity-90 transition font-bold"
              >
                + Create Event
              </Link>
            )}
          </div>

          {showCreateForm && (
            <form action={createEvent} className="mb-6 p-4 bg-roast-cream rounded-lg">
              <h3 className="font-bold text-lg mb-4 text-roast-dark">Create New Event</h3>
              <div className="flex flex-col gap-4">
                <label className="flex flex-col gap-1">
                  <span className="font-bold text-sm text-roast-dark">Event Name</span>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Roos Family Christmas 2025"
                    className="border-2 border-roast-dark/20 p-3 rounded-lg focus:border-roast-red outline-none"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="font-bold text-sm text-roast-dark">URL Slug (unique)</span>
                  <input
                    name="slug"
                    type="text"
                    required
                    pattern="[a-z0-9-]+"
                    placeholder="roos-christmas-2025"
                    className="border-2 border-roast-dark/20 p-3 rounded-lg focus:border-roast-red outline-none"
                  />
                  <span className="text-xs text-roast-dark/60">Only lowercase letters, numbers, and hyphens</span>
                </label>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-roast-red text-white px-6 py-2 rounded-lg hover:opacity-90 transition font-bold"
                  >
                    Create Event
                  </button>
                  <Link
                    href="/dashboard"
                    className="bg-gray-300 text-roast-dark px-6 py-2 rounded-lg hover:opacity-90 transition font-bold"
                  >
                    Cancel
                  </Link>
                </div>
              </div>
            </form>
          )}

          {events && events.length > 0 ? (
            <div className="space-y-3">
              {events.map((event) => (
                <Link
                  key={event.id}
                  href={`/event/${event.slug}/manage`}
                  className="block p-4 bg-roast-cream hover:bg-roast-cream/70 rounded-lg transition border-2 border-transparent hover:border-roast-red"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg text-roast-dark">{event.name}</h3>
                      <p className="text-sm text-roast-dark/60">/{event.slug}</p>
                    </div>
                    <div className="text-roast-red text-2xl">→</div>
                  </div>
                </Link>
              ))}
            </div>
          ) : !showCreateForm && (
            <p className="text-roast-dark/70 text-center py-8">
              No events yet. Create your first roast event to get started!
            </p>
          )}
        </div>
      </div>
    </main>
  )
}
