"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { X, Send, Check } from "lucide-react";
import { createBooking } from "@/app/actions/booking";

export default function BookingModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();

  const isOpen = searchParams.get("book") === "true";
  const initialTrip = searchParams.get("trip") || "Séjour Istanbul & Cappadoce";
  const initialAmount = searchParams.get("amount") ? parseFloat(searchParams.get("amount")!) : 165000;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pax, setPax] = useState("1");
  const [tripTitle, setTripTitle] = useState(initialTrip);
  const [totalAmount, setTotalAmount] = useState(initialAmount);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [refCode, setRefCode] = useState("");

  useEffect(() => {
    if (isOpen) {
      setTripTitle(initialTrip);
      setTotalAmount(initialAmount);
      setSubmitted(false);
      if (session?.user) {
        setFullName(session.user.name || "");
        setEmail(session.user.email || "");
      }
    }
  }, [isOpen, initialTrip, initialAmount, session]);

  if (!isOpen) return null;

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("book");
    params.delete("trip");
    params.delete("amount");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await createBooking({
        fullName,
        email: email || `${fullName.toLowerCase().replace(/\s+/g, "")}@example.com`,
        phone,
        numberOfPeople: parseInt(pax),
        tripTitle,
        totalAmount: totalAmount * parseInt(pax),
        notes,
        userId: (session?.user as any)?.id,
      });

      if (res.success) {
        setRefCode(res.reference);
        setSubmitted(true);
        
        // Open WhatsApp
        const waMsg = `Bonjour Horizon Voyages !%0AJe souhaite faire une réservation.%0A%0A*Reference:* ${res.reference}%0A*Destination:* ${tripTitle}%0A*Nom:* ${fullName}%0A*Téléphone:* ${phone}%0A*Passagers:* ${pax}%0A%0AMerci de me recontacter pour finaliser mon paiement.`;
        const whatsappUrl = `https://wa.me/213555123456?text=${waMsg}`;
        window.open(whatsappUrl, "_blank");
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={handleClose}></div>
      <div className="glass-panel bg-surface-container-high/90 w-full max-w-md rounded-2xl p-6 relative z-10 shadow-2xl border border-white/20 transition-all duration-300">
        <button 
          className="absolute top-4 right-4 text-on-surface-variant hover:text-white transition-colors" 
          onClick={handleClose}
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <>
            <h3 className="font-display text-2xl font-bold text-on-surface mb-2">Réservation Rapide</h3>
            <p className="text-sm text-on-surface-variant mb-6">
              Laissez-nous vos coordonnées. Un agent vous contactera via WhatsApp avec votre référence pour le paiement.
            </p>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-on-surface-variant uppercase tracking-wider font-bold">Nom Complet</label>
                <input 
                  className="w-full bg-white/5 border-b border-white/20 focus:border-secondary text-white px-3 py-2 outline-none transition-colors rounded-t"
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required 
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-on-surface-variant uppercase tracking-wider font-bold">Adresse Email</label>
                <input 
                  className="w-full bg-white/5 border-b border-white/20 focus:border-secondary text-white px-3 py-2 outline-none transition-colors rounded-t"
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Pour suivre votre dossier"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-on-surface-variant uppercase tracking-wider font-bold">Téléphone (WhatsApp)</label>
                <input 
                  className="w-full bg-white/5 border-b border-white/20 focus:border-secondary text-white px-3 py-2 outline-none transition-colors rounded-t"
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+213 XXXXXXXXX"
                  required 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-on-surface-variant uppercase tracking-wider font-bold">Passagers</label>
                  <select 
                    className="w-full bg-white/5 border-b border-white/20 focus:border-secondary text-white px-3 py-2 outline-none transition-colors rounded-t appearance-none"
                    value={pax}
                    onChange={(e) => setPax(e.target.value)}
                  >
                    <option value="1" className="bg-surface-container-high text-white">1 Personne</option>
                    <option value="2" className="bg-surface-container-high text-white">2 Personnes</option>
                    <option value="3" className="bg-surface-container-high text-white">3 Personnes</option>
                    <option value="4" className="bg-surface-container-high text-white">4 Personnes</option>
                    <option value="5" className="bg-surface-container-high text-white">5+ Personnes</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-on-surface-variant uppercase tracking-wider font-bold">Tarif Estimé</label>
                  <div className="px-3 py-2 text-secondary font-bold text-lg">
                    {(totalAmount * parseInt(pax)).toLocaleString()} DA
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-on-surface-variant uppercase tracking-wider font-bold">Notes / Demandes Spéciales</label>
                <textarea 
                  className="w-full bg-white/5 border-b border-white/20 focus:border-secondary text-white px-3 py-2 outline-none transition-colors rounded-t resize-none h-16"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: Chambre double, berceau..."
                />
              </div>

              <button 
                type="submit" 
                disabled={isPending}
                className="btn-primary w-full rounded-lg py-3 font-bold mt-4 flex items-center justify-center gap-2 cursor-pointer hover:btn-primary-hover disabled:opacity-50"
              >
                <Send size={16} />
                {isPending ? "Traitement..." : "Envoyer via WhatsApp"}
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-16 h-16 bg-secondary/20 border border-secondary text-secondary rounded-full flex items-center justify-center mb-4">
              <Check size={32} />
            </div>
            <h3 className="font-display text-2xl font-bold text-on-surface mb-2">Demande Envoyée !</h3>
            <p className="text-on-surface-variant text-sm mb-6 max-w-xs">
              Votre référence est <strong className="text-white text-base block my-1">{refCode}</strong>
              Nous avons ouvert WhatsApp pour envoyer votre message de finalisation.
            </p>
            <button 
              onClick={handleClose}
              className="btn-primary rounded-lg px-8 py-2.5 font-bold cursor-pointer hover:btn-primary-hover"
            >
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
