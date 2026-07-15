import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, Map as MapIcon, SlidersHorizontal, X } from "lucide-react";
import { properties, cities, propertyTypes } from "@/data/properties";
import { PropertyCard } from "@/components/PropertyCard";
import { MapMock } from "@/components/MapMock";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  city: fallback(z.string(), "").default(""),
  type: fallback(z.string(), "").default(""),
  listing: fallback(z.string(), "").default(""),
  beds: fallback(z.number(), 0).default(0),
  baths: fallback(z.number(), 0).default(0),
  min: fallback(z.number(), 0).default(0),
  max: fallback(z.number(), 30_000_000).default(30_000_000),
  pool: fallback(z.boolean(), false).default(false),
  garden: fallback(z.boolean(), false).default(false),
  parking: fallback(z.boolean(), false).default(false),
  furnished: fallback(z.boolean(), false).default(false),
  view: fallback(z.string(), "grid").default("grid"),
  sort: fallback(z.string(), "featured").default("featured"),
});

export const Route = createFileRoute("/properties")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Properties — LuxEstate" },
      { name: "description", content: "Browse our verified collection of the world's most exceptional residences. Filter by city, type, price, and amenities." },
      { property: "og:title", content: "Properties — LuxEstate" },
      { property: "og:description", content: "Browse our verified collection of extraordinary residences." },
      { property: "og:url", content: "/properties" },
    ],
    links: [{ rel: "canonical", href: "/properties" }],
  }),
  component: PropertiesPage,
});

function PropertiesPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const set = (patch: Partial<typeof search>) =>
    navigate({ search: (prev: any) => ({ ...prev, ...patch }) });

  const results = useMemo(() => {
    let r = properties.filter((p) => {
      if (search.city && p.city !== search.city) return false;
      if (search.type && p.type !== search.type) return false;
      if (search.listing && p.listing !== search.listing) return false;
      if (search.beds && p.beds < search.beds) return false;
      if (search.baths && p.baths < search.baths) return false;
      if (p.listing === "Sale" && (p.price < search.min || p.price > search.max)) return false;
      if (search.pool && !p.pool) return false;
      if (search.garden && !p.garden) return false;
      if (search.parking && !p.parking) return false;
      if (search.furnished && !p.furnished) return false;
      if (search.q) {
        const q = search.q.toLowerCase();
        if (!p.title.toLowerCase().includes(q) &&
            !p.city.toLowerCase().includes(q) &&
            !p.neighborhood.toLowerCase().includes(q)) return false;
      }
      return true;
    });
    switch (search.sort) {
      case "price-asc": r = [...r].sort((a, b) => a.price - b.price); break;
      case "price-desc": r = [...r].sort((a, b) => b.price - a.price); break;
      case "size": r = [...r].sort((a, b) => b.sqft - a.sqft); break;
    }
    return r;
  }, [search]);

  const hasFilters =
    search.city || search.type || search.listing || search.beds || search.baths ||
    search.pool || search.garden || search.parking || search.furnished || search.q ||
    search.min > 0 || search.max < 30_000_000;

  return (
    <div className="pt-20 lg:pt-24 pb-24">
      {/* Sub-header */}
      <div className="bg-cream border-b border-hairline">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-8 md:py-12">
          <div className="eyebrow mb-3">The Collection</div>
          <div className="flex items-end justify-between flex-wrap gap-6">
            <h1 className="font-display text-4xl md:text-5xl text-navy leading-tight max-w-2xl">
              <motion.span
                key={results.length}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="tabular text-grad-gold"
              >
                {results.length}
              </motion.span>{" "}
              residences {hasFilters ? "matching your intent" : "in the current collection"}
            </h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFiltersOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 px-4 py-2 border border-hairline rounded-full text-sm"
              >
                <SlidersHorizontal size={14} /> Filters
              </button>
              <div className="hidden md:inline-flex bg-navy/5 rounded-full p-1">
                <button
                  onClick={() => set({ view: "grid" })}
                  className={cn("px-3 py-1.5 rounded-full text-sm inline-flex items-center gap-1.5 transition",
                    search.view === "grid" ? "bg-navy text-cream" : "text-navy/60")}
                >
                  <LayoutGrid size={13} /> Grid
                </button>
                <button
                  onClick={() => set({ view: "map" })}
                  className={cn("px-3 py-1.5 rounded-full text-sm inline-flex items-center gap-1.5 transition",
                    search.view === "map" ? "bg-navy text-cream" : "text-navy/60")}
                >
                  <MapIcon size={13} /> Map
                </button>
              </div>
              <select
                value={search.sort}
                onChange={(e) => set({ sort: e.target.value })}
                className="border border-hairline rounded-full px-4 py-2 text-sm bg-transparent outline-none focus:border-gold"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price · Low to High</option>
                <option value="price-desc">Price · High to Low</option>
                <option value="size">Largest</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mt-8 lg:mt-12 grid lg:grid-cols-12 gap-8">
        {/* Filters — desktop rail */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-28 self-start">
          <FiltersPanel search={search} set={set} />
        </aside>

        {/* Results */}
        <div className="lg:col-span-9">
          {search.view === "map" ? (
            <MapMock items={results} />
          ) : results.length === 0 ? (
            <EmptyState onReset={() => navigate({ search: {} as any })} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {results.map((p, i) => (
                <Reveal key={p.id} delay={Math.min(i, 6) * 0.05}>
                  <PropertyCard p={p} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filters sheet */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-navy-ink/60 z-50 lg:hidden"
              onClick={() => setFiltersOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30 }}
              className="fixed bottom-0 inset-x-0 max-h-[85vh] overflow-y-auto bg-cream rounded-t-3xl p-6 z-50 lg:hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-2xl text-navy">Filters</h3>
                <button onClick={() => setFiltersOpen(false)} className="p-2">
                  <X size={20} />
                </button>
              </div>
              <FiltersPanel search={search} set={set} />
              <button
                onClick={() => setFiltersOpen(false)}
                className="mt-6 w-full grad-gold text-navy-ink py-3 rounded-full font-medium"
              >
                Show {results.length} homes
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function FiltersPanel({ search, set }: { search: any; set: (p: any) => void }) {
  return (
    <div className="space-y-6">
      <FField label="Search">
        <input
          type="text"
          value={search.q}
          onChange={(e) => set({ q: e.target.value })}
          placeholder="City, neighborhood…"
          className="w-full border border-hairline rounded-xl h-11 px-4 text-sm outline-none focus:border-gold bg-transparent"
        />
      </FField>

      <FField label="Listing">
        <div className="inline-flex bg-navy/5 rounded-full p-1 w-full">
          {["", "Sale", "Rent"].map((l) => (
            <button
              key={l || "any"}
              onClick={() => set({ listing: l })}
              className={cn("flex-1 py-2 text-xs rounded-full transition",
                search.listing === l ? "bg-navy text-cream" : "text-navy/60")}
            >
              {l || "Any"}
            </button>
          ))}
        </div>
      </FField>

      <FField label="City">
        <select
          value={search.city}
          onChange={(e) => set({ city: e.target.value })}
          className="w-full border border-hairline rounded-xl h-11 px-3 text-sm outline-none focus:border-gold bg-transparent"
        >
          <option value="">All cities</option>
          {cities.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </FField>

      <FField label="Property type">
        <select
          value={search.type}
          onChange={(e) => set({ type: e.target.value })}
          className="w-full border border-hairline rounded-xl h-11 px-3 text-sm outline-none focus:border-gold bg-transparent"
        >
          <option value="">Any type</option>
          {propertyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </FField>

      <div className="grid grid-cols-2 gap-4">
        <FField label="Beds">
          <StepControl value={search.beds} onChange={(v) => set({ beds: v })} suffix="+" />
        </FField>
        <FField label="Baths">
          <StepControl value={search.baths} onChange={(v) => set({ baths: v })} suffix="+" />
        </FField>
      </div>

      <FField label={`Price · up to $${(search.max / 1_000_000).toFixed(1)}M`}>
        <input
          type="range" min={500_000} max={30_000_000} step={100_000}
          value={search.max}
          onChange={(e) => set({ max: +e.target.value })}
          className="range w-full"
        />
      </FField>

      <FField label="Amenities">
        <div className="flex flex-wrap gap-2">
          {(["pool", "garden", "parking", "furnished"] as const).map((k) => (
            <button
              key={k}
              onClick={() => set({ [k]: !search[k] })}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs border transition-colors capitalize",
                search[k]
                  ? "bg-navy text-cream border-navy"
                  : "border-hairline text-navy/70 hover:border-gold"
              )}
            >
              {k}
            </button>
          ))}
        </div>
      </FField>
    </div>
  );
}

function FField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-navy/50 mb-2">{label}</div>
      {children}
    </div>
  );
}

function StepControl({ value, onChange, suffix = "" }: { value: number; onChange: (v: number) => void; suffix?: string }) {
  return (
    <div className="flex items-center justify-between border border-hairline rounded-xl h-11 px-1">
      <button className="w-8 h-8 rounded-full hover:bg-navy/5 text-navy" onClick={() => onChange(Math.max(0, value - 1))}>−</button>
      <span className="font-display text-navy tabular">{value || "Any"}{value ? suffix : ""}</span>
      <button className="w-8 h-8 rounded-full hover:bg-navy/5 text-navy" onClick={() => onChange(value + 1)}>+</button>
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="text-center py-24 border border-dashed border-hairline rounded-3xl">
      <div className="w-16 h-16 rounded-full grad-gold mx-auto flex items-center justify-center text-navy-ink">
        <MapIcon size={22} />
      </div>
      <h3 className="mt-6 font-display text-2xl text-navy">No homes match. Yet.</h3>
      <p className="mt-2 text-navy/60 max-w-sm mx-auto">Try widening your search or explore our full collection.</p>
      <div className="mt-6 flex justify-center gap-3">
        <button onClick={onReset} className="px-5 py-2.5 rounded-full border border-navy/20 text-navy hover:bg-navy hover:text-cream transition-colors">
          Reset filters
        </button>
        <Link to="/agents" className="px-5 py-2.5 rounded-full grad-gold text-navy-ink font-medium">
          Speak to an advisor
        </Link>
      </div>
    </div>
  );
}
