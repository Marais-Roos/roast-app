import { signup } from './actions'
import Link from 'next/link'

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ error?: string; success?: string }> }) {
  const params = await searchParams

  return (
    <main className="min-h-screen flex items-center justify-center bg-roast-cream px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-xl border-2 border-roast-dark/10">
        {params?.success && (
          <div className="mb-6 p-4 bg-green-50 border-2 border-green-500 rounded-lg">
            <p className="text-green-800 font-bold text-center mb-2 text-xl">
              ✓ Success!
            </p>
            <p className="text-green-700 text-sm text-center mb-4">
              {decodeURIComponent(params.success)}
            </p>
            <Link 
              href="/login" 
              className="block mt-4 text-center bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition"
            >
              Go to Login
            </Link>
          </div>
        )}
        
        {!params?.success && (
          <>
            <h1 className="font-serif text-4xl text-roast-red text-center mb-2">Create Account</h1>
            <p className="text-center text-roast-dark mb-8">Start hosting your own Roast Events</p>

            <form className="flex flex-col gap-4">
              <label className="flex flex-col gap-1">
                <span className="font-bold text-sm text-roast-dark">Full Name</span>
                <input 
                  name="name" 
                  type="text" 
                  required 
                  placeholder="John Doe"
                  className="border-2 border-roast-dark/20 p-3 rounded-lg focus:border-roast-red outline-none"
                />
              </label>

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
                  placeholder="Min. 6 characters"
                  className="border-2 border-roast-dark/20 p-3 rounded-lg focus:border-roast-red outline-none"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="font-bold text-sm text-roast-dark">Confirm Password</span>
                <input 
                  name="confirmPassword" 
                  type="password" 
                  required 
                  placeholder="Re-enter your password"
                  className="border-2 border-roast-dark/20 p-3 rounded-lg focus:border-roast-red outline-none"
                />
              </label>

              {params?.error && (
                <p className="text-roast-red text-sm text-center bg-roast-cream p-2 rounded border border-roast-red/20">
                  {params.error}
                </p>
              )}

              <button 
                formAction={signup} 
                className="w-full bg-roast-red text-white font-bold py-3 rounded-lg hover:opacity-90 transition mt-2"
              >
                Create Account
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-roast-dark">
              Already have an account?{' '}
              <Link href="/login" className="font-bold text-roast-red hover:underline">
                Log in
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
