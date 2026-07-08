"use client";

import React from "react";
import Link from "next/link";
import { Compass, Clock, Star, Landmark, Plane, CheckCircle2, MessageSquare, Shield, ShieldCheck, Heart } from "lucide-react";

export default function Omra() {
  const inclusions = [
    "Vol Direct Aller-Retour Alger - Médine / Djeddah - Alger avec Saudia Airlines.",
    "Hébergement de 15 jours : 5 nuits à Médine et 10 nuits à Makkah.",
    "Hôtel 5* Premium à Makkah situé en première ligne face au Haram.",
    "Hôtel 5* à Médine situé à quelques pas de la Mosquée du Prophète (SAW).",
    "Visites guidées (Mazarat) à Médine et à Makkah avec un guide spirituel qualifié.",
    "Transferts internes en bus VIP climatisé et confortable.",
    "Assistance médicale et religieuse assurée tout au long du séjour.",
    "Formalités de visa d'entrée et assurance voyage complète incluses."
  ];

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[55vh] md:h-[65vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1600&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-background/85 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto flex flex-col items-center gap-6">
          <span className="inline-block px-4 py-1.5 border border-secondary/50 rounded-full font-display text-xs text-secondary font-bold uppercase tracking-wider bg-secondary/15 backdrop-blur-sm">
            SÉJOUR SPIRITUEL EXCLUSIF
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
            Omra Premium & Hajj 2026
          </h1>
          <p className="text-on-surface-variant font-light text-base leading-relaxed max-w-xl">
            Vivez un pèlerinage mémorable et serein dans des conditions de confort absolu. Hôtels de prestige en face du Haram et accompagnement spirituel personnalisé.
          </p>
        </div>
      </section>

      {/* Details Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 w-full grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Description & Inclusions */}
        <div className="lg:col-span-2 flex flex-col gap-10">
          <div>
            <h2 className="font-display text-2xl font-bold text-white mb-4">Un pèlerinage d'exception</h2>
            <p className="text-on-surface-variant font-light leading-relaxed mb-6">
              Notre formule Omra Premium a été méticuleusement conçue pour vous permettre de vous consacrer pleinement à vos actes d'adoration, déchargé de tout souci logistique. Nous sélectionnons uniquement les meilleurs hôtels en première ligne pour vous garantir un accès immédiat et sans fatigue aux Lieux Saints.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="glass-panel p-5 rounded-2xl border border-white/5 text-center">
                <span className="text-2xl mb-2 block">🏨</span>
                <h4 className="font-bold text-white text-sm mb-1">5* Premium</h4>
                <p className="text-[11px] text-on-surface-variant">Hôtels face au Haram</p>
              </div>
              <div className="glass-panel p-5 rounded-2xl border border-white/5 text-center">
                <span className="text-2xl mb-2 block">✈️</span>
                <h4 className="font-bold text-white text-sm mb-1">Vol Direct</h4>
                <p className="text-[11px] text-on-surface-variant">Alger - Arabie Saoudite</p>
              </div>
              <div className="glass-panel p-5 rounded-2xl border border-white/5 text-center">
                <span className="text-2xl mb-2 block">🕌</span>
                <h4 className="font-bold text-white text-sm mb-1">15 Jours</h4>
                <p className="text-[11px] text-on-surface-variant">Accompagnement spirituel</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl font-bold text-white mb-6">Ce qui est inclus</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {inclusions.map((item, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <CheckCircle2 size={16} className="text-secondary mt-1 shrink-0" />
                  <p className="text-sm text-on-surface-variant font-light leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & Booking */}
        <div className="lg:col-span-1">
          <div className="glass-panel rounded-2xl p-6 border border-white/10 shadow-2xl sticky top-28 flex flex-col gap-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-display text-lg font-bold text-white">Omra Premium</h3>
                <span className="text-xs text-on-surface-variant">Saison 2026</span>
              </div>
              <span className="bg-secondary/10 border border-secondary/20 text-secondary font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">
                En Promotion
              </span>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/5 text-sm flex flex-col gap-3">
              <div className="flex justify-between items-baseline">
                <span className="text-on-surface-variant">Chambre Quadruple</span>
                <span className="text-white font-bold text-base">285 000 DA</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-on-surface-variant">Chambre Triple</span>
                <span className="text-white font-bold text-base">310 000 DA</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-on-surface-variant">Chambre Double</span>
                <span className="text-white font-bold text-base">345 000 DA</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                <ShieldCheck size={16} className="text-secondary shrink-0" />
                <span>Encadrement religieux par des imams agréés.</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                <Heart size={16} className="text-secondary shrink-0" />
                <span>Kit de pèlerin offert (sacoche, guide de poche, etc.).</span>
              </div>
            </div>

            <Link 
              href={`/?book=true&trip=${encodeURIComponent("Omra Premium")}&amount=285000`}
              className="btn-primary w-full rounded-lg py-3.5 font-bold flex items-center justify-center gap-2 cursor-pointer hover:btn-primary-hover shadow-lg shadow-secondary/15"
            >
              <MessageSquare size={16} />
              Demander des détails
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
