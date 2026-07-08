"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useSession } from "next-auth/react";
import { Search, User as UserIcon, Calendar, Info, Clock, CheckCircle, XCircle, AlertCircle, ShieldAlert, Sparkles, MapPin, DollarSign, Users, ChevronRight, Phone } from "lucide-react";
import Link from "next/link";

interface BookingData {
  id: string;
  reference: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  totalAmount: number;
  departureDate: string;
  returnDate: string;
  tripTitle: string;
  numberOfPeople: number;
  notes: string | null;
  createdAt: string;
}

export default function Booking() {
  const { data: session, status: authStatus } = useSession();
  const [isPending, startTransition] = useTransition();

  // Search state
  const [searchRef, setSearchRef] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchResults, setSearchResults] = useState<BookingData | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [searchError, setSearchError] = useState("");

  // User bookings state
  const [userBookings, setUserBookings] = useState<BookingData[]>([]);
  const [userBookingsLoaded, setUserBookingsLoaded] = useState(false);

  // Fetch user bookings when authenticated
  useEffect(() => {
    if (session?.user) {
      fetchUserBookings();
    } else if (authStatus === "unauthenticated") {
      setUserBookings([]);
      setUserBookingsLoaded(true);
    }
  }, [session, authStatus]);

  const fetchUserBookings = async () => {
    try {
      const res = await fetch("/api/user-bookings");
      if (res.ok) {
        const data = await res.json();
        setUserBookings(data);
      }
    } catch (err) {
      console.error("Error fetching user bookings:", err);
    } finally {
      setUserBookingsLoaded(true);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError("");
    setSearchAttempted(true);

    startTransition(async () => {
      try {
        const queryParams = new URLSearchParams({
          reference: searchRef,
          lastName: searchName,
        });
        const res = await fetch(`/api/search-booking?${queryParams.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data);
        } else {
          setSearchResults(null);
          if (res.status === 404) {
            setSearchError("Aucune réservation trouvée avec ces coordonnées.");
          } else {
            setSearchError("Une erreur est survenue lors de la recherche.");
          }
        }
      } catch (err) {
        setSearchResults(null);
        setSearchError("Une erreur réseau est survenue.");
      }
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return <CheckCircle className="text-emerald-400" size={18} />;
      case "CANCELLED":
        return <XCircle className="text-rose-400" size={18} />;
      case "COMPLETED":
        return <CheckCircle className="text-blue-400" size={18} />;
      default:
        return <Clock className="text-secondary" size={18} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "Confirmé";
      case "CANCELLED":
        return "Annulé";
      case "COMPLETED":
        return "Terminé";
      default:
        return "En attente de paiement";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-emerald-500/10 border-emerald-500/20 text-emerald-400";
      case "CANCELLED":
        return "bg-rose-500/10 border-rose-500/20 text-rose-400";
      case "COMPLETED":
        return "bg-blue-500/10 border-blue-500/20 text-blue-400";
      default:
        return "bg-secondary/10 border-secondary/20 text-secondary";
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-12 max-w-2xl mt-4">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">Mon Voyage</h1>
        <p className="text-lg text-on-surface-variant font-light">Suivi de Réservation & Documents de Voyage</p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Search Panel */}
        <div className="glass-panel rounded-2xl p-8 md:col-span-3 shadow-2xl relative overflow-hidden group">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] pointer-events-none transition-all duration-700"></div>
          <div className="relative z-10 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <Search className="text-secondary" size={28} />
              <h2 className="font-display text-2xl font-bold text-white">Rechercher un dossier</h2>
            </div>
            <p className="text-on-surface-variant text-sm font-light leading-relaxed">
              Entrez votre référence de réservation (Ref: HV-XXXXXX) et votre nom pour accéder aux détails confidentiels et au statut de paiement.
            </p>

            <form onSubmit={handleSearch} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
                  Référence de Réservation
                </label>
                <div className="relative flex items-center">
                  <Search className="absolute left-3 text-on-surface-variant" size={16} />
                  <input
                    type="text"
                    required
                    placeholder="Ex: HV-123456"
                    value={searchRef}
                    onChange={(e) => setSearchRef(e.target.value)}
                    className="w-full bg-white/5 border-b border-white/20 focus:border-secondary text-white px-3 py-3 pl-10 outline-none transition-colors rounded-t text-sm uppercase"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
                  Nom du Voyageur
                </label>
                <div className="relative flex items-center">
                  <UserIcon className="absolute left-3 text-on-surface-variant" size={16} />
                  <input
                    type="text"
                    required
                    placeholder="Tel qu'inscrit lors de la réservation"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="w-full bg-white/5 border-b border-white/20 focus:border-secondary text-white px-3 py-3 pl-10 outline-none transition-colors rounded-t text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="btn-primary w-full rounded-lg py-3.5 font-bold mt-2 flex items-center justify-center gap-2 cursor-pointer hover:btn-primary-hover disabled:opacity-50"
              >
                {isPending ? "Recherche..." : "Rechercher mon voyage"}
              </button>
            </form>

            {searchAttempted && searchError && (
              <div className="bg-error/15 border border-error/20 text-error text-xs rounded-xl p-3.5 flex items-center gap-2 mt-2">
                <AlertCircle size={16} className="shrink-0" />
                <span>{searchError}</span>
              </div>
            )}
          </div>
        </div>

        {/* Info Side Panel */}
        <div className="glass-panel rounded-2xl p-8 md:col-span-2 flex flex-col justify-between relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1548345680-f5475ea5df84?q=80&w=600&auto=format&fit=crop')" }}>
          <div className="absolute inset-0 bg-background/90 backdrop-blur-sm z-0"></div>
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <h3 className="font-display text-xl font-bold text-white mb-6">Besoin d'aide ?</h3>
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary/15 flex items-center justify-center text-secondary shrink-0">
                    <Phone size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">Service Conciergerie</h4>
                    <p className="text-on-surface-variant text-xs mt-0.5">Disponible 24/7 pour nos clients VIP.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary/15 flex items-center justify-center text-secondary shrink-0">
                    <Info size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">Où trouver ma référence ?</h4>
                    <p className="text-on-surface-variant text-xs mt-0.5">Votre code à 8 chiffres (HV-XXXXXX) est dans le message de validation WhatsApp.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10">
              <a 
                href="https://wa.me/213555123456" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-white transition-colors font-semibold"
              >
                Nous contacter via WhatsApp <ChevronRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Search Result Detail */}
      {searchResults && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl glass-panel rounded-2xl p-8 shadow-2xl mt-8 border border-white/10"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs text-on-surface-variant uppercase tracking-wider font-bold">Référence</span>
                <span className="text-lg text-white font-mono font-bold">{searchResults.reference}</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white">{searchResults.tripTitle}</h3>
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold ${getStatusBg(searchResults.status)}`}>
              {getStatusIcon(searchResults.status)}
              <span>{getStatusText(searchResults.status)}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-secondary shrink-0 mt-0.5" size={16} />
                <div>
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-wider block font-bold">Voyageur Principal</span>
                  <span className="text-sm text-white font-medium">{searchResults.clientName}</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="text-secondary shrink-0 mt-0.5" size={16} />
                <div>
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-wider block font-bold">Contact</span>
                  <span className="text-sm text-white font-medium">{searchResults.clientPhone}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <Calendar className="text-secondary shrink-0 mt-0.5" size={16} />
                <div>
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-wider block font-bold">Dates Prévues</span>
                  <span className="text-sm text-white font-medium">
                    {new Date(searchResults.departureDate).toLocaleDateString("fr-FR")} au {new Date(searchResults.returnDate).toLocaleDateString("fr-FR")}
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="text-secondary shrink-0 mt-0.5" size={16} />
                <div>
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-wider block font-bold">Passagers</span>
                  <span className="text-sm text-white font-medium">{searchResults.numberOfPeople} Personne(s)</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <DollarSign className="text-secondary shrink-0 mt-0.5" size={16} />
                <div>
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-wider block font-bold">Montant Total</span>
                  <span className="text-lg text-secondary font-bold">{searchResults.totalAmount.toLocaleString()} DA</span>
                </div>
              </div>
              {searchResults.notes && (
                <div className="flex items-start gap-3">
                  <Info className="text-secondary shrink-0 mt-0.5" size={16} />
                  <div>
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-wider block font-bold">Notes</span>
                    <p className="text-xs text-on-surface-variant italic font-light max-w-xs">{searchResults.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* User Bookings Section */}
      {session && userBookingsLoaded && (
        <div className="w-full max-w-4xl mt-12">
          <h2 className="font-display text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Sparkles className="text-secondary" size={20} />
            Mes Réservations Historiques
          </h2>

          {userBookings.length > 0 ? (
            <div className="flex flex-col gap-4">
              {userBookings.map((booking) => (
                <div 
                  key={booking.id}
                  className="glass-panel rounded-2xl p-6 shadow-lg border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-white/10 transition-all"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Ref:</span>
                      <span className="text-sm text-white font-mono font-bold">{booking.reference}</span>
                      <span className="text-[10px] text-on-surface-variant font-bold ml-2">
                        {new Date(booking.createdAt).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-white">{booking.tripTitle}</h3>
                    <p className="text-xs text-on-surface-variant mt-1">
                      {booking.numberOfPeople} personne(s) • Total: <strong className="text-secondary">{booking.totalAmount.toLocaleString()} DA</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-white/5">
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${getStatusBg(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                      <span>{getStatusText(booking.status)}</span>
                    </div>
                    <button
                      onClick={() => {
                        setSearchRef(booking.reference);
                        setSearchName(booking.clientName);
                        setSearchResults(booking);
                      }}
                      className="glass-panel hover:bg-white/10 text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer"
                    >
                      Détails
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-panel rounded-2xl p-8 text-center border border-white/5">
              <Info className="text-on-surface-variant mx-auto mb-3" size={32} />
              <h4 className="text-white font-semibold mb-1">Aucune réservation liée</h4>
              <p className="text-sm text-on-surface-variant font-light">
                Vous n'avez pas encore de réservations enregistrées avec cette adresse email.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
