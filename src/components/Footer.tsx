import { Link } from "@tanstack/react-router";
import { ArrowRight, Instagram, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="bg-navy text-cream/85 relative overflow-hidden grain">
      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-6">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full grad-gold text-navy-ink font-display text-lg font-semibold">
                L
              </span>
              <span className="font-display text-xl text-cream">LuxEstate</span>
            </div>
            <p className="font-display text-2xl md:text-3xl text-cream leading-snug max-w-md">
              A quieter way to find an extraordinary home.
            </p>

            <form
              className="mt-8 max-w-md"
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubscribed(true);
              }}
            >
              <label className="eyebrow text-gold-soft">The Weekly Selection</label>
              {subscribed ? (
                <div className="mt-3 py-3 text-emerald-soft flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full grad-gold text-navy-ink text-xs inline-flex items-center justify-center">✓</span>
                  You're on the list.
                </div>
              ) : (
                <div className="mt-3 flex items-center gap-2 border-b border-cream/20 focus-within:border-gold transition-colors">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="flex-1 bg-transparent py-3 outline-none text-cream placeholder:text-cream/40"
                  />
                  <button className="p-3 text-gold hover:text-gold-soft" aria-label="Subscribe">
                    <ArrowRight size={18} />
                  </button>
                </div>
              )}
            </form>
          </div>

          <FooterCol
            title="Explore"
            links={[
              { label: "Properties", to: "/properties" },
              { label: "Agents", to: "/agents" },
              { label: "About", to: "/about" },
            ]}
          />
          <FooterCol
            title="Services"
            links={[
              { label: "Buy", to: "/properties" },
              { label: "Rent", to: "/properties" },
              { label: "Sell", to: "/auth" },
              { label: "Mortgage", to: "/#calculator" },
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              { label: "Careers", to: "/about" },
              { label: "Press", to: "/about" },
              { label: "Contact", to: "/about" },
            ]}
          />
        </div>

        <div className="mt-16 pt-8 border-t border-cream/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-sm text-cream/50">
            <span>© {new Date().getFullYear()} LuxEstate</span>
            <span>·</span>
            <span>Licensed brokerage</span>
            <span>·</span>
            <span>Equal Housing</span>
          </div>
          <div className="flex items-center gap-3">
            {[Instagram, Linkedin, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full border border-cream/15 hover:border-gold hover:text-gold transition-colors inline-flex items-center justify-center"
                aria-label="Social"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div className="md:col-span-2 lg:col-span-2">
      <div className="eyebrow text-gold-soft mb-4">{title}</div>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="text-cream/75 hover:text-gold transition-colors text-sm">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
