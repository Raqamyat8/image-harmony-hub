import { motion } from "framer-motion";
import { useState } from "react";
import type { Property } from "@/data/properties";
import { formatPrice } from "@/data/properties";
import { Link } from "@tanstack/react-router";
import { Bed, Bath } from "lucide-react";

export function MapMock({ items }: { items: Property[] }) {
  const [active, setActive] = useState<Property | null>(null);

  return (
    <div className="relative w-full h-[600px] rounded-3xl overflow-hidden bg-navy grain">
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#17335A" strokeWidth="0.2" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
        {/* fake streets */}
        {[15, 32, 48, 62, 78].map((y) => (
          <line key={"h" + y} x1="0" y1={y} x2="100" y2={y} stroke="#17335A" strokeWidth="0.4" />
        ))}
        {[20, 40, 55, 72, 88].map((x) => (
          <line key={"v" + x} x1={x} y1="0" x2={x} y2="100" stroke="#17335A" strokeWidth="0.4" />
        ))}
        {/* river */}
        <path d="M -5 60 Q 30 55 55 68 T 105 62 L 105 100 L -5 100 Z" fill="#0E7C5A" opacity="0.15" />
      </svg>

      <div className="absolute inset-0">
        {items.map((p) => (
          <button
            key={p.id}
            style={{ left: `${p.coords.x}%`, top: `${p.coords.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-full group"
            onClick={() => setActive(p)}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium tabular shadow-luxe-lg transition-all ${
                active?.id === p.id
                  ? "grad-gold text-navy-ink"
                  : "bg-cream text-navy hover:grad-gold hover:text-navy-ink"
              }`}
            >
              {formatPrice(p).replace(/,000$/, "K").replace(/,000,000$/, "M")}
            </motion.div>
            <div
              className={`w-2 h-2 mx-auto -mt-0.5 rotate-45 ${
                active?.id === p.id ? "bg-gold" : "bg-cream"
              }`}
            />
          </button>
        ))}
      </div>

      {active && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-6 left-6 right-6 md:right-auto md:w-96 bg-cream rounded-2xl overflow-hidden shadow-luxe-lg"
        >
          <div className="flex">
            <img src={active.images[0]} alt="" className="w-32 h-32 object-cover" />
            <div className="flex-1 p-4">
              <div className="text-[10px] uppercase tracking-widest text-navy/50">
                {active.neighborhood}
              </div>
              <div className="font-display text-navy line-clamp-1">{active.title}</div>
              <div className="font-display text-lg text-navy tabular mt-1">{formatPrice(active)}</div>
              <div className="flex items-center gap-3 mt-2 text-xs text-navy/60">
                <span className="inline-flex items-center gap-1"><Bed size={12} />{active.beds}</span>
                <span className="inline-flex items-center gap-1"><Bath size={12} />{active.baths}</span>
                <span className="tabular">{active.sqft.toLocaleString()} sqft</span>
              </div>
              <Link
                to="/properties/$id"
                params={{ id: active.id }}
                className="mt-2 inline-block text-xs text-emerald hover:text-emerald-soft"
              >
                View residence →
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
