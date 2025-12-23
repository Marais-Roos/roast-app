import Link from 'next/link'
import Image from 'next/image'
import { Handshake, Award, Trophy } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen font-sans selection:bg-gold selection:text-white overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center text-center py-12 md:py-20 relative">
        <div className="w-full px-6 md:px-12 lg:max-w-7xl mx-auto space-y-6 md:space-y-8 relative z-10">
          <div className="mb-6 md:mb-8 flex justify-center animate-fade-in">
             {/* Logo grootte pas nou aan vir mobile vs desktop */}
            <Image 
              src="/Logo Stacked.png" 
              alt="Smikkel Smul Logo" 
              width={220} 
              height={55} 
              className="w-40 md:w-56"
              priority
            />
          </div>
          
          <h1 className="font-headings text-5xl md:text-7xl lg:text-8xl text-white font-bold leading-tight tracking-tight">
            Kroon die Kombuis-Koning.
          </h1>
          
          <p className="font-sans text-lg md:text-2xl opacity-80 max-w-2xl mx-auto leading-relaxed">
            Genoeg met die "ag, dis heerlik" leuens. Laat die punte praat. Wie se kos verdien die goud en wie s'n is net vulsel?
          </p>

          <div className="pt-6 md:pt-8">
            <Link 
              href="/login" 
              className="bg-gold text-dark font-bold text-lg md:text-xl px-8 py-4 md:px-10 md:py-5 rounded-2xl hover:bg-opacity-90 transition-all shadow-[0_6px_0_rgb(0,0,0,0.2)] hover:shadow-[0_4px_0_rgb(0,0,0,0.2)] hover:translate-y-1 inline-block"
            >
              Begin die Smul
            </Link>
          </div>
        </div>
      </section>

      {/* 2. BENEFITS SECTION */}
      <section className="py-16 md:py-24 bg-white/40 backdrop-blur-sm">
        <div className="w-full px-6 md:px-12 lg:max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-headings text-3xl md:text-5xl text-white font-bold mb-4">
              Hoekom jou familie hierdie app nodig het
            </h2>
            <p className="text-lg md:text-xl opacity-60">Bring bietjie erkenning na die kerstafel.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center md:text-left">
            <div className="space-y-4 p-6 rounded-xl hover:bg-white/50 transition duration-300">
              {/* Emoji ikoon grootte aangepas vir mobile */}
              <div className="mb-4 md:mb-6 inline-block p-4 bg-roast-sage/10 rounded-2xl text-roast-sage group-hover:scale-110 transition-transform duration-300">
                <Handshake className="w-10 h-10 md:w-14 md:h-14" strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-xl md:text-2xl font-headings text-white">Vrede op Aarde (en aan Tafel)</h3>
              <p className="opacity-80 leading-relaxed text-base md:text-lg">
                Stem vir jou gunsteling gereg sonder om kant te kies in die openbaar. Dis die perfekte manier om vir Ouma se pampoenkoekies te stem sonder dat Ma jaloers raak.
              </p>
            </div>
            
            <div className="space-y-4 p-6 rounded-xl hover:bg-white/50 transition duration-300">
              <div className="mb-4 md:mb-6 inline-block p-4 bg-roast-red/10 rounded-2xl text-roast-red group-hover:scale-110 transition-transform duration-300">
                <Award className="w-10 h-10 md:w-14 md:h-14" strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-xl md:text-2xl font-headings text-white">Gee Krediet waar dit Hoort</h3>
              <p className="opacity-80 leading-relaxed text-base md:text-lg">
                Ons weet almal wie die <em>regte</em> meesterkok in die familie is. Nou het ons die data om dit amptelik te bewys.
              </p>
            </div>

            <div className="space-y-4 p-6 rounded-xl hover:bg-white/50 transition duration-300">
              <div className="mb-4 md:mb-6 inline-block p-4 bg-roast-red/10 rounded-2xl text-roast-red group-hover:scale-110 transition-transform duration-300">
                <Trophy className="w-10 h-10 md:w-14 md:h-14" strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-xl md:text-2xl font-headings text-white">Die "Smikkel Smul" Trofee</h3>
              <p className="opacity-80 leading-relaxed text-base md:text-lg">
                Wie gaan vanjaar met die titel huis toe? Skep 'n nuwe tradisie waar die wenner die eer kry (en vrygestel word van skottelgoed was).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOCIAL PROOF SECTION */}
      <section className="py-16 md:py-24 text-white">
        <div className="w-full px-6 md:px-12 lg:max-w-7xl mx-auto">
          <h2 className="font-headings text-3xl md:text-5xl text-center mb-12 md:mb-16">
            Hall of Fame
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <blockquote className="bg-dark/20 p-6 md:p-8 rounded-2xl backdrop-blur-sm border border-white/10">
              <p className="text-base md:text-lg italic mb-4 md:mb-6 leading-relaxed">"Ek het altyd geweet my Gammon is wêreldklas. Die 'Smikkel Smul' app het dit net bevestig. Dankie vir die stemme!"</p>
              <footer className="font-bold font-headings text-lg md:text-xl">— Oom Frik, Potchefstroom</footer>
            </blockquote>

            <blockquote className="bg-dark/20 p-6 md:p-8 rounded-2xl backdrop-blur-sm border border-white/10">
              <p className="text-base md:text-lg italic mb-4 md:mb-6 leading-relaxed">"Eindelik kry my poeding die erkenning wat dit verdien. 98% goedkeuring! Ek neem volgende jaar weer deel."</p>
              <footer className="font-bold font-headings text-lg md:text-xl">— Tannie Susan, Paarl</footer>
            </blockquote>

            <blockquote className="bg-dark/20 p-6 md:p-8 rounded-2xl backdrop-blur-sm border border-white/10">
              <p className="text-base md:text-lg italic mb-4 md:mb-6 leading-relaxed">"Die kompetisie was straf, maar die beste (myne) het gewen."</p>
              <footer className="font-bold font-headings text-lg md:text-xl">— Ma, Kempton Park</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* 4. FAQ SECTION */}
      <section className="py-16 md:py-24 w-full px-6 md:px-12 lg:max-w-7xl mx-auto">
        <h2 className="font-headings text-3xl md:text-5xl text-center mb-12 md:mb-16 text-white">
          Vrae oor die Kompetisie
        </h2>
        
        <div className="max-w-3xl mx-auto space-y-4 md:space-y-6">
          <div className="bg-white/20 p-6 md:p-8 rounded-2xl shadow-sm border-2 border-white/5 hover:border-dark/10 transition">
            <h3 className="font-bold text-lg md:text-xl mb-2 md:mb-3 text-white font-headings">Is my stemme anoniem?</h3>
            <p className="opacity-80 text-base md:text-lg">Absoluut. Niemand sal weet dat jy vir die bure se slaai gestem het in plaas van jou eie suster s'n nie. Jou geheim is veilig.</p>
          </div>

          <div className="bg-white/20 p-6 md:p-8 rounded-2xl shadow-sm border-2 border-white/5 hover:border-dark/10 transition">
            <h3 className="font-bold text-lg md:text-xl mb-2 md:mb-3 text-white font-headings">Kan ek vir my eie kos stem?</h3>
            <p className="opacity-80 text-base md:text-lg">Jy kan probeer, maar ware oorwinning smaak soeter as dit van ander af kom. (Maar ons sal jou nie keer nie).</p>
          </div>

          <div className="bg-white/20 p-6 md:p-8 rounded-2xl shadow-sm border-2 border-white/5 hover:border-dark/10 transition">
            <h3 className="font-bold text-lg md:text-xl mb-2 md:mb-3 text-white font-headings">Wat wen die kok?</h3>
            <p className="opacity-80 text-base md:text-lg">Ewige roem, die "Smikkel Smul" titel vir 'n volle 365 dae, en die reg om eerste in die ry te staan vir nagereg.</p>
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="py-20 md:py-32 bg-dark text-white rounded-t-4xl md:rounded-t-[3rem] mt-8 md:mt-12">
        <div className="w-full px-6 md:px-12 lg:max-w-7xl mx-auto text-center space-y-6 md:space-y-8">
          <h2 className="font-headings text-4xl md:text-7xl text-white leading-tight">
            Wie vat die titel?
          </h2>
          <p className="text-lg md:text-2xl opacity-70 leading-relaxed max-w-2xl mx-auto">
            Maak hierdie Kersfees 'n viering van smaak. <br className="hidden md:block"/>Tyd om die wenner te kroon.
          </p>
          <div className="pt-6 md:pt-8">
             <Link 
              href="/login" 
              className="bg-gold text-dark font-bold text-lg md:text-xl px-8 py-4 md:px-12 md:py-6 rounded-2xl hover:bg-opacity-90 transition-all shadow-black/20 hover:shadow-black/20 hover:translate-y-1 inline-block"
            >
              Hou 'n "Smikkel Smul"
            </Link>
          </div>
        
          {/* Footer Text */}
          <div className="mt-16 md:mt-24 pt-8 border-t border-white/10 text-xs md:text-sm opacity-40">
            Gebou om die beste Kersdag gereg op te spoor. 🎅
          </div>
        </div>
      </section>
    </main>
  )
}