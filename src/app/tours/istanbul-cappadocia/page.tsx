"use client";

import React from "react";
import Link from "next/link";
import { Compass, Clock, Star, Landmark, Plane, CheckCircle2, ChevronRight, MessageSquare, Coffee, Users, Shield } from "lucide-react";

export default function IstanbulTour() {
  const images = [
    "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1535914251211-4856f62b083c?q=80&w=400&auto=format&fit=crop"
  ];

  const highlights = [
    { title: "Vol Direct Aller-Retour", desc: "Vols réguliers avec Air Algérie (Alger - Istanbul - Alger) inclus.", icon: <Plane size={18} /> },
    { title: "Hôtels 4* Supérieur", desc: "Hôtel sélectionné avec soin dans le centre d'Istanbul, petit-déjeuner inclus.", icon: <Star size={18} /> },
    { title: "Escapade Cappadoce", desc: "2 Jours/1 Nuit en Cappadoce avec visite des cheminées de fées et vol en montgolfière optionnel.", icon: <Landmark size={18} /> },
    { title: "Guide Francophone", desc: "Accompagnement par un guide professionnel certifié pour toutes les visites.", icon: <Users size={18} /> }
  ];

  const itinerary = [
    { day: "Jour 1", title: "Arrivée à Istanbul & Installation", desc: "Vol vers Istanbul. Accueil par notre équipe et transfert privé vers votre hôtel 4* au centre-ville. Soirée libre." },
    { day: "Jour 2", title: "Palais de Topkapi & Hagia Sophia", desc: "Journée de visite historique : le Palais de Topkapi (résidence des sultans), la Mosquée Bleue, et la majestueuse basilique Hagia Sophia." },
    { day: "Jour 3", title: "Croisière sur le Bosphore & Grand Bazar", desc: "Matinée croisière privée sur le Bosphore. Après-midi shopping guidé au mythique Grand Bazar et au Bazar Égyptien." },
    { day: "Jour 4", title: "Vol vers la Cappadoce", desc: "Transfert matinal à l'aéroport et vol domestique vers la Cappadoce. Installation dans votre hôtel troglodyte premium." },
    { day: "Jour 5", title: "Montgolfière & Vallée de Göreme", desc: "Aube : Vol en montgolfière optionnel. Journée : Musée en plein air de Göreme, cheminées de fées de Pasabag et vallée d'Uchisar." },
    { day: "Jour 6", title: "Retour à Istanbul", desc: "Vol retour vers Istanbul. Installation à l'hôtel. Temps libre pour des activités individuelles et dîner d'adieu." },
    { day: "Jour 7", title: "Journée Libre & Détente", desc: "Journée libre pour flâner dans le quartier de Galata, faire un hammam traditionnel ou faire des achats de dernière minute." },
    { day: "Jour 8", title: "Départ pour Alger", desc: "Petit-déjeuner à l'hôtel, temps libre puis transfert vers l'aéroport d'Istanbul pour votre vol retour vers Alger." }
  ];

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Hero Gallery */}
      <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3 gap-1.5 p-1.5">
          <div className="md:col-span-2 relative h-full">
            <img 
              src={images[0]} 
              alt="Hagia Sophia Istanbul" 
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div className="hidden md:grid grid-rows-2 gap-1.5 h-full">
            <div className="relative h-full">
              <img 
                src={images[1]} 
                alt="Turkish Tea" 
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div className="relative h-full">
              <img 
                src={images[2]} 
                alt="Grand Bazaar" 
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-8 max-w-7xl mx-auto md:left-1/2 md:-translate-x-1/2 z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-secondary text-primary-container font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  Luxury Stay
                </span>
                <span className="bg-white/10 text-white border border-white/15 font-display text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                  8 Jours / 7 Nuits
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
                Magie d'Istanbul & Cappadoce
              </h1>
              <p className="text-on-surface-variant flex items-center gap-1.5 font-light text-base">
                <Compass className="text-secondary" size={18} />
                Istanbul & Cappadoce, Turquie
              </p>
            </div>
            
            <div className="glass-panel p-6 rounded-2xl text-right shrink-0 border border-white/10 backdrop-blur-md shadow-2xl">
              <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold mb-1">À partir de</p>
              <p className="text-3xl text-secondary font-bold font-display">165,000 DA</p>
              <p className="text-xs text-on-surface-variant font-light">Par voyageur en chambre double</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 w-full grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 flex flex-col gap-12">
          {/* Highlights */}
          <div>
            <h3 className="font-display text-2xl font-bold text-white mb-6">Points Forts du Voyage</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {highlights.map((h, idx) => (
                <div key={idx} className="glass-panel p-5 rounded-2xl border border-white/5 flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/15 border border-secondary/20 text-secondary flex items-center justify-center shrink-0">
                    {h.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm mb-1">{h.title}</h4>
                    <p className="text-xs text-on-surface-variant font-light leading-relaxed">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Itinerary */}
          <div>
            <h3 className="font-display text-2xl font-bold text-white mb-6">Programme Détaillé</h3>
            <div className="relative border-l border-white/10 pl-6 space-y-8 ml-3">
              {itinerary.map((step, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline Dot */}
                  <span className="absolute -left-[31px] top-1 w-4.5 h-4.5 rounded-full bg-surface-container border border-secondary flex items-center justify-center shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  </span>
                  <div>
                    <span className="bg-secondary/10 border border-secondary/20 text-secondary font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md inline-block mb-1.5">
                      {step.day}
                    </span>
                    <h4 className="font-bold text-white text-base mb-1">{step.title}</h4>
                    <p className="text-sm text-on-surface-variant font-light leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & Booking Widget */}
        <div className="lg:col-span-1">
          <div className="glass-panel rounded-2xl p-6 border border-white/10 shadow-2xl sticky top-28 flex flex-col gap-6">
            <h3 className="font-display text-xl font-bold text-white">Réservation de Séjour</h3>
            
            <div className="flex flex-col gap-4 bg-white/5 rounded-xl p-4 border border-white/5 text-sm">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Hébergement</span>
                <span className="text-white font-medium">Hôtel 4* Supérieur</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Vols</span>
                <span className="text-white font-medium">Air Algérie (Alger-Ist)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Régime</span>
                <span className="text-white font-medium">Petit-déjeuner inclus</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Visites incluses</span>
                <span className="text-white font-medium">Toutes sauf options</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2.5 text-xs text-on-surface-variant bg-white/5 py-3 px-4 rounded-xl border border-white/5">
                <Shield size={16} className="text-secondary shrink-0" />
                <span>Paiement sécurisé et flexible en agence à Alger (Hydra) ou par virement CCP.</span>
              </div>
            </div>

            <Link 
              href={`/?book=true&trip=${encodeURIComponent("Séjour Istanbul & Cappadoce")}&amount=165000`}
              className="btn-primary w-full rounded-lg py-3.5 font-bold flex items-center justify-center gap-2 cursor-pointer hover:btn-primary-hover shadow-lg shadow-secondary/15"
            >
              <MessageSquare size={16} />
              Réserver via WhatsApp
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
