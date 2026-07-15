import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, MapPin, ArrowRight } from "lucide-react";
import { agents } from "@/data/agents";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export const Route = createFileRoute("/agents")({
  head: () => ({
    meta: [
      { title: "Advisors — LuxEstate" },
      { name: "description", content: "Meet the private advisors behind LuxEstate — a small team of specialists who know their markets intimately." },
      { property: "og:title", content: "Advisors — LuxEstate" },
      { property: "og:description", content: "Meet the private advisors behind LuxEstate." },
      { property: "og:url", content: "/agents" },
    ],
    links: [{ rel: "canonical", href: "/agents" }],
  }),
  component: AgentsPage,
});

function AgentsPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="The advisors"
            title={<>A small team, <span className="italic text-grad-gold">carefully chosen.</span></>}
            description="Fewer clients per advisor. Deeper knowledge of every neighborhood. LuxEstate advisors close roughly six residences a year — the ones that truly matter."
          />
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {agents.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.08}>
              <Link
                to="/agents/$id" params={{ id: a.id }}
                className="group grid grid-cols-5 gap-6 p-4 rounded-3xl bg-card border border-hairline shadow-luxe hover:shadow-luxe-lg transition-all"
              >
                <div className="col-span-2 aspect-[3/4] rounded-2xl overflow-hidden">
                  <img src={a.image} alt={a.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="col-span-3 flex flex-col py-4 pr-4">
                  <div className="eyebrow">{a.title.split(",")[1]?.trim() || "Advisor"}</div>
                  <div className="font-display text-3xl text-navy mt-2 leading-tight">{a.name}</div>
                  <div className="mt-2 text-sm text-navy/60">{a.title}</div>
                  <div className="mt-4 flex items-center gap-3 text-xs text-navy/50">
                    <span className="inline-flex items-center gap-1"><Star size={11} className="text-gold" fill="currentColor" /><span className="tabular text-navy">{a.rating}</span></span>
                    <span>·</span>
                    <span className="tabular">{a.sold} closings</span>
                    <span>·</span>
                    <span>{a.years}y</span>
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-navy/60">
                    <MapPin size={12} />{a.regions.join(" · ")}
                  </div>
                  <div className="flex-1" />
                  <div className="mt-4 inline-flex items-center gap-2 text-navy group-hover:text-gold transition-colors text-sm">
                    View profile <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
