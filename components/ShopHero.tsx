export default function ShopHero() {
  return (
    <section className="pt-32 pb-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto text-center">
        {/* Label */}
        <span className="inline-block text-gold text-sm uppercase tracking-[0.2em] mb-4">
          Apothecary & Tools
        </span>
        
        {/* Heading */}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-forest mb-6">
          Curated for the Soul
        </h1>
        
        {/* Description */}
        <p className="font-sans text-shadow/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Discover handpicked spiritual tools, crystals, and tarot essentials. 
          Each item is chosen with intention to support your mystical journey.
        </p>
      </div>
    </section>
  );
}
