import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Bed, Bath, Maximize2, Calendar as Cal, Heart, Share2, MapPin, Check,
  ChevronLeft, ChevronRight, X, Phone, MessageCircle, ArrowRight,
} from "lucide-react";
import { getProperty, properties, formatPrice } from "@/data/properties";
import { getAgent } from "@/data/agents";
import { MortgageCalculator } from "@/components/MortgageCalculator";
import { MapMock } from "@/components/MapMock";
import { PropertyCard } from "@/components/PropertyCard";
import { Reveal } from "@/components/Reveal";
import { toast } from "sonner";

export const Route = createFileRoute("/properties/$id")({
  loader: ({ params }) => {
    const p = getProperty(params.id);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — LuxEstate` },
          { name: "description", content: loaderData.description.slice(0, 155) },
          { property: "og:title", content: `${loaderData.title} — LuxEstate` },
          { property: "og:description", content: loaderData.description.slice(0, 155) },
          { property: "og:image", content: loaderData.images[0] },
          { property: "og:type", content: "product" },
          { property: "og:url", content: `/properties/${loaderData.id}` },
        ]
      : [{ title: "Residence — LuxEstate" }],
    links: loaderData ? [{ rel: "canonical", href: `/properties/${loaderData.id}` }] : [],
    scripts: loaderData
      ? [{
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: loaderData.title,
            image: loaderData.images,
            offers: { "@type": "Offer", price: loaderData.price, priceCurrency: "USD" },
          }),
        }]
      : [],
  }),
  component: PropertyPage,
  notFoundComponent: () => (
    <div className="pt-32 text-center min-h-screen">
      <h1 className="font-display text-4xl text-navy">Residence not found</h1>
      <Link to="/properties" className="mt-4 inline-block text-emerald hover:text-emerald-soft">Browse the collection →</Link>
    </div>
  ),
});

function PropertyPage() {
  const p = Route.useLoaderData();
  const agent = getAgent(p.agentId);
  const [liked, setLiked] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const related = properties.filter((x) => x.id !== p.id && x.type === p.type).slice(0, 3);

  const openLightbox = (i: number) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);
  const next = () => setLightbox((i) => (i === null ? 0 : (i + 1) % p.images.length));
  const prev = () => setLightbox((i) => (i === null ? 0 : (i - 1 + p.images.length) % p.images.length));

  return (
    <div className="pt-20 lg:pt-24 pb-24">
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6 text-sm text-navy/50">
        <Link to="/" className="hover:text-navy">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/properties" className="hover:text-navy">Properties</Link>
        <span className="mx-2">/</span>
        <span className="text-navy/80">{p.title}</span>
      </div>

      {/* Gallery bento */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[520px] rounded-3xl overflow-hidden">
          <button
            onClick={() => openLightbox(0)}
            className="col-span-4 md:col-span-2 row-span-2 relative group overflow-hidden"
          >
            <img src={p.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </button>
          {p.images.slice(1, 5).map((src, i) => (
            <button
              key={i}
              onClick={() => openLightbox(i + 1)}
              className="hidden md:block relative group overflow-hidden"
            >
              <img src={src} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              {i === 3 && p.images.length > 5 && (
                <div className="absolute inset-0 bg-navy-ink/60 flex items-center justify-center text-cream font-display text-xl">
                  +{p.images.length - 5} more
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Header row */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mt-10 grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-8">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-full grad-emerald text-cream text-[10px] uppercase tracking-widest font-medium">
                  For {p.listing}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-navy/5 text-navy text-[10px] uppercase tracking-widest">
                  <Check size={10} className="inline mr-1" /> Verified
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl text-navy leading-tight">{p.title}</h1>
              <div className="mt-3 flex items-center gap-1.5 text-navy/60">
                <MapPin size={14} /> {p.address}, {p.neighborhood}, {p.city}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLiked((v) => !v)}
                className={`w-11 h-11 rounded-full border border-hairline flex items-center justify-center transition-all ${
                  liked ? "grad-gold text-navy-ink scale-105" : "text-navy hover:border-gold"
                }`}
              >
                <Heart size={16} fill={liked ? "currentColor" : "none"} />
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("Link copied", { description: "Share this residence with someone special." });
                }}
                className="w-11 h-11 rounded-full border border-hairline flex items-center justify-center text-navy hover:border-gold transition-colors"
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>

          {/* Price band */}
          <div className="mt-10 border-y border-hairline py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="eyebrow mb-2">Price</div>
              <div className="font-display text-3xl md:text-4xl text-navy tabular">{formatPrice(p)}</div>
              <div className="text-sm text-navy/50 mt-1 tabular">${Math.round(p.price / p.sqft).toLocaleString()}/sqft</div>
            </div>
            <Highlight icon={Bed} label="Bedrooms" value={p.beds} />
            <Highlight icon={Bath} label="Bathrooms" value={p.baths} />
            <Highlight icon={Maximize2} label="Interior" value={`${p.sqft.toLocaleString()}`} suffix="sqft" />
          </div>

          {/* Description */}
          <div className="mt-12">
            <div className="eyebrow mb-3">About this residence</div>
            <p className="font-display text-2xl md:text-3xl text-navy leading-snug">{p.description}</p>
            <p className="mt-6 text-navy/65 leading-relaxed max-w-3xl">
              Built in {p.year}. Delivered {p.furnished ? "fully furnished" : "unfurnished"}, with {p.parking ? "private parking" : "residents' garaging"} and access to the building's full suite of amenities. Available for private viewings by appointment.
            </p>
          </div>

          {/* Amenities */}
          <div className="mt-16">
            <div className="eyebrow mb-6">Amenities</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {p.amenities.map((a) => (
                <div key={a} className="flex items-center gap-3 p-4 rounded-2xl border border-hairline bg-cream">
                  <div className="w-8 h-8 rounded-full grad-gold text-navy-ink flex items-center justify-center shrink-0">
                    <Check size={13} />
                  </div>
                  <span className="text-navy/80 text-sm">{a}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="mt-16">
            <div className="eyebrow mb-3">Location</div>
            <h2 className="font-display text-3xl text-navy mb-6">The neighborhood</h2>
            <MapMock items={[p]} />
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Central Park", walk: "4 min" },
                { name: "Whitney Museum", walk: "7 min" },
                { name: "Michelin dining", walk: "3 min" },
                { name: "Metro station", walk: "5 min" },
              ].map((n) => (
                <div key={n.name} className="p-4 rounded-2xl bg-cream border border-hairline">
                  <div className="text-sm text-navy">{n.name}</div>
                  <div className="text-xs text-navy/50 mt-1">{n.walk} walk</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mortgage */}
          <div className="mt-16">
            <div className="eyebrow mb-3">Financing</div>
            <h2 className="font-display text-3xl text-navy mb-6">Estimate the monthly.</h2>
            <div className="bg-cream border border-hairline rounded-3xl p-6 md:p-8">
              <MortgageCalculator initialPrice={p.price} />
            </div>
          </div>
        </div>

        {/* Sticky sidebar */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28 space-y-4">
            <div className="rounded-3xl bg-navy text-cream p-6 shadow-luxe-lg">
              <div className="eyebrow text-gold-soft mb-2">Your advisor</div>
              <div className="flex items-center gap-4">
                <img src={agent.image} alt={agent.name} className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <div className="font-display text-xl">{agent.name}</div>
                  <div className="text-xs text-cream/60">{agent.title}</div>
                  <div className="text-xs text-emerald-soft flex items-center gap-1 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-soft animate-pulse" /> Responds in {'<'}2 min
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-6">
                <button className="py-2.5 rounded-full bg-cream/10 hover:bg-cream/20 text-sm flex items-center justify-center gap-1.5 transition-colors">
                  <MessageCircle size={14} /> Message
                </button>
                <button className="py-2.5 rounded-full border border-cream/20 hover:border-gold text-sm flex items-center justify-center gap-1.5 transition-colors">
                  <Phone size={14} /> Call
                </button>
              </div>
              <Link
                to="/agents/$id"
                params={{ id: agent.id }}
                className="mt-4 block text-center text-xs text-cream/60 hover:text-gold-soft"
              >
                View profile →
              </Link>
            </div>

            <Link
              to="/book/$id"
              params={{ id: p.id }}
              className="btn-shimmer grad-gold text-navy-ink w-full py-4 rounded-3xl flex items-center justify-center gap-2 font-medium shadow-luxe-lg"
            >
              <Cal size={16} /> Book a private viewing
            </Link>
          </div>
        </aside>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-24 lg:mt-32 py-16 bg-navy/[0.03]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <Reveal>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <div className="eyebrow mb-3">You may also love</div>
                  <h2 className="font-display text-3xl md:text-4xl text-navy">Similar residences.</h2>
                </div>
                <Link to="/properties" className="hidden md:inline-flex items-center gap-2 text-navy hover:text-gold transition-colors group">
                  View all <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((r, i) => (
                <Reveal key={r.id} delay={i * 0.1}><PropertyCard p={r} /></Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-navy-ink/95 z-[100] flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-6 right-6 text-cream/70 hover:text-cream"
              onClick={closeLightbox}
            ><X size={28} /></button>
            <button
              className="absolute left-4 md:left-8 text-cream/70 hover:text-cream"
              onClick={(e) => { e.stopPropagation(); prev(); }}
            ><ChevronLeft size={32} /></button>
            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
              src={p.images[lightbox]}
              alt=""
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
            />
            <button
              className="absolute right-4 md:right-8 text-cream/70 hover:text-cream"
              onClick={(e) => { e.stopPropagation(); next(); }}
            ><ChevronRight size={32} /></button>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cream/60 text-sm tabular">
              {lightbox + 1} / {p.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Highlight({ icon: Icon, label, value, suffix }: { icon: any; label: string; value: any; suffix?: string }) {
  return (
    <div>
      <div className="eyebrow mb-2 flex items-center gap-1.5">
        <Icon size={11} /> {label}
      </div>
      <div className="font-display text-2xl md:text-3xl text-navy tabular">
        {value}{suffix && <span className="text-navy/50 text-lg ml-1">{suffix}</span>}
      </div>
    </div>
  );
}
