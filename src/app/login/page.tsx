"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, ArrowRight, ShieldAlert, Sparkles } from "lucide-react";
import Logo from "@/components/Logo";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password: "demopassword", // Static password for demo credentials provider
        redirect: false,
        callbackUrl,
      });

      if (res?.error) {
        setError("Une erreur est survenue lors de l'authentification.");
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError("Impossible de se connecter. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[75vh] flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl -z-10"></div>

      <div className="glass-panel w-full max-w-md rounded-2xl p-8 shadow-2xl border border-white/10 flex flex-col gap-6">
        <div className="flex flex-col items-center text-center gap-2">
          <Logo className="h-12 w-auto mb-2" />
          <h2 className="font-display text-2xl font-bold text-white">Espace Voyageur</h2>
          <p className="text-sm text-on-surface-variant max-w-xs font-light">
            Connectez-vous pour suivre vos réservations et vos demandes de visa.
          </p>
        </div>

        {error && (
          <div className="bg-error/15 border border-error/30 text-error text-xs rounded-xl p-3.5 flex items-center gap-2.5">
            <ShieldAlert size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-on-surface-variant uppercase tracking-wider font-bold">
              Adresse Email
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 text-on-surface-variant" size={16} />
              <input
                type="email"
                required
                placeholder="Ex: voyageur@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border-b border-white/20 focus:border-secondary text-white px-3 py-3 pl-10 outline-none transition-colors rounded-t text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full rounded-lg py-3.5 font-bold mt-2 flex items-center justify-center gap-2 cursor-pointer hover:btn-primary-hover disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Accéder à mon espace"}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 text-[11px] text-on-surface-variant bg-white/5 py-2 px-4 rounded-full border border-white/5 self-center mt-2">
          <Sparkles size={12} className="text-secondary" />
          <span>Accès rapide sans mot de passe pour la démo</span>
        </div>
      </div>
    </div>
  );
}
