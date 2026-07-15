import { Link } from "@tanstack/react-router";
import { Heart, MapPin, Bed, Bath, Maximize2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import type { Property } from "@/data/properties";
import { formatPrice } from "@/data/properties";
import { cn } from "@/lib/utils";

export function PropertyCard({ p, featured = false }: { p: Property; featured?: boolean }) {
  const [liked, setLiked] = useState(false);

  return (
    <Link
      to="/properties/$id"
      params={{ id: p.id }}
      className={cn(
        "group block bg-card rounded-3xl overflow-hidden border border-hairline transition-all duration-500",
        "hover:shadow-luxe-lg hover:-translate-y-1",
        featured && "shadow-luxe"
      )}
    >
      <div className={cn("relative overflow-hidden", featured ? "aspect-[4/5]" : "aspect-[4/3]")}>
        <motion.img
          src={p.images[0]}
          alt={p.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 1.2, ease: [0.2, 0.7, 0.2, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-ink/70 via-transparent to-transparent opacity-90" />

        <div className="absolute top-4 left-4 flex gap-2">
          {p.featured && (
            <span className="px-2.5 py-1 rounded-full grad-gold text-navy-ink text-[10px] font-semibold uppercase tracking-widest">
              Featured
            </span>
          )}
          <span className="px-2.5 py-1 rounded-full bg-cream/90 backdrop-blur-sm text-navy text-[10px] font-semibold uppercase tracking-widest">
            For {p.listing}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            setLiked((v) => !v);
          }}
          className={cn(
            "absolute top-4 right-4 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all",
            liked ? "bg-gold text-navy-ink scale-110" : "bg-cream/20 text-cream hover:bg-cream/40"
          )}
          aria-label="Save"
        >
          <Heart size={15} fill={liked ? "currentColor" : "none"} strokeWidth={1.8} />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-5 text-cream">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[11px] uppercase tracking-widest text-cream/60 mb-1 flex items-center gap-1">
                <MapPin size={11} />
                <span className="truncate">{p.neighborhood}, {p.city}</span>
              </div>
              <h3 className={cn("font-display leading-tight truncate", featured ? "text-2xl" : "text-xl")}>
                {p.title}
              </h3>
            </div>
            <div className={cn("font-display tabular text-right shrink-0", featured ? "text-2xl" : "text-lg")}>
              {formatPrice(p)}
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-4 flex items-center justify-between text-sm text-navy/70">
        <div className="flex items-center gap-4">
          <Spec icon={Bed} value={p.beds} />
          <Spec icon={Bath} value={p.baths} />
          <Spec icon={Maximize2} value={p.sqft.toLocaleString()} suffix="sqft" />
        </div>
        <span className="text-[11px] uppercase tracking-widest text-navy/40">{p.type}</span>
      </div>
    </Link>
  );
}

function Spec({ icon: Icon, value, suffix }: { icon: any; value: string | number; suffix?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 tabular">
      <Icon size={14} strokeWidth={1.6} className="text-navy/50" />
      {value}
      {suffix && <span className="text-navy/50 text-xs">{suffix}</span>}
    </span>
  );
}
