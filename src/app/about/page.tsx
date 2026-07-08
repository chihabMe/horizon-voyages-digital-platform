"use client";

import React, { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Check, Sparkles, ShieldCheck, Compass } from "lucide-react";
import { createContactRequest } from "@/app/actions/contact";

export default function About() {
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await createContactRequest({
        fullName,
        email,
        phone,
        subject,
        message,
      });

      if (res.success) {
        setSubmitted(true);
        // Reset form
        setFullName("");
        setEmail("");
        setPhone("");
        setSubject("");
        setMessage("");
      }
    });
  };

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full min-h-[40vh] flex items-center justify-center overflow-hidden py-16">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-background/85 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto flex flex-col items-center gap-6">
          <span className="inline-block px-4 py-1.5 border border-secondary/50 rounded-full font-display text-xs text-secondary font-bold uppercase tracking-wider bg-secondary/15 backdrop-blur-sm">
            À PROPOS DE L'AGENCE
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
            Redéfinir le Voyage Premium en Algérie
          </h1>
          <p className="text-on-surface-variant font-light text-base leading-relaxed max-w-xl">
            Horizon Voyages est un opérateur touristique agréé basé à Alger, engagé dans la création d'expériences de voyage uniques et de séjours sur mesure haut de gamme.
          </p>
        </div>
      </section>

      {/* Grid Content */}
      <section className="max-w-7xl mx-auto px-6 py-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Col: Info */}
        <div className="flex flex-col gap-8 justify-center">
          <div>
            <h2 className="font-display text-3xl font-bold text-white mb-4">Notre Philosophie</h2>
            <p className="text-on-surface-variant font-light leading-relaxed mb-4">
              Chez Horizon Voyages, nous considérons que le voyage commence dès la première idée. C'est pourquoi nous privilégions une approche personnalisée avec chaque voyageur, en intégrant des technologies modernes pour faciliter vos démarches tout en préservant un service physique chaleureux et disponible.
            </p>
            <p className="text-on-surface-variant font-light leading-relaxed">
              Qu'il s'agisse de formalités consulaires rigoureuses, de circuits d'exploration originaux ou de séjours haut de gamme dans les plus beaux hôtels, notre équipe met tout en œuvre pour que chaque voyage soit un succès.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass-panel p-5 rounded-2xl border border-white/5 flex gap-4">
              <div className="w-10 h-10 rounded-full bg-secondary/15 border border-secondary/20 text-secondary flex items-center justify-center shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm mb-1">Agréée par l'État</h4>
                <p className="text-[11px] text-on-surface-variant font-light leading-relaxed">Opérateur de tourisme agréé par le Ministère du Tourisme (N° Licence 45/2026).</p>
              </div>
            </div>
            <div className="glass-panel p-5 rounded-2xl border border-white/5 flex gap-4">
              <div className="w-10 h-10 rounded-full bg-secondary/15 border border-secondary/20 text-secondary flex items-center justify-center shrink-0">
                <Compass size={18} />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm mb-1">Service Conciergerie</h4>
                <p className="text-[11px] text-on-surface-variant font-light leading-relaxed">Une assistance active et dédiée 24/7 durant toute la durée de votre séjour.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Details / Contact Form */}
        <div className="glass-panel rounded-2xl p-8 border border-white/10 shadow-2xl relative">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <h3 className="font-display text-2xl font-bold text-white mb-6">Contactez-nous</h3>
              
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
                  <label className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Téléphone</label>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Sujet de votre message</label>
                <input 
                  type="text" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  placeholder="Ex: Demande de devis, Partenariat..."
                  className="w-full bg-white/5 border-b border-white/20 focus:border-secondary text-white px-3 py-2 outline-none rounded-t text-sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Message</label>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder="Écrivez votre message..."
                  className="w-full bg-white/5 border-b border-white/20 focus:border-secondary text-white px-3 py-2 outline-none rounded-t resize-none h-24 text-sm"
                />
              </div>

              <button 
                type="submit" 
                disabled={isPending}
                className="btn-primary w-full rounded-lg py-3.5 font-bold mt-4 flex items-center justify-center gap-2 cursor-pointer hover:btn-primary-hover disabled:opacity-50"
              >
                <Send size={14} />
                {isPending ? "Envoi..." : "Envoyer le Message"}
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center text-center py-10">
              <div className="w-16 h-16 bg-secondary/20 border border-secondary text-secondary rounded-full flex items-center justify-center mb-6">
                <Check size={32} />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-3">Message Envoyé !</h3>
              <p className="text-on-surface-variant text-sm mb-8 max-w-xs font-light leading-relaxed">
                Votre message a été transmis à notre équipe d'accueil. Nous vous répondrons dans les plus brefs délais sur votre adresse email.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="btn-primary rounded-lg px-8 py-2.5 font-bold cursor-pointer hover:btn-primary-hover"
              >
                Écrire un autre message
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Office Details */}
      <section className="bg-surface-container-low/30 border-t border-white/5 py-20 px-6">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 glass-panel rounded-2xl border border-white/5">
            <MapPin className="text-secondary mb-4" size={32} />
            <h4 className="font-bold text-white mb-2">Notre Bureau</h4>
            <p className="text-sm text-on-surface-variant font-light leading-relaxed">
              12 Rue Sidi Yahia, Hydra, Alger, Algérie
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 glass-panel rounded-2xl border border-white/5">
            <Phone className="text-secondary mb-4" size={32} />
            <h4 className="font-bold text-white mb-2">Appels & WhatsApp</h4>
            <p className="text-sm text-on-surface-variant font-light leading-relaxed">
              +213 (0) 21 55 55 55 <br />
              WhatsApp: +213 (0) 555 12 34 56
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 glass-panel rounded-2xl border border-white/5">
            <Mail className="text-secondary mb-4" size={32} />
            <h4 className="font-bold text-white mb-2">Support Email</h4>
            <p className="text-sm text-on-surface-variant font-light leading-relaxed">
              contact@horizonvoyages.dz <br />
              support@horizonvoyages.dz
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
