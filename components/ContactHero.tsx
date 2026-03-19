export default function ContactHero() {
  return (
    <section className="pt-32 pb-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto text-center">
        {/* Label */}
        <span className="inline-block text-gold text-sm uppercase tracking-[0.2em] mb-4">
          Get in Touch
        </span>
        
        {/* Heading */}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-forest mb-6">
          Begin Your Journey
        </h1>
        
        {/* Description */}
        <p className="font-sans text-shadow/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Ready to illuminate your path? Reach out for a personalized tarot reading 
          or simply to connect. Every journey begins with a single step.
        </p>
      </div>
    </section>
  );
}
