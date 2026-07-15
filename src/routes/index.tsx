import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, Search, Sparkles, MapPin, Bed, Star,
  Compass, Calendar, Key, ChevronDown,
} from "lucide-react";
import { IMG } from "@/assets/images";
import { featuredProperties, properties, formatPrice } from "@/data/properties";
import { testimonials, faqs, partners, categories } from "@/data/misc";
import { PropertyCard } from "@/components/PropertyCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { MortgageCalculator } from "@/components/MortgageCalculator";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LuxEstate — Extraordinary Homes, Answered by AI" },
      { name: "description", content: "AI-powered discovery of the world's most exceptional residences. Private advisors, verified listings, and a quieter way to find home." },
      { property: "og:title", content: "LuxEstate — Extraordinary Homes, Answered by AI" },
      { property: "og:description", content: "AI-powered discovery of the world's most exceptional residences." },
      { property: "og:image", content: IMG.tower },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          name: "LuxEstate",
          description: "A curated collection of the world's most extraordinary residences.",
          image: IMG.tower,
        }),
      },
    ],
  }),
  component: HomePage,
});

const AI_PLACEHOLDERS = [
  "Sunlit penthouse near Central Park under $10M…",
  "3-bedroom loft in SoHo with a private garden…",
  "Waterfront villa in Malibu with a home theater…",
  "Historic townhouse in Beacon Hill with a wine cellar…",
];

function HomePage() {
  return (
    <>
      <Hero />
      <SearchStrip />
      <Featured />
      <Categories />
      <Stats />
      <HowItWorks />
      <CalculatorSection />
      <Testimonials />
      <Partners />
      <FAQ />
      <NewsletterBand />
    </>
  );
}

