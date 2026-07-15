import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Star, MapPin, Phone, Mail, Globe, MessageCircle, ArrowRight } from "lucide-react";
import { getAgent } from "@/data/agents";
import { properties } from "@/data/properties";
import { PropertyCard } from "@/components/PropertyCard";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";

export const Route = createFileRoute("/agents/$id")({
  loader: ({ params }) => {
    const a = getAgent(params.id);
    if (!a) throw notFound();
    return a;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — LuxEstate` },
          { name: "description", content: loaderData.bio.slice(0, 155) },
          { property: "og:title", content: `${loaderData.name} — LuxEstate` },
          { property: "og:description", content: loaderData.bio.slice(0, 155) },
          { property: "og:image", content: loaderData.image },
          { property: "og:url", content: `/agents/${loaderData.id}` },
        ]
      : [{ title: "Advisor — LuxEstate" }],
    links: loaderData ? [{ rel: "canonical", href: `/agents/${loaderData.id}` }] : [],
  }),
  component: AgentPage,
});

function AgentPage() {
  const a = Route.useLoaderData();
  const listings = properties.filter((p) => p.agentId === a.id).slice(0, 3);
  return (
    <div className="pt-24 pb-24">
      <section className="grad-hero text-cream grain">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 md:py-24 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4">
            <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-luxe-lg">
              <img src={a.image} alt={a.name} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className="eyebrow text-gold-soft mb-4">Private advisor</div>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.98]">{a.name}</h1>
            <div className="mt-3 text-cream/70">{a.title}</div>
            <p className="mt-6 text-lg text-cream/75 leading-relaxed max-w-2xl">{a.bio}</p>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
              <Stat value={a.years} label="Years advising" />
              <Stat value={a.sold} label="Closings" />
              <Stat value={a.rating} label="Rating" decimals={1} />
              <Stat value={a.reviews} label="Reviews" />
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href={`mailto:${a.email}`} className="btn-shimmer grad-gold text-navy-ink px-6 py-3 rounded-full inline-flex items-center gap-2">
                <Mail size={15} /> {a.email}
              </a>
              <a href={`tel:${a.phone}`} className="px-6 py-3 rounded-full border border-cream/20 hover:border-gold inline-flex items-center gap-2">
                <Phone size={15} /> {a.phone}
              </a>
              <button className="px-6 py-3 rounded-full border border-cream/20 hover:border-gold inline-flex items-center gap-2">
                <MessageCircle size={15} /> Message
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mt-16 grid md:grid-cols-3 gap-6">
        <Card icon={MapPin} label="Regions" value={a.regions.join(" · ")} />
        <Card icon={Globe} label="Languages" value={a.languages.join(" · ")} />
        <Card icon={Star} label="Client rating" value={`${a.rating} · ${a.reviews} reviews`} />
      </div>

      {listings.length > 0 && (
        <section className="mt-24">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <Reveal>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <div className="eyebrow mb-3">Currently representing</div>
                  <h2 className="font-display text-3xl md:text-4xl text-navy">Selected residences.</h2>
                </div>
                <Link to="/properties" className="hidden md:inline-flex items-center gap-2 text-navy hover:text-gold transition-colors group">
                  View all <ArrowRight size={14} />
                </Link>
              </div>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-6">
              {listings.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.1}><PropertyCard p={p} /></Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function Stat({ value, label, decimals = 0 }: { value: number; label: string; decimals?: number }) {
  return (
    <div>
      <div className="font-display text-4xl md:text-5xl tabular"><Counter to={value} decimals={decimals} /></div>
      <div className="eyebrow text-cream/50 mt-1">{label}</div>
    </div>
  );
}

function Card({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="p-6 rounded-2xl bg-cream border border-hairline flex items-center gap-4">
      <div className="w-11 h-11 rounded-full grad-gold text-navy-ink flex items-center justify-center">
        <Icon size={16} />
      </div>
      <div>
        <div className="eyebrow mb-1">{label}</div>
        <div className="text-navy">{value}</div>
      </div>
    </div>
  );
}
