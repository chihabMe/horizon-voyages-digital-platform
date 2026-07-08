"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, Calendar, ArrowRight, Plane, Star, Send, Check } from "lucide-react";
import { createGroupTripRequest } from "@/app/actions/groupTrip";

export default function Offers() {
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [destination, setDestination] = useState("");
  const [depDate, setDepDate] = useState("");
  const [duration, setDuration] = useState("7");
  const [pax, setPax] = useState("2");
  const [budget, setBudget] = useState("180000");
  const [notes, setNotes] = useState("");

  const offers = [
    {
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
      title: "Malaisie & Singapour",
      airline: "Emirates",
      duration: "12 Jours",
      hotel: "4* & 5*",
      price: 340000,
      badge: "Incontournable",
      image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=600&auto=format&fit=crop",
      link: "/?book=true&trip=Malaisie%20%26%20Singapour&amount=340000"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await createGroupTripRequest({
        fullName,
        email: email || `${fullName.toLowerCase().replace(/\s+/g, "")}@example.com`,
        phone,
        destination,
        departureDate: depDate,
        durationDays: parseInt(duration),
        numberOfPeople: parseInt(pax),
        budgetRange: budget,
        notes,
      });

      if (res.success) {
        setSubmitted(true);
        // Clear form
        setFullName("");
        setEmail("");
        setPhone("");
        setDestination("");
        setDepDate("");
        setNotes("");
      }
    });
  };

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full min-h-[40vh] flex items-center justify-center overflow-hidden py-16">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1600&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-background/85 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto flex flex-col items-center gap-6">
          <span className="inline-block px-4 py-1.5 border border-secondary/50 rounded-full font-display text-xs text-secondary font-bold uppercase tracking-wider bg-secondary/15 backdrop-blur-sm">
            OFFRES DE GROUPE & SÉJOURS
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
            Séjours Organisés & Voyages Sur Mesure
          </h1>
          <p className="text-on-surface-variant font-light text-base leading-relaxed max-w-xl">
            Découvrez nos départs garantis ou créez un itinéraire de groupe sur-mesure pour votre entreprise, association ou famille.
          </p>
        </div>
      </section>

      {/* Grid List */}
      <section className="max-w-7xl mx-auto px-6 py-16 w-full">
        <h2 className="font-display text-2xl font-bold text-white mb-8">Départs Programmés 2026</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((tour, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-2xl overflow-hidden group flex flex-col h-[400px] relative border border-white/10"
            >
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-secondary text-primary-container font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  {tour.badge}
                </span>
              </div>

              <div className="h-44 overflow-hidden relative">
                <img 
                  src={tour.image} 
                  alt={tour.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/20 to-transparent"></div>
              </div>

              <div className="p-6 flex flex-col flex-grow justify-between bg-surface-container/30">
                <div>
                  <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-secondary transition-colors">
                    {tour.title}
                  </h3>
                  <div className="flex flex-wrap gap-y-2 gap-x-4 text-on-surface-variant text-[11px] mb-4">
                    <span className="flex items-center gap-1">
                      <Plane size={12} className="text-secondary" />
                      {tour.airline}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-secondary" />
                      {tour.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star size={12} className="fill-secondary text-secondary" />
                      {tour.hotel}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <span className="text-secondary font-bold text-xl">
                    {tour.price.toLocaleString()} DA
                  </span>
                  <div className="flex gap-2">
                    <Link 
                      href={tour.link}
                      className="glass-panel text-white hover:bg-white/10 transition-colors text-xs font-bold px-3 py-1.5 rounded-lg"
                    >
                      Détails
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Group Form Section */}
      <section className="bg-surface-container-low/30 border-t border-white/5 py-20 px-6">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col justify-center gap-6">
            <h2 className="font-display text-3xl font-bold text-white">Créer un voyage sur-mesure</h2>
            <p className="text-on-surface-variant font-light leading-relaxed">
              Vous voyagez à plus de 5 personnes ? Nous pouvons privatiser un départ, réserver des vols dédiés, organiser des événements sur place ou négocier des tarifs hôteliers exceptionnels.
            </p>
            <p className="text-on-surface-variant font-light leading-relaxed">
              Remplissez le formulaire ci-contre avec vos besoins spécifiques (destination, dates estimées, nombre de voyageurs) et nos concepteurs de voyages concevront votre itinéraire idéal.
            </p>
          </div>

          {/* Form */}
          <div className="glass-panel p-8 rounded-2xl border border-white/10 shadow-2xl relative">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h3 className="font-display text-xl font-bold text-white mb-2">Demande de Groupe</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Nom Complet</label>
                    <input 
                      type="text" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required 
                      className="w-full bg-white/5 border-b border-white/20 focus:border-secondary text-white px-3 py-2 outline-none rounded-t text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Téléphone (WhatsApp)</label>
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required 
                      placeholder="+213..."
                      className="w-full bg-white/5 border-b border-white/20 focus:border-secondary text-white px-3 py-2 outline-none rounded-t text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Adresse Email</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    className="w-full bg-white/5 border-b border-white/20 focus:border-secondary text-white px-3 py-2 outline-none rounded-t text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Destination</label>
                    <input 
                      type="text" 
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      required 
                      placeholder="Ex: Malaisie, Turquie..."
                      className="w-full bg-white/5 border-b border-white/20 focus:border-secondary text-white px-3 py-2 outline-none rounded-t text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Date de Départ Estimée</label>
                    <input 
                      type="date" 
                      value={depDate}
                      onChange={(e) => setDepDate(e.target.value)}
                      required 
                      className="w-full bg-white/5 border-b border-white/20 focus:border-secondary text-white px-3 py-2 outline-none rounded-t text-sm text-on-surface-variant"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Voyageurs</label>
                    <input 
                      type="number" 
                      value={pax}
                      onChange={(e) => setPax(e.target.value)}
                      min="1"
                      className="w-full bg-white/5 border-b border-white/20 focus:border-secondary text-white px-3 py-2 outline-none rounded-t text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Durée (Jours)</label>
                    <input 
                      type="number" 
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      min="1"
                      className="w-full bg-white/5 border-b border-white/20 focus:border-secondary text-white px-3 py-2 outline-none rounded-t text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Budget / Pers (DA)</label>
                    <select 
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full bg-white/5 border-b border-white/20 focus:border-secondary text-white px-3 py-2 outline-none rounded-t text-sm appearance-none"
                    >
                      <option value="150000" className="bg-surface-container text-white">&lt; 150K DA</option>
                      <option value="250000" className="bg-surface-container text-white">150K - 250K</option>
                      <option value="400000" className="bg-surface-container text-white">250K - 400K</option>
                      <option value="premium" className="bg-surface-container text-white">400K+ (Luxe)</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Description de votre Projet</label>
                  <textarea 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Activités prévues, préférences d'hôtels, horaires de vols souhaités..."
                    className="w-full bg-white/5 border-b border-white/20 focus:border-secondary text-white px-3 py-2 outline-none rounded-t resize-none h-20 text-sm"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isPending}
                  className="btn-primary w-full rounded-lg py-3.5 font-bold mt-4 flex items-center justify-center gap-2 cursor-pointer hover:btn-primary-hover disabled:opacity-50"
                >
                  <Send size={14} />
                  {isPending ? "Traitement..." : "Soumettre la Demande"}
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center text-center py-10">
                <div className="w-16 h-16 bg-secondary/20 border border-secondary text-secondary rounded-full flex items-center justify-center mb-6">
                  <Check size={32} />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-3">Demande Envoyée !</h3>
                <p className="text-on-surface-variant text-sm mb-8 max-w-xs font-light leading-relaxed">
                  Votre demande de voyage personnalisé a été transmise à notre service de conciergerie. Un conseiller prendra contact pour affiner l'itinéraire.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="btn-primary rounded-lg px-8 py-2.5 font-bold cursor-pointer hover:btn-primary-hover"
                >
                  Nouvelle demande
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
