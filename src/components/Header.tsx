import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/properties", label: "Properties" },
  { to: "/agents", label: "Agents" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/about", label: "About" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const solid = scrolled || !overHero;

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        solid
          ? "bg-cream/85 backdrop-blur-xl border-b border-hairline"
          : "bg-transparent"
      )}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between h-16 lg:h-20">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span
            className={cn(
              "inline-flex items-center justify-center w-9 h-9 rounded-full font-display text-lg font-semibold transition-colors",
              solid ? "bg-navy text-cream" : "bg-cream/10 text-cream border border-cream/30"
            )}
          >
            L
          </span>
          <span
            className={cn(
              "font-display text-xl tracking-tight",
              solid ? "text-navy" : "text-cream"
            )}
          >
            LuxEstate
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV.map((n) => {
            const active = pathname === n.to || (n.to !== "/" && pathname.startsWith(n.to));
            return (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "relative text-sm tracking-wide transition-colors py-1",
                  solid ? "text-navy/80 hover:text-navy" : "text-cream/85 hover:text-cream"
                )}
              >
                {n.label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-300",
                    active ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <Link
            to="/auth"
            className={cn(
              "text-sm px-4 py-2 rounded-full transition-colors",
              solid ? "text-navy/80 hover:text-navy" : "text-cream/90 hover:text-cream"
            )}
          >
            Sign in
          </Link>
          <Link
            to="/auth"
            className="btn-shimmer grad-gold text-navy-ink text-sm font-medium px-5 py-2.5 rounded-full shadow-luxe hover:shadow-luxe-lg transition-shadow"
          >
            List a Property
          </Link>
        </div>

        <button
          className={cn(
            "lg:hidden p-2 -mr-2",
            solid ? "text-navy" : "text-cream"
          )}
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-cream border-b border-hairline">
          <div className="px-6 py-6 flex flex-col gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-navy py-3 text-lg font-display border-b border-hairline"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/auth"
              className="mt-4 grad-gold text-navy-ink text-center py-3 rounded-full font-medium"
            >
              List a Property
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
