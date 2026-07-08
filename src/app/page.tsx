"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar as CalendarIcon, CreditCard, ShieldCheck, Compass, Award, Star, CompassIcon, Plane, Sparkles } from "lucide-react";

export default function Home() {
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [budget, setBudget] = useState("");

  const tours = [
    {
      id: "istanbul-cappadocia",
      title: "Séjour Istanbul & Cappadoce",
      airline: "Air Algérie",
      duration: "8 Jours",
      hotel: "4* Supérieur",
      price: 165000,
      badge: "Populaire",
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=600&auto=format&fit=crop",
      link: "/tours/istanbul-cappadocia"
    },
    {
      id: "omra-premium",
      title: "Omra Premium",
      airline: "Saudia",
      duration: "15 Jours",
      hotel: "5* Makkah",
      price: 285000,
      badge: "VIP",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=600&auto=format&fit=crop",
      link: "/omra"
    },
    {
      id: "malaysia-singapore",
      title: "Malaisie & Singapour",
      airline: "Emirates",
      duration: "12 Jours",
      hotel: "4* & 5*",
      price: 340000,
      badge: "Nouveau",
      image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=600&auto=format&fit=crop",
      link: "/offers"
    }
  ];

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 py-16 overflow-hidden">
        {/* Background Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 transition-all duration-700" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1548345680-f5475ea5df84?q=80&w=1600&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black/75 backdrop-blur-[1px]"></div>
        </div>

        <div className="relative z-10 w-full max-w-4xl text-center flex flex-col items-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 bg-secondary/10 border border-secondary/20 rounded-full px-4 py-1.5 text-secondary text-xs uppercase tracking-widest font-bold"
          >
            <Sparkles size={12} />
            Voyages d'exception & Services Premium
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl font-bold text-white drop-shadow-xl max-w-3xl leading-tight"
          >
            Explorez le Monde avec <span className="text-secondary">Horizon Voyages</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-on-surface-variant max-w-xl text-lg font-light leading-relaxed"
          >
            Créateur d'expériences de voyage exclusives et de séjours sur mesure au départ de l'Algérie.
          </motion.p>

          {/* Glassmorphic Search Widget */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-panel rounded-2xl p-6 w-full max-w-3xl grid grid-cols-1 md:grid-cols-4 gap-4 shadow-2xl mt-6 border border-white/10"
          >
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Destination</label>
              <div className="relative flex items-center">
                <MapPin size={16} className="absolute left-3 text-on-surface-variant" />
                <select 
                  className="w-full bg-white/5 border-b border-white/15 focus:border-secondary text-white rounded-t-md pl-10 pr-3 py-3 outline-none appearance-none transition-colors text-sm cursor-pointer"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                >
                  <option value="" className="bg-surface-container text-white">Où aller ?</option>
                  <option value="istanbul" className="bg-surface-container text-white">Istanbul & Cappadoce</option>
                  <option value="omra" className="bg-surface-container text-white">Omra Premium</option>
                  <option value="malaisie" className="bg-surface-container text-white">Malaisie & Singapour</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Durée</label>
              <div className="relative flex items-center">
                <CalendarIcon size={16} className="absolute left-3 text-on-surface-variant" />
                <select 
                  className="w-full bg-white/5 border-b border-white/15 focus:border-secondary text-white rounded-t-md pl-10 pr-3 py-3 outline-none appearance-none transition-colors text-sm cursor-pointer"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                >
                  <option value="" className="bg-surface-container text-white">Combien de jours ?</option>
                  <option value="8" className="bg-surface-container text-white">8 Jours</option>
                  <option value="12" className="bg-surface-container text-white">12 Jours</option>
                  <option value="15" className="bg-surface-container text-white">15 Jours</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Budget</label>
              <div className="relative flex items-center">
                <CreditCard size={16} className="absolute left-3 text-on-surface-variant" />
                <select 
                  className="w-full bg-white/5 border-b border-white/15 focus:border-secondary text-white rounded-t-md pl-10 pr-3 py-3 outline-none appearance-none transition-colors text-sm cursor-pointer"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                >
                  <option value="" className="bg-surface-container text-white">Budget Max</option>
                  <option value="180000" className="bg-surface-container text-white">&lt; 180 000 DA</option>
                  <option value="300000" className="bg-surface-container text-white">&lt; 300 000 DA</option>
                  <option value="premium" className="bg-surface-container text-white">Luxe / Premium</option>
                </select>
              </div>
            </div>

            <div className="flex items-end">
              <Link 
                href={
                  destination === "istanbul" 
                    ? "/tours/istanbul-cappadocia"
                    : destination === "omra"
                    ? "/omra"
                    : destination === "malaisie"
                    ? "/offers"
                    : "/?book=true"
                }
                className="btn-primary w-full rounded-lg py-3 font-bold flex items-center justify-center gap-2 cursor-pointer hover:btn-primary-hover shadow-lg shadow-secondary/10"
              >
                <Search size={16} />
                Rechercher
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tours Grid Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 w-full" id="tours">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-display text-3xl font-bold text-white mb-2 flex items-center gap-2">
              <Compass className="text-secondary" />
              Séjours Exclusifs
            </h2>
            <p className="text-on-surface-variant font-light">Des expériences inoubliables sélectionnées pour vous.</p>
          </div>
          <Link 
            href="/offers" 
            className="hidden sm:flex text-secondary items-center gap-1.5 hover:underline font-semibold"
          >
            Voir tout <Plane size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel rounded-2xl overflow-hidden group flex flex-col h-[420px] relative border border-white/10"
            >
              {/* Badge */}
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-secondary text-primary-container font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  {tour.badge}
                </span>
              </div>

              {/* Cover Image */}
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={tour.image} 
                  alt={tour.title}
                  className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/20 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow justify-between bg-surface-container/30">
                <div>
                  <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-secondary transition-colors">
                    {tour.title}
                  </h3>
                  <div className="flex flex-wrap gap-y-2 gap-x-4 text-on-surface-variant text-xs mb-4">
                    <span className="flex items-center gap-1">
                      <Plane size={14} className="text-secondary" />
                      {tour.airline}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarIcon size={14} className="text-secondary" />
                      {tour.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star size={14} className="fill-secondary text-secondary" />
                      {tour.hotel}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <span className="text-secondary font-bold text-2xl">
                    {tour.price.toLocaleString()} DA
                  </span>
                  <div className="flex gap-2">
                    <Link 
                      href={tour.link}
                      className="glass-panel text-white hover:bg-white/10 transition-colors text-xs font-bold px-4 py-2 rounded-lg"
                    >
                      Détails
                    </Link>
                    <Link 
                      href={`/?book=true&trip=${encodeURIComponent(tour.title)}&amount=${tour.price}`}
                      className="btn-primary px-4 py-2 rounded-lg text-xs font-bold hover:btn-primary-hover shadow shadow-secondary/15"
                    >
                      Réserver
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services & Payment Grid */}
      <section className="bg-surface-container-low py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Visa Assistance Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel rounded-2xl p-8 flex flex-col gap-6 border-l-4 border-l-secondary"
          >
            <div className="flex items-center gap-3">
              <Award className="text-secondary" size={32} />
              <h2 className="font-display text-2xl font-bold text-white">Assistance Visa</h2>
            </div>
            <p className="text-on-surface-variant font-light leading-relaxed">
              Notre équipe d'experts vous accompagne pas à pas dans vos dossiers consulaires, en assurant une préparation méticuleuse pour optimiser le taux de réussite de vos demandes de visa.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-auto">
              <Link href="/visa?type=schengen" className="bg-white/5 hover:bg-white/10 transition-colors rounded-xl p-4 flex items-center gap-3 border border-white/5">
                <span className="text-secondary text-sm font-semibold">Espace Schengen</span>
              </Link>
              <Link href="/visa?type=turkey" className="bg-white/5 hover:bg-white/10 transition-colors rounded-xl p-4 flex items-center gap-3 border border-white/5">
                <span className="text-secondary text-sm font-semibold">E-Visa Turquie</span>
              </Link>
              <Link href="/visa?type=dubai" className="bg-white/5 hover:bg-white/10 transition-colors rounded-xl p-4 flex items-center gap-3 border border-white/5">
                <span className="text-secondary text-sm font-semibold">Dubaï / E.A.U</span>
              </Link>
              <Link href="/visa?type=uk" className="bg-white/5 hover:bg-white/10 transition-colors rounded-xl p-4 flex items-center gap-3 border border-white/5">
                <span className="text-secondary text-sm font-semibold">Royaume-Uni</span>
              </Link>
            </div>
          </motion.div>

          {/* Secure Payment Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel rounded-2xl p-8 flex flex-col gap-6 relative overflow-hidden"
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl"></div>
            <div className="flex items-center gap-3 relative z-10">
              <ShieldCheck className="text-secondary" size={32} />
              <h2 className="font-display text-2xl font-bold text-white">Solutions de Paiement Flexibles</h2>
            </div>
            <p className="text-on-surface-variant font-light leading-relaxed">
              Nous facilitons la finalisation de vos réservations grâce à des méthodes sécurisées et adaptées à vos besoins, directement en Algérie.
            </p>
            <div className="flex flex-col gap-4 mt-auto">
              <div className="flex items-center gap-4 bg-white/5 p-3.5 rounded-xl border border-white/5">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                  <CreditCard size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Paiement en Agence</h4>
                  <p className="text-xs text-on-surface-variant">Espèces ou Chèque (Hydra Sidi Yahia, Alger)</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/5 p-3.5 rounded-xl border border-white/5">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                  <CompassIcon size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Virement Bancaire / CCP</h4>
                  <p className="text-xs text-on-surface-variant">Transaction sécurisée avec envoi de reçu numérique</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/5 p-3.5 rounded-xl border border-white/5">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                  <Plane size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">BaridiMob</h4>
                  <p className="text-xs text-on-surface-variant">Instant et sécurisé depuis votre smartphone</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
