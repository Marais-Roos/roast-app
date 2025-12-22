import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <main className="min-h-screen bg-roast-sage p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-headings text-5xl text-roast-red mb-4 font-black">
          Welcome to Your Dashboard! 🎅
        </h1>
        <p className="text-roast-dark text-xl mb-8">
          Hi {user.user_metadata?.full_name || user.email}!
        </p>
        
        <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-roast-dark/10">
          <h2 className="font-bold text-2xl text-roast-dark mb-4">
            Your Roast Events
          </h2>
          <p className="text-roast-dark/70">
            Create your first roast event to get started...
          </p>
        </div>
      </div>
    </main>
  )
}
