import React from "react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant w-full px-6 py-12 flex flex-col md:flex-row justify-between items-start gap-8 mt-auto">
      <div className="flex flex-col gap-4 max-w-sm">
        <Logo className="h-8 w-auto self-start" />
        <p className="text-on-surface-variant text-sm">
          © 2026 Horizon Voyages.<br/>
          Ministry of Tourism License N° 45/2026.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-12">
        <div className="flex flex-col gap-3">
          <h4 className="text-on-surface font-bold text-sm uppercase tracking-wider mb-2">Agence</h4>
          <span className="text-on-surface-variant text-sm">Sidi Yahia, Hydra, Algiers</span>
          <span className="text-on-surface-variant text-sm">Tél: +213 21 55 55 55</span>
          <span className="text-on-surface-variant text-sm">WhatsApp: +213 555 12 34 56</span>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="text-on-surface font-bold text-sm uppercase tracking-wider mb-2">Social</h4>
          <a className="text-on-surface-variant hover:text-secondary transition-colors text-sm" href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
          <a className="text-on-surface-variant hover:text-secondary transition-colors text-sm" href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a className="text-on-surface-variant hover:text-secondary transition-colors text-sm" href="https://wa.me/213555123456" target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      </div>
    </footer>
  );
}
