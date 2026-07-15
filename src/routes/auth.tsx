import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, Lock, User } from "lucide-react";
import { IMG } from "@/assets/images";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — LuxEstate" },
      { name: "description", content: "Sign in to LuxEstate or create a private account to save residences and coordinate with your advisor." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"in" | "up">("in");

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-cream">
      {/* Left visual */}
      <div className="relative hidden lg:block overflow-hidden">
        <img src={IMG.interior} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-ink/80 via-navy/50 to-transparent" />
        <div className="absolute inset-0 grain" />
        <div className="relative h-full flex flex-col justify-between p-12 text-cream">
          <Link to="/" className="inline-flex items-center gap-2.5 w-fit">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full grad-gold text-navy-ink font-display text-lg font-semibold">L</span>
            <span className="font-display text-xl">LuxEstate</span>
          </Link>
          <div>
            <div className="eyebrow text-gold-soft mb-4">A private account</div>
            <h1 className="font-display text-5xl xl:text-6xl leading-[1.02]">
              Your next chapter, <span className="italic text-grad-gold">curated.</span>
            </h1>
            <p className="mt-5 max-w-md text-cream/70 leading-relaxed">
              Save residences, coordinate viewings, and speak directly with your advisor from a calm, single place.
            </p>
          </div>
          <div className="text-xs text-cream/40">© {new Date().getFullYear()} LuxEstate · Licensed brokerage</div>
        </div>
      </div>

      {/* Right form */}
      <div className="flex flex-col justify-center p-8 md:p-16">
        <div className="lg:hidden mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-navy text-cream font-display font-semibold">L</span>
            <span className="font-display text-navy text-xl">LuxEstate</span>
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto">
          <div className="eyebrow mb-3">{mode === "in" ? "Welcome back" : "Create account"}</div>
          <h2 className="font-display text-4xl text-navy leading-tight">
            {mode === "in" ? "Sign in to LuxEstate." : "Begin your search."}
          </h2>

          {/* social */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            <button className="h-11 rounded-full border border-hairline text-sm text-navy hover:border-navy/40 transition-colors inline-flex items-center justify-center gap-2">
              <GoogleIcon /> Google
            </button>
            <button className="h-11 rounded-full border border-hairline text-sm text-navy hover:border-navy/40 transition-colors inline-flex items-center justify-center gap-2">
              <AppleIcon /> Apple
            </button>
          </div>

          <div className="mt-6 flex items-center gap-3 text-xs uppercase tracking-widest text-navy/40">
            <div className="flex-1 h-px bg-hairline" /> or <div className="flex-1 h-px bg-hairline" />
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 space-y-4"
            >
              {mode === "up" && (
                <IconField icon={User} type="text" placeholder="Full name" />
              )}
              <IconField icon={Mail} type="email" placeholder="you@company.com" />
              <IconField icon={Lock} type="password" placeholder="Password" />
              {mode === "in" && (
                <div className="flex items-center justify-between text-sm">
                  <label className="inline-flex items-center gap-2 text-navy/60">
                    <input type="checkbox" className="rounded" /> Remember me
                  </label>
                  <a href="#" className="text-navy/60 hover:text-gold">Forgot password?</a>
                </div>
              )}
              <button type="submit" className="btn-shimmer w-full grad-gold text-navy-ink py-3.5 rounded-full font-medium inline-flex items-center justify-center gap-2 shadow-luxe">
                {mode === "in" ? "Sign in" : "Create account"} <ArrowRight size={15} />
              </button>
            </motion.form>
          </AnimatePresence>

          <div className="mt-8 text-center text-sm text-navy/60">
            {mode === "in" ? "New to LuxEstate?" : "Already a member?"}{" "}
            <button onClick={() => setMode(mode === "in" ? "up" : "in")} className="text-navy hover:text-gold underline underline-offset-4">
              {mode === "in" ? "Create an account" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconField({ icon: Icon, ...rest }: any) {
  return (
    <label className="flex items-center gap-3 border border-hairline rounded-full h-12 px-4 focus-within:border-gold transition-colors">
      <Icon size={15} className="text-navy/40" />
      <input {...rest} className="flex-1 bg-transparent outline-none text-navy placeholder:text-navy/40 text-sm" />
    </label>
  );
}

function GoogleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/></svg>
  );
}
function AppleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
  );
}
