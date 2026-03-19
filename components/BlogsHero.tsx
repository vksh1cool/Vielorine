export default function BlogsHero() {
  return (
    <section className="pt-32 pb-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto text-center">
        {/* Label */}
        <span className="inline-block text-gold text-sm uppercase tracking-[0.2em] mb-4">
          Wisdom & Guidance
        </span>
        
        {/* Heading */}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-forest mb-6">
          Vielorine Blog
        </h1>
        
        {/* Description */}
        <p className="font-sans text-shadow/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Explore the mysteries of tarot, discover spiritual practices, and find guidance 
          for your journey. Each article is crafted to illuminate your path.
        </p>
      </div>
    </section>
  );
}
