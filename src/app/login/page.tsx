import { login } from './actions'
import Link from 'next/link'

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string; message?: string }> }) {
  const params = await searchParams
  
  return (
    <main className="min-h-screen flex items-center justify-center bg-roast-cream px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-xl border-2 border-roast-dark/10">
        {params?.message && (
          <div className="mb-6 p-4 bg-green-50 border-2 border-green-500 rounded-lg">
            <p className="text-green-800 text-sm font-medium text-center">
              ✓ {decodeURIComponent(params.message)}
            </p>
          </div>
        )}
        
        <h1 className="font-serif text-4xl text-roast-red text-center mb-2">Welcome Back</h1>
        <p className="text-center text-roast-dark mb-8">Log in to host your Roast Event</p>

        <form className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            <span className="font-bold text-sm text-roast-dark">Email</span>
            <input 
              name="email" 
              type="email" 
              required 
              placeholder="your@email.com"
              className="border-2 border-roast-dark/20 p-3 rounded-lg focus:border-roast-red outline-none"
            />
          </label>
          
          <label className="flex flex-col gap-1">
            <span className="font-bold text-sm text-roast-dark">Password</span>
            <input 
              name="password" 
              type="password" 
              required 
              placeholder="Enter your password"
              className="border-2 border-roast-dark/20 p-3 rounded-lg focus:border-roast-red outline-none"
            />
          </label>

          {params?.error && (
            <p className="text-roast-red text-sm text-center bg-roast-cream p-2 rounded border border-roast-red/20">
              {params.error}
            </p>
          )}

          <button 
            formAction={login} 
            className="w-full bg-roast-red text-white font-bold py-3 rounded-lg hover:opacity-90 transition mt-2"
          >
            Log In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-roast-dark">
          Don't have an account?{' '}
          <Link href="/signup" className="font-bold text-roast-red hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </main>
  )
}