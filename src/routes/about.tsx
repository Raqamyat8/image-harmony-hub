import { createFileRoute, Link } from "@tanstack/react-router";
import { IMG } from "@/assets/images";
import { agents } from "@/data/agents";
import { partners } from "@/data/misc";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Counter } from "@/components/Counter";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — LuxEstate" },
      { name: "description", content: "LuxEstate is a private advisory reimagining how the world's most extraordinary residences are found — with AI, quietly, and with intention." },
      { property: "og:title", content: "About — LuxEstate" },
      { property: "og:description", content: "A private advisory reimagining how extraordinary homes are found." },
      { property: "og:image", content: IMG.terrace },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="pt-24 pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img src={IMG.terrace} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-navy-ink/70" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-10 py-32 text-cream text-center">
          <div className="eyebrow text-gold-soft mb-6">A quieter way to find home</div>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.98]">
            We believe great homes<br />are <span className="italic text-grad-gold">found, not sold.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-cream/75 leading-relaxed max-w-2xl mx-auto">
            LuxEstate is a private advisory reimagining how the world's most extraordinary residences are discovered — with AI, quietly, and with intention.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <SectionHeading
              eyebrow="Our principles"
              title={<>Three ideas we <span className="italic text-grad-gold">refuse to compromise.</span></>}
            />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: "01", t: "Fewer, better", b: "Our advisors work with a small number of clients each year. Depth of relationship is our product." },
              { n: "02", t: "Discretion", b: "Off-market inventory, private viewings, quiet negotiations. No press releases, no public bidding." },
              { n: "03", t: "Craft in code", b: "Our AI reads intent rather than keywords. It surfaces homes that fit the way you'll actually live." },
            ].map((v, i) => (
              <Reveal key={v.n} delay={i * 0.1}>
                <div className="p-8 rounded-3xl bg-cream border border-hairline shadow-luxe h-full">
                  <div className="font-display text-5xl text-grad-gold tabular">{v.n}</div>
                  <div className="mt-6 font-display text-2xl text-navy">{v.t}</div>
                  <p className="mt-3 text-navy/60 leading-relaxed">{v.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="grad-hero text-cream grain">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 text-center md:text-left">
          {[
            { v: 2011, l: "Founded" },
            { v: 19, l: "Countries" },
            { v: 4.2, l: "Volume ($B)", d: 1 },
            { v: 4.9, l: "Client rating", d: 1 },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-5xl md:text-6xl tabular">
                <Counter to={s.v} decimals={s.d ?? 0} />
              </div>
              <div className="eyebrow text-cream/50 mt-2">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <SectionHeading
              eyebrow="The team"
              title={<>Advisors who know their <span className="italic text-grad-gold">markets intimately.</span></>}
              action={
                <Link to="/agents" className="hidden md:inline-flex items-center gap-2 text-navy hover:text-gold transition-colors group">
                  Meet the advisors <ArrowRight size={14} />
                </Link>
              }
            />
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {agents.map((a, i) => (
              <Reveal key={a.id} delay={i * 0.08}>
                <Link to="/agents/$id" params={{ id: a.id }} className="group block">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                    <img src={a.image} alt={a.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="mt-4 font-display text-lg text-navy">{a.name}</div>
                  <div className="text-xs text-navy/50">{a.title}</div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 border-y border-hairline">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center eyebrow mb-8">Partners & press</div>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {partners.map((p) => (
              <span key={p} className="font-display text-xl md:text-2xl text-navy/30 hover:text-navy/70 transition-colors tracking-wide">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="font-display text-4xl md:text-5xl text-navy leading-tight">
            Ready to begin <span className="italic text-grad-gold">the search?</span>
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/properties" className="btn-shimmer grad-gold text-navy-ink px-6 py-3 rounded-full font-medium inline-flex items-center gap-2">
              Browse residences <ArrowRight size={15} />
            </Link>
            <Link to="/agents" className="px-6 py-3 rounded-full border border-navy/20 text-navy hover:bg-navy hover:text-cream transition-colors">
              Speak to an advisor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
