import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-dark text-center px-4">
      {/* Hero Section */}
      <div className="max-w-2xl space-y-6">
        <div className="mb-8 flex justify-center">
            <Image src="/Logo Stacked.png" alt="Roast Logo" width={128} height={36}/>
        </div>
        
        <h1 className="font-headings text-5xl md:text-7xl text-white font-extrabold leading-tight">
          The Christmas <br /> Verdict.
        </h1>
        
        <p className="font-sans text-xl text-white opacity-80 max-w-lg mx-auto">
          Stop politely eating weird salads. Upload the dishes, vote for the crimes, and crown the "Misbaksel" of the day.
        </p>

        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
          {/* Button for YOU (The Host) */}
          <Link 
            href="/login" 
            className="bg-mint text-dark font-bold text-lg px-8 py-4 rounded-xl hover:bg-mint/80 transition shadow-lg hover:shadow-xl"
          >
            Host a Roast
          </Link>
          
          {/* Button for GUESTS (just scrolling down or entered a code) */}
          {/* We'll add a 'Find my Party' feature later if we have time */}
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 text-sm text-white opacity-40">
        Built for the Roos Family Christmas
      </footer>
    </main>
  )
}