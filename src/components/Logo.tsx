import React from "react";

export default function Logo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <svg 
      className={className}
      viewBox="0 0 200 60" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 30C10 18.9543 18.9543 10 30 10H40L30 30L40 50H30C18.9543 50 10 41.0457 10 30Z" fill="#ebc246"/>
      <path d="M45 10L35 30L45 50H55L45 30L55 10H45Z" fill="#b0c8eb"/>
      <text x="65" y="38" fontFamily="Outfit, sans-serif" fontWeight="700" fontSize="24" fill="#ffffff">HORIZON</text>
      <text x="65" y="52" fontFamily="Outfit, sans-serif" fontWeight="400" fontSize="12" fill="#c4c6ce" letterSpacing="0.2em">VOYAGES</text>
    </svg>
  );
}
