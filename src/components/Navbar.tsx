"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, Languages, LogOut, User as UserIcon, Calendar, CheckSquare, Shield } from "lucide-react";
import Logo from "./Logo";

export default function Navbar() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <nav className="bg-background/80 backdrop-blur-lg border-b border-white/10 fixed top-0 w-full z-40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center w-full">
        {/* Logo and Nav links */}
        <div className="flex items-center gap-8">
          <Link href="/">
            <Logo className="h-10 w-auto cursor-pointer" />
          </Link>
          <div className="hidden md:flex gap-6 ml-8">
            <Link 
              href="/#tours" 
              className="text-on-surface-variant hover:text-white transition-colors text-sm font-semibold"
            >
              Tours
            </Link>
            <Link 
              href="/visa" 
              className="text-on-surface-variant hover:text-white transition-colors text-sm font-semibold"
            >
              Visa Assistance
            </Link>
            <Link 
              href="/offers" 
              className="text-on-surface-variant hover:text-white transition-colors text-sm font-semibold"
            >
              Groupes & Offres
            </Link>
            <Link 
              href="/omra" 
              className="text-on-surface-variant hover:text-white transition-colors text-sm font-semibold"
            >
              Omra & Hajj
            </Link>
            <Link 
              href="/about" 
              className="text-on-surface-variant hover:text-white transition-colors text-sm font-semibold"
            >
              À Propos
            </Link>
            {session && (
              <Link 
                href="/booking" 
                className="text-secondary hover:brightness-110 transition-all text-sm font-semibold flex items-center gap-1.5"
              >
                <Calendar size={14} />
                Suivi Réservation
              </Link>
            )}
          </div>
        </div>

        {/* Buttons and Profile */}
        <div className="flex items-center gap-4">
          {session ? (
            <div className="relative">
              <button 
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 text-sm font-medium text-white hover:text-secondary transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-secondary/20 border border-secondary text-secondary flex items-center justify-center font-bold">
                  {session.user?.name?.[0]?.toUpperCase() || session.user?.email?.[0]?.toUpperCase()}
                </div>
                <span className="hidden sm:inline max-w-[120px] truncate">{session.user?.name || session.user?.email}</span>
              </button>
              
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-surface-container border border-white/10 z-50">
                  <Link
                    href="/booking"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-on-surface hover:bg-white/5 transition-colors"
                  >
                    <CheckSquare size={14} />
                    Mes Réservations
                  </Link>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      signOut();
                    }}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-error hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <LogOut size={14} />
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link 
              href="/login" 
              className="text-on-surface-variant hover:text-white transition-colors text-sm font-semibold flex items-center gap-1"
            >
              <UserIcon size={14} />
              Connexion
            </Link>
          )}

          <Link 
            href="/?book=true"
            className="btn-primary font-bold rounded-lg px-5 py-2 text-xs uppercase tracking-wider flex items-center hover:btn-primary-hover"
          >
            Réserver
          </Link>

          {/* Mobile menu toggle */}
          <button 
            onClick={toggleMobileMenu} 
            className="md:hidden text-white focus:outline-none ml-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-white/10 px-6 py-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top duration-200">
          <Link 
            href="/#tours" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-on-surface-variant hover:text-white transition-colors text-base font-semibold py-1"
          >
            Tours
          </Link>
          <Link 
            href="/visa" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-on-surface-variant hover:text-white transition-colors text-base font-semibold py-1"
          >
            Visa Assistance
          </Link>
          <Link 
            href="/offers" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-on-surface-variant hover:text-white transition-colors text-base font-semibold py-1"
          >
            Groupes & Offres
          </Link>
          <Link 
            href="/omra" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-on-surface-variant hover:text-white transition-colors text-base font-semibold py-1"
          >
            Omra & Hajj
          </Link>
          <Link 
            href="/about" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-on-surface-variant hover:text-white transition-colors text-base font-semibold py-1"
          >
            À Propos
          </Link>
          {session && (
            <Link 
              href="/booking" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-secondary transition-all text-base font-semibold py-1 flex items-center gap-1.5"
            >
              <Calendar size={16} />
              Suivi Réservation
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
