import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Search, Heart, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/properties", label: "Search", icon: Search },
  { to: "/agents", label: "Saved", icon: Heart },
  { to: "/book/meridian-tower-42", label: "Book", icon: Calendar },
  { to: "/auth", label: "Profile", icon: User },
] as const;

export function MobileTabBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav
      className="lg:hidden fixed bottom-4 inset-x-4 z-40 rounded-full border border-hairline bg-cream/85 backdrop-blur-xl shadow-luxe-lg"
      aria-label="Primary"
    >
      <ul className="grid grid-cols-5 h-16">
        {TABS.map((t) => {
          const active = t.to === "/" ? pathname === "/" : pathname.startsWith(t.to.split("/")[1] ? "/" + t.to.split("/")[1] : t.to);
          const Icon = t.icon;
          return (
            <li key={t.label} className="relative">
              <Link
                to={t.to}
                className={cn(
                  "flex flex-col items-center justify-center h-full gap-1 text-[10px] tracking-wide transition-colors",
                  active ? "text-navy" : "text-navy/50"
                )}
              >
                <Icon size={19} strokeWidth={active ? 2 : 1.7} />
                <span>{t.label}</span>
                {active && (
                  <span className="absolute top-1.5 w-1 h-1 rounded-full bg-gold" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
