import { login } from './actions'
import Link from 'next/link'
import Image from 'next/image';

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string; message?: string }> }) {
  const params = await searchParams
  
  return (
    <main className="min-h-screen flex flex-col gap-16 items-center justify-center bg-dark px-4">
      <div className='relative w-32 h-9 md:w-40 md:h-12 lg:w-54 lg:h-16'>
        <Image src='/Logo horizontal.png' alt='Smukkel Smul Logo' fill className='object-contain'/>
      </div>
      <div className="max-w-md w-full bg-dark border-2 border-white/20 p-8 rounded-xl shadow-xl">
        
        {params?.message && (
          <div className="mb-6 p-4 bg-green-50 border-2 border-green-500 rounded-lg">
            <p className="text-green-800 text-sm font-medium text-center">
              ✓ {decodeURIComponent(params.message)}
            </p>
          </div>
        )}
        
        <h1 className="font-headings font-extrabold text-2xl md:text-3xl lg:text-4xl text-white text-center mb-2">Welkom Terug</h1>
        <p className="text-center text-base md:text-lg lg:text-xl text-white mb-8">Teken in om jou familie gedoentes te bestuur.</p>

        <form className="flex flex-col gap-4">
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
              placeholder="Jou wagwoord"
              className="border-2 border-white/20 bg-dark text-white p-3 rounded-lg focus:border-gold/30 outline-none placeholder:text-white/40"
            />
          </label>

          {params?.error && (
            <p className="text-red text-sm text-center bg-red/10 p-2 rounded border border-red/40">
              {params.error}
            </p>
          )}

          <button 
            formAction={login} 
            className="w-full bg-gold text-white font-bold py-3 rounded-lg hover:opacity-90 transition mt-2 cursor-pointer"
          >
            Teken In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-white">
          Het jy nog nie 'n rekening nie?{' '}
          <Link href="/signup" className="font-bold text-gold hover:underline">
            Skryf in
          </Link>
        </div>
      </div>
    </main>
  )
}