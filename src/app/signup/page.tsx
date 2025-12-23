import { signup } from './actions'
import Link from 'next/link'
import Image from 'next/image';

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ error?: string; success?: string }> }) {
  const params = await searchParams

  return (
    <main className="min-h-screen flex flex-col gap-16 items-center justify-center bg-dark px-4">
      <div className='relative w-32 h-9 md:w-40 md:h-12 lg:w-54 lg:h-16'>
        <Image src='/Logo horizontal.png' alt='Smukkel Smul Logo' fill className='object-contain'/>
      </div>
      <div className="max-w-md w-full bg-dark border-2 border-white/20 p-8 rounded-xl shadow-xl">
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
            <h1 className="font-headings font-extrabold text-2xl md:text-3xl lg:text-4xl text-white text-center mb-2">Skep 'n Rekening</h1>
            <p className="text-center text-base md:text-lg lg:text-xl text-white mb-8">Begin jou familie se disse oordeel.</p>

            <form className="flex flex-col gap-4">
              <label className="flex flex-col gap-1">
                <span className="font-bold text-sm text-white">Naam</span>
                <input 
                  name="name" 
                  type="text" 
                  required 
                  placeholder="Jan Pampoen"
                  className="border-2 border-white/20 bg-dark text-white p-3 rounded-lg focus:border-gold/30 outline-none placeholder:text-white/40"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="font-bold text-sm text-white">E-pos</span>
                <input 
                  name="email" 
                  type="email" 
                  required 
                  placeholder="naam@epos.com"
                  className="border-2 border-white/20 bg-dark text-white p-3 rounded-lg focus:border-gold/30 outline-none placeholder:text-white/40"
                />
              </label>
              
              <label className="flex flex-col gap-1">
                <span className="font-bold text-sm text-white">Wagwoord</span>
                <input 
                  name="password" 
                  type="password" 
                  required 
                  placeholder="Min. 6 karakters"
                  className="border-2 border-white/20 bg-dark text-white p-3 rounded-lg focus:border-gold/30 outline-none placeholder:text-white/40"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="font-bold text-sm text-white">Bevestig Wagwoord</span>
                <input 
                  name="confirmPassword" 
                  type="password" 
                  required 
                  placeholder="Herhaal wagwoord"
                  className="border-2 border-white/20 bg-dark text-white p-3 rounded-lg focus:border-gold/30 outline-none placeholder:text-white/40"
                />
              </label>

              {params?.error && (
                <p className="text-red text-sm text-center bg-red/10 p-2 rounded border border-red/40">
                  {params.error}
                </p>
              )}

              <button 
                formAction={signup} 
                className="w-full bg-gold text-white font-bold py-3 rounded-lg hover:opacity-90 transition mt-2 cursor-pointer"
              >
                Skep Rekening
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-white">
              Het jy al 'n rekening?{' '}
              <Link href="/login" className="font-bold text-gold hover:underline">
                Teken In
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
