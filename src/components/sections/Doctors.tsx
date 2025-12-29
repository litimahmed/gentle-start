import { useState, useEffect, useRef } from 'react';
import { Award, GraduationCap, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Doctor {
  name: string;
  title: string;
  specialty: string;
  experience: string;
  education: string;
  image: string;
  quote: string;
}

const doctors: Doctor[] = [
  {
    name: 'Dr. Sophie Martin',
    title: 'Directrice & Chirurgien-Dentiste',
    specialty: 'Implantologie & Esthétique',
    experience: '18 ans',
    education: 'Université Paris Descartes',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop',
    quote: 'Chaque sourire est unique, chaque patient mérite une attention personnalisée.',
  },
  {
    name: 'Dr. Thomas Bernard',
    title: 'Chirurgien-Dentiste',
    specialty: 'Implantologie Avancée',
    experience: '15 ans',
    education: 'Université de Strasbourg',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop',
    quote: 'L\'implantologie moderne offre des solutions durables et naturelles.',
  },
  {
    name: 'Dr. Camille Lefebvre',
    title: 'Orthodontiste',
    specialty: 'Orthodontie Invisible',
    experience: '12 ans',
    education: 'Université de Lyon',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=2070&auto=format&fit=crop',
    quote: 'Un alignement parfait pour un sourire en toute confiance.',
  },
  {
    name: 'Dr. Marc Dupont',
    title: 'Pédodontiste',
    specialty: 'Dentisterie Pédiatrique',
    experience: '10 ans',
    education: 'Université de Bordeaux',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2070&auto=format&fit=crop',
    quote: 'Créer une expérience positive dès le plus jeune âge.',
  },
];

const Doctors = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="equipe"
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-muted/30"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/[0.02] rounded-full blur-[100px]" />

      {/* Decorative lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-primary mb-4">
            Équipe Médicale
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground">
            Nos <span className="text-primary">Praticiens</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            Une équipe de spécialistes passionnés, dédiés à votre bien-être 
            et à l'excellence des soins dentaires.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary/50" />
            <Award className="w-5 h-5 text-primary/60" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {doctors.map((doctor, index) => (
            <div
              key={doctor.name}
              className={`group relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Card */}
              <div className="relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10">
                {/* Image container */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/60 to-transparent" />
                  
                  {/* Specialty badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-medium tracking-wide rounded-full">
                      {doctor.specialty}
                    </span>
                  </div>

                  {/* Quote overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-primary/95 flex items-center justify-center p-6 transition-all duration-500 ${
                      hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <p className="text-primary-foreground text-center text-sm italic leading-relaxed">
                      "{doctor.quote}"
                    </p>
                  </div>

                  {/* Name overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-heading text-xl text-background mb-1">
                      {doctor.name}
                    </h3>
                    <p className="text-background/80 text-sm">
                      {doctor.title}
                    </p>
                  </div>
                </div>

                {/* Info section */}
                <div className="p-5 bg-card">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{doctor.experience}</span>
                    </div>
                    <div className="w-px h-4 bg-border" />
                    <div className="flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      <span className="truncate">{doctor.education}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    to="/reservations"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-muted text-foreground text-sm font-medium rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 group/btn"
                  >
                    <span>Prendre RDV</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div
          className={`mt-20 text-center transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px bg-border" />
            <div className="w-2 h-2 rotate-45 bg-primary/40" />
            <div className="w-12 h-px bg-border" />
          </div>
          
          <div className="max-w-3xl mx-auto p-8 bg-card rounded-2xl border border-border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="font-heading text-2xl text-foreground mb-2">
                  Rejoignez notre équipe
                </h3>
                <p className="text-muted-foreground">
                  Nous recherchons des praticiens passionnés pour agrandir notre famille.
                </p>
              </div>
              <a
                href="mailto:careers@centredentaire.fr"
                className="flex items-center gap-2 px-6 py-3 bg-foreground text-background font-medium rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 whitespace-nowrap"
              >
                <span>Postuler</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Doctors;
