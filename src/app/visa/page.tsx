"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Award, Compass, Send, Check, Plane, HelpCircle } from "lucide-react";
import { createVisaRequest } from "@/app/actions/visa";

export default function Visa() {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);

  const initialType = searchParams.get("type") || "schengen";

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [destination, setDestination] = useState(initialType);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setDestination(initialType);
  }, [initialType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await createVisaRequest({
        fullName,
        phone,
        email: email || `${fullName.toLowerCase().replace(/\s+/g, "")}@example.com`,
        destination,
        notes,
      });
      if (res.success) {
        setSubmitted(true);
        // Clean form
        setFullName("");
        setPhone("");
        setEmail("");
        setNotes("");
      }
    });
  };

  const visaTypes = [
    {
      id: "schengen",
      title: "Visa Schengen",
      icon: "🇪🇺",
      description: "Assistance complète pour les 27 pays européens de l'Espace Schengen. Prise de rendez-vous VFS/TLS/BLS et vérification rigoureuse du dossier financier.",
      bgImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "uk",
      title: "Royaume-Uni",
      icon: "🇬🇧",
      description: "Visas Standard Visitor. Accompagnement premium pour le montage de dossiers complexes et conformes aux exigences rigoureuses du UK Visas & Immigration.",
      bgImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "dubai",
      title: "Visa Dubaï (EAU)",
      icon: "🇦🇪",
      description: "Visas touristiques d'entrée unique ou multiple (30 ou 60 jours). Procédure 100% numérisée avec un taux de réussite garanti et un minimum de documents.",
      bgImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "turkey",
      title: "E-Visa Turquie",
      icon: "🇹🇷",
      description: "Traitement express en 24h à 48h de votre visa ou pré-enregistrement pour la Turquie. Simple, entièrement en ligne et sécurisé.",
      bgImage: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full min-h-[50vh] flex items-center justify-center overflow-hidden py-16">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1600&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-background/85 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto flex flex-col items-center gap-6">
          <span className="inline-block px-4 py-1.5 border border-secondary/50 rounded-full font-display text-xs text-secondary font-bold uppercase tracking-wider bg-secondary/15 backdrop-blur-sm">
            SERVICE CONCIERGERIE
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight">
            Votre Passeport pour le <span className="text-secondary">Monde</span>
          </h1>
          <p className="text-on-surface-variant font-light text-lg leading-relaxed max-w-xl">
            Schengen, Royaume-Uni, Turquie ou Dubaï : nous gérons la complexité des formulaires, des rendez-vous et des pièces justificatives.
          </p>
        </div>
      </section>

      {/* Destinations Bento Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            <Compass className="text-secondary" />
            Destinations Phares
          </h2>
          <p className="text-on-surface-variant font-light">Des solutions sur-mesure adaptées aux exigences de chaque consulat.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {visaTypes.map((visa, index) => (
            <motion.div
              key={visa.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel rounded-2xl overflow-hidden group flex flex-col h-[280px] relative border border-white/10"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-45 transition-opacity duration-500" 
                style={{ backgroundImage: `url('${visa.bgImage}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
              <div className="relative z-10 p-6 flex flex-col h-full justify-end">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-display text-2xl font-bold text-white flex items-center gap-2">
                    <span className="text-xl">{visa.icon}</span> {visa.title}
                  </h3>
                  {visa.id === "turkey" && (
                    <span className="bg-secondary text-primary-container font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded shadow-md">
                      Rapide
                    </span>
                  )}
                </div>
                <p className="text-on-surface-variant text-sm font-light leading-relaxed max-w-md">
                  {visa.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-surface-container-low/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-white mb-2">Notre Processus d'Accompagnement</h2>
            <p className="text-on-surface-variant font-light">Une méthodologie rigoureuse pour optimiser l'obtention de votre visa.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="glass-panel p-6 rounded-2xl text-center bg-surface-container-lowest border border-white/10 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-surface-container border border-secondary flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(235,194,70,0.2)]">
                <span className="font-display text-lg font-bold text-secondary">1</span>
              </div>
              <h4 className="font-bold text-white mb-2">Consultation</h4>
              <p className="text-xs text-on-surface-variant font-light leading-relaxed">Évaluation personnalisée de votre profil et choix du type de visa.</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl text-center bg-surface-container-lowest border border-white/10 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-surface-container border border-white/10 flex items-center justify-center mb-4">
                <span className="font-display text-lg font-bold text-white">2</span>
              </div>
              <h4 className="font-bold text-white mb-2">Constitution</h4>
              <p className="text-xs text-on-surface-variant font-light leading-relaxed">Vérification méticuleuse, traduction et mise en conformité de vos pièces.</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl text-center bg-surface-container-lowest border border-white/10 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-surface-container border border-white/10 flex items-center justify-center mb-4">
                <span className="font-display text-lg font-bold text-white">3</span>
              </div>
              <h4 className="font-bold text-white mb-2">Rendez-vous</h4>
              <p className="text-xs text-on-surface-variant font-light leading-relaxed">Réservation de votre rendez-vous consulaire et préparation à l'entretien.</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl text-center bg-surface-container-lowest border border-white/10 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-surface-container border border-white/10 flex items-center justify-center mb-4">
                <span className="font-display text-lg font-bold text-white">4</span>
              </div>
              <h4 className="font-bold text-white mb-2">Suivi Actif</h4>
              <p className="text-xs text-on-surface-variant font-light leading-relaxed">Notification régulière et récupération sécurisée de votre passeport.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form & Documents Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12" id="contact">
        <div className="flex flex-col justify-center gap-6">
          <h2 className="font-display text-3xl font-bold text-white">Prêt à constituer votre dossier ?</h2>
          <p className="text-on-surface-variant font-light leading-relaxed">
            Chaque ambassade a ses propres règles, mais voici les bases généralement indispensables pour entamer vos démarches :
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="text-secondary shrink-0 mt-1" size={18} />
              <div>
                <span className="font-semibold text-white text-sm block">Passeport original</span>
                <span className="text-xs text-on-surface-variant">Valide 6 mois après la date de retour et ayant 2 pages vierges.</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-secondary shrink-0 mt-1" size={18} />
              <div>
                <span className="font-semibold text-white text-sm block">Justificatifs Professionnels</span>
                <span className="text-xs text-on-surface-variant">Attestation de travail, titre de congé, 3 fiches de paie (salariés) ou Registre de commerce (prof. libérales).</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-secondary shrink-0 mt-1" size={18} />
              <div>
                <span className="font-semibold text-white text-sm block">Moyens Financiers</span>
                <span className="text-xs text-on-surface-variant">Relevé de compte bancaire Dinars & Devises récent (3 derniers mois minimum).</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass-panel p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
          {!submitted ? (
            <>
              <h3 className="font-display text-2xl font-bold text-white mb-6">Demande d'Assistance Rapide</h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Nom Complet</label>
                    <input 
                      className="w-full bg-white/5 border-b border-white/20 focus:border-secondary text-white px-3 py-2 outline-none transition-colors rounded-t text-sm"
                      type="text" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Téléphone</label>
                    <input 
                      className="w-full bg-white/5 border-b border-white/20 focus:border-secondary text-white px-3 py-2 outline-none transition-colors rounded-t text-sm"
                      type="tel" 
                      placeholder="+213 XXXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Adresse Email</label>
                  <input 
                    className="w-full bg-white/5 border-b border-white/20 focus:border-secondary text-white px-3 py-2 outline-none transition-colors rounded-t text-sm"
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Destination Souhaitée</label>
                  <select 
                    className="w-full bg-white/5 border-b border-white/20 focus:border-secondary text-white px-3 py-2 outline-none transition-colors rounded-t appearance-none text-sm"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  >
                    <option value="schengen" className="bg-surface-container-high text-white">Visa Schengen</option>
                    <option value="turkey" className="bg-surface-container-high text-white">E-Visa Turquie</option>
                    <option value="dubai" className="bg-surface-container-high text-white">Visa Dubaï</option>
                    <option value="uk" className="bg-surface-container-high text-white">Visa Royaume-Uni</option>
                    <option value="other" className="bg-surface-container-high text-white">Autre Destination</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Message (Optionnel)</label>
                  <textarea 
                    className="w-full bg-white/5 border-b border-white/20 focus:border-secondary text-white px-3 py-2 outline-none transition-colors rounded-t resize-none h-20 text-sm"
                    placeholder="Précisez votre statut (salarié, commerçant, étudiant...)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isPending}
                  className="btn-primary w-full rounded-lg py-3.5 font-bold mt-4 flex items-center justify-center gap-2 cursor-pointer hover:btn-primary-hover disabled:opacity-50"
                >
                  <Send size={14} />
                  {isPending ? "Envoi..." : "Envoyer ma Demande"}
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center text-center py-10">
              <div className="w-16 h-16 bg-secondary/20 border border-secondary text-secondary rounded-full flex items-center justify-center mb-6">
                <Check size={32} />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-3">Demande Reçue !</h3>
              <p className="text-on-surface-variant text-sm mb-8 max-w-xs font-light leading-relaxed">
                Merci ! Un de nos conseillers spécialisés en formalités consulaires analysera vos informations et vous contactera sous 24h.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="btn-primary rounded-lg px-8 py-2.5 font-bold cursor-pointer hover:btn-primary-hover"
              >
                Faire une autre demande
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