/* ─────────────────────────────── HERO ─────────────────────────────── */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPlaceholderIdx((i) => (i + 1) % AI_PLACEHOLDERS.length), 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={ref} className="relative min-h-[100svh] grad-hero text-cream overflow-hidden grain pt-24 lg:pt-32 pb-16">
      {/* orbit accents */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-emerald/20 blur-3xl" />
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-gold/15 blur-3xl" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-6 xl:col-span-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cream/20 bg-cream/5 backdrop-blur-sm"
          >
            <Sparkles size={13} className="text-gold" />
            <span className="text-[11px] uppercase tracking-widest text-cream/80">AI-powered real estate</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.98] tracking-tight"
          >
            Find a home that
            <br />
            <span className="italic text-grad-gold">answers back.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="mt-6 text-lg md:text-xl text-cream/70 max-w-xl leading-relaxed"
          >
            An unhurried, AI-guided way to discover the world's most exceptional residences —
            with private advisors on hand from first look to keys in hand.
          </motion.p>

          {/* AI search bar */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="mt-8 flex items-center gap-2 p-2 rounded-full bg-cream/8 border border-cream/15 backdrop-blur-xl shadow-luxe-lg max-w-xl"
          >
            <div className="pl-4 flex items-center gap-2 text-gold shrink-0">
              <Sparkles size={16} />
            </div>
            <div className="flex-1 relative h-11 overflow-hidden">
              <motion.div
                key={placeholderIdx}
                initial={{ y: 44, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -44, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
                className="absolute inset-0 flex items-center text-cream/50 pointer-events-none"
              >
                {AI_PLACEHOLDERS[placeholderIdx]}
              </motion.div>
              <input
                type="text"
                aria-label="Search"
                className="absolute inset-0 bg-transparent outline-none text-cream placeholder-transparent"
              />
            </div>
            <Link
              to="/properties"
              className="btn-shimmer grad-gold text-navy-ink font-medium px-5 py-3 rounded-full inline-flex items-center gap-2 shrink-0"
            >
              Search <ArrowRight size={15} />
            </Link>
          </motion.form>

          {/* trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-cream/60"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-7 h-7 rounded-full border-2 border-navy overflow-hidden">
                    <img src={testimonials[i].avatar} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <span>Trusted by <span className="text-cream">12,000+</span> discerning buyers</span>
            </div>
            <span className="hidden sm:inline text-cream/20">·</span>
            <div className="flex items-center gap-1.5">
              <Star size={13} className="text-gold" fill="currentColor" />
              <span><span className="text-cream tabular">4.9</span> from 3,214 reviews</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="hidden md:flex mt-16 items-center gap-2 text-cream/40 text-xs uppercase tracking-widest"
          >
            <ChevronDown size={14} className="animate-bounce" /> Scroll
          </motion.div>
        </div>

        {/* Right visual */}
        <div className="lg:col-span-6 xl:col-span-6 relative">
          <motion.div
            style={{ y, scale }}
            className="relative aspect-[4/5] max-w-[540px] mx-auto rounded-[32px] overflow-hidden shadow-luxe-lg"
          >
            <img
              src={IMG.tower}
              alt="Meridian Tower at dusk"
              className="w-full h-full object-cover"
              style={{ objectPosition: "70% center" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-ink/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-cream">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-cream/70">Now viewing</div>
                <div className="font-display text-2xl leading-tight mt-1">Meridian Tower</div>
                <div className="text-sm text-cream/60">Hudson Yards · New York</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-widest text-gold-soft">Sky Residence 42</div>
                <div className="font-display text-2xl tabular mt-1">$8.45M</div>
              </div>
            </div>
          </motion.div>

          {/* floating cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="hidden md:block absolute -left-6 top-16 float bg-cream/95 backdrop-blur-md text-navy rounded-2xl p-4 pr-6 shadow-luxe-lg"
            style={{ animationDelay: "-2s" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl overflow-hidden">
                <img src={IMG.agent} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-navy/50">Your advisor</div>
                <div className="font-medium text-sm">Sofía Marín</div>
                <div className="text-xs text-emerald flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
                  Online · 2m response
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="hidden md:block absolute -right-4 bottom-24 float bg-navy-ink/80 backdrop-blur-md text-cream rounded-2xl p-4 shadow-luxe-lg border border-cream/10"
          >
            <div className="text-[10px] uppercase tracking-widest text-gold-soft mb-1">Market pulse</div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl tabular">+12.4%</span>
              <span className="text-emerald-soft text-xs">YoY</span>
            </div>
            <div className="text-xs text-cream/50 mt-1">Manhattan luxury</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="hidden md:flex absolute left-8 -bottom-4 float items-center gap-2 bg-cream/95 text-navy rounded-full pl-2 pr-4 py-2 shadow-luxe-lg"
            style={{ animationDelay: "-4s" }}
          >
            <span className="grad-emerald text-cream text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full">Just listed</span>
            <span className="text-sm font-medium">Azure Terrace · Tribeca</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────── SEARCH STRIP ────────────────────────── */
function SearchStrip() {
  const [mode, setMode] = useState<"Buy" | "Rent" | "New">("Buy");
  const [beds, setBeds] = useState(3);
  const [price, setPrice] = useState(5_000_000);
  const filtered = properties.filter((p) => {
    if (mode === "Buy" && p.listing !== "Sale") return false;
    if (mode === "Rent" && p.listing !== "Rent") return false;
    if (p.beds < beds) return false;
    if (p.price > price && p.listing === "Sale") return false;
    return true;
  });

  return (
    <section className="relative -mt-20 px-6 lg:px-10 z-20">
      <div className="max-w-[1200px] mx-auto rounded-3xl bg-cream shadow-luxe-lg border border-hairline p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex bg-navy/5 rounded-full p-1">
            {(["Buy", "Rent", "New"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-5 py-2 rounded-full text-sm transition-all ${
                  mode === m ? "bg-navy text-cream shadow-luxe" : "text-navy/70 hover:text-navy"
                }`}
              >
                {m === "New" ? "New Developments" : m}
              </button>
            ))}
          </div>
          <div className="text-sm text-navy/60">
            <span className="font-display text-navy tabular text-lg mr-1">{filtered.length}</span>
            residences match
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <SelectField label="City">
            <option>All cities</option>
            <option>New York</option>
            <option>Los Angeles</option>
            <option>Miami</option>
            <option>Paris</option>
          </SelectField>
          <SelectField label="Property type">
            <option>Any type</option>
            <option>Penthouse</option>
            <option>Villa</option>
            <option>Residence</option>
            <option>Loft</option>
          </SelectField>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-navy/50 mb-2">Bedrooms</div>
            <div className="flex items-center justify-between border border-hairline rounded-full h-11 px-1">
              <button className="w-8 h-8 rounded-full hover:bg-navy/5 text-navy" onClick={() => setBeds(Math.max(0, beds - 1))}>−</button>
              <span className="font-display text-navy tabular">{beds}+</span>
              <button className="w-8 h-8 rounded-full hover:bg-navy/5 text-navy" onClick={() => setBeds(beds + 1)}>+</button>
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-navy/50 mb-2 flex justify-between">
              <span>Max price</span>
              <span className="text-navy tabular">${(price / 1_000_000).toFixed(1)}M</span>
            </div>
            <input
              type="range" min={500_000} max={30_000_000} step={100_000}
              value={price} onChange={(e) => setPrice(+e.target.value)}
              className="range w-full mt-4"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {["Parking", "Pool", "Garden", "Furnished", "Waterfront"].map((chip) => (
              <button
                key={chip}
                className="px-3 py-1.5 rounded-full text-xs border border-hairline text-navy/70 hover:border-gold hover:text-navy transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>
          <Link
            to="/properties"
            className="btn-shimmer grad-gold text-navy-ink font-medium px-6 py-3 rounded-full inline-flex items-center gap-2"
          >
            <Search size={15} /> Search all
          </Link>
        </div>
      </div>
    </section>
  );
}

function SelectField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-navy/50 mb-2">{label}</div>
      <div className="relative">
        <select className="w-full appearance-none border border-hairline rounded-full h-11 px-4 pr-9 bg-transparent text-navy text-sm focus:border-gold outline-none">
          {children}
        </select>
        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-navy/40 pointer-events-none" />
      </div>
    </div>
  );
}

/* ────────────────────────── FEATURED ────────────────────────── */
function Featured() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="This week's collection"
            title={<>Residences worth <span className="italic text-grad-gold">a second look.</span></>}
            description="Every home is verified by a LuxEstate advisor. Photographed on-site. Priced with intention."
            action={
              <Link to="/properties" className="hidden md:inline-flex items-center gap-2 text-navy hover:text-gold transition-colors group">
                View all <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            }
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredProperties.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1}>
              <PropertyCard p={p} featured />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────── CATEGORIES ────────────────────────── */
function Categories() {
  const covers: Record<string, string> = {
    Penthouse: IMG.tower,
    Villa: IMG.interior,
    Waterfront: IMG.terrace,
    Historic: properties[7].images[0],
    Residence: properties[9].images[0],
    Commercial: properties[8].images[0],
  };
  return (
    <section className="py-24 lg:py-32 bg-navy/[0.03]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Explore by character"
            title={<>Six ways to find <span className="italic text-grad-gold">the one.</span></>}
          />
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.05}>
              <Link
                to="/properties"
                className="group relative block aspect-[3/4] rounded-2xl overflow-hidden bg-navy"
              >
                <img
                  src={covers[c.type]}
                  alt={c.label}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-ink to-transparent" />
                <div className="absolute inset-0 p-4 flex flex-col justify-end text-cream">
                  <div className="text-[10px] uppercase tracking-widest text-gold-soft">{c.count} homes</div>
                  <div className="font-display text-xl leading-tight mt-1">{c.label}</div>
                  <div className="mt-2 h-px w-6 bg-gold group-hover:w-full transition-all duration-500" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────── STATS ────────────────────────── */
function Stats() {
  const items = [
    { value: 12480, prefix: "", suffix: "", label: "Homes sold" },
    { value: 4.2, prefix: "$", suffix: "B", label: "Volume closed", decimals: 1 },
    { value: 96, prefix: "", suffix: "", label: "Cities served" },
    { value: 4.9, prefix: "", suffix: "★", label: "Client rating", decimals: 1 },
  ];
  return (
    <section className="grad-hero text-cream grain relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 md:py-28">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6">
          {items.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center lg:text-left">
              <div className="font-display text-5xl md:text-6xl lg:text-7xl leading-none tabular">
                <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals ?? 0} />
              </div>
              <div className="mt-3 eyebrow text-cream/50">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────── HOW IT WORKS ────────────────────────── */
function HowItWorks() {
  const steps = [
    { icon: Compass, title: "Discover", body: "Tell our AI what you're looking for — in your own words. We surface residences that match the way you'll actually live." },
    { icon: Calendar, title: "Tour", body: "Book private viewings in three taps, virtual walkthroughs on demand, and quiet moments with your dedicated advisor." },
    { icon: Key, title: "Close", body: "From offer to keys, we coordinate legal, financing, and inspection partners — so nothing rushes and nothing slips." },
  ];
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="How it works"
            title={<>Three steps. <span className="italic text-grad-gold">Zero friction.</span></>}
          />
        </Reveal>
        <div className="relative grid md:grid-cols-3 gap-10 md:gap-6 mt-8">
          <div className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-gold/0 via-gold/50 to-gold/0" />
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.15} className="text-center">
              <div className="relative w-16 h-16 rounded-full mx-auto grad-gold flex items-center justify-center text-navy-ink shadow-luxe-lg">
                <s.icon size={22} />
                <div className="absolute -inset-2 rounded-full border border-gold/30" />
              </div>
              <div className="mt-6 font-display text-2xl text-navy">{s.title}</div>
              <p className="mt-3 text-navy/60 max-w-xs mx-auto leading-relaxed">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────── CALCULATOR ────────────────────────── */
function CalculatorSection() {
  return (
    <section id="calculator" className="py-24 lg:py-32 bg-navy/[0.03]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Mortgage calculator"
            title={<>Understand the maths <span className="italic text-grad-gold">before the offer.</span></>}
            description="A calm, transparent view of monthly payments, interest, and long-term cost."
          />
        </Reveal>
        <Reveal delay={0.15}>
          <div className="bg-cream rounded-3xl p-6 md:p-10 border border-hairline shadow-luxe">
            <MortgageCalculator />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ────────────────────────── TESTIMONIALS ────────────────────────── */
function Testimonials() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Client voices"
            title={<>Words from those <span className="italic text-grad-gold">already home.</span></>}
          />
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <blockquote className="h-full bg-cream border border-hairline rounded-3xl p-8 shadow-luxe flex flex-col">
                <div className="flex gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, k) => (<Star key={k} size={14} fill="currentColor" />))}
                </div>
                <p className="mt-6 font-display text-xl md:text-2xl text-navy leading-snug flex-1">
                  "{t.quote}"
                </p>
                <footer className="mt-8 flex items-center gap-3">
                  <img src={t.avatar} alt="" className="w-11 h-11 rounded-full object-cover" />
                  <div>
                    <div className="font-medium text-navy">{t.name}</div>
                    <div className="text-xs text-navy/50">{t.role}</div>
                  </div>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────── PARTNERS ────────────────────────── */
function Partners() {
  return (
    <section className="py-16 border-y border-hairline bg-cream">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center eyebrow mb-8">Trusted by the world's finest</div>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
          {partners.map((p) => (
            <span
              key={p}
              className="font-display text-xl md:text-2xl text-navy/30 hover:text-navy/70 transition-colors tracking-wide"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────── FAQ ────────────────────────── */
function FAQ() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="eyebrow mb-4">Questions</div>
            <h2 className="font-display text-4xl md:text-5xl text-navy leading-tight">
              Answers, <span className="italic text-grad-gold">unhurried.</span>
            </h2>
            <p className="mt-4 text-navy/60 leading-relaxed">
              Still unsure? Speak with a private advisor — no obligation, no follow-ups you didn't ask for.
            </p>
            <Link
              to="/agents"
              className="mt-6 inline-flex items-center gap-2 text-navy hover:text-gold transition-colors group"
            >
              Meet the advisors <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`i${i}`} className="border-hairline">
                  <AccordionTrigger className="text-left font-display text-lg text-navy hover:text-navy py-6 hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-navy/65 leading-relaxed text-base pb-6">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────── NEWSLETTER ────────────────────────── */
function NewsletterBand() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section className="relative overflow-hidden">
      <img src={IMG.terrace} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-navy-ink/75 backdrop-blur-[2px]" />
      <div className="relative max-w-3xl mx-auto px-6 lg:px-10 py-24 md:py-32 text-center text-cream">
        <div className="eyebrow text-gold-soft mb-4">The private list</div>
        <h2 className="font-display text-4xl md:text-6xl leading-[1.05]">
          Off-market residences,
          <br />
          <span className="italic text-grad-gold">delivered on Sundays.</span>
        </h2>
        <p className="mt-5 text-cream/70 max-w-lg mx-auto">
          Six extraordinary homes each week. No noise, no clutter, no fine print.
        </p>
        {done ? (
          <div className="mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-cream/10 border border-cream/20">
            <span className="w-6 h-6 rounded-full grad-gold text-navy-ink text-sm inline-flex items-center justify-center">✓</span>
            <span>Welcome. Look for us this Sunday.</span>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); if (email) setDone(true); }}
            className="mt-8 max-w-md mx-auto flex items-center gap-2 p-2 rounded-full bg-cream/10 border border-cream/20 backdrop-blur-xl"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="flex-1 bg-transparent px-4 py-2 outline-none text-cream placeholder-cream/40"
              required
            />
            <button className="btn-shimmer grad-gold text-navy-ink px-5 py-2.5 rounded-full text-sm font-medium">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
