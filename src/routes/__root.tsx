import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileTabBar } from "@/components/MobileTabBar";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-6">
      <div className="max-w-lg text-center">
        <div className="eyebrow mb-6">404 · Not found</div>
        <h1 className="font-display text-6xl md:text-7xl text-navy">This residence is off-market.</h1>
        <p className="mt-4 text-navy/60">
          The page you're looking for doesn't exist. Explore our current collection instead.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/" className="px-5 py-2.5 rounded-full border border-navy/20 text-navy hover:bg-navy hover:text-cream transition-colors">
            Home
          </Link>
          <Link to="/properties" className="px-5 py-2.5 rounded-full grad-gold text-navy-ink font-medium">
            Browse properties
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-6">
      <div className="max-w-md text-center">
        <h1 className="font-display text-4xl text-navy">Something didn't load.</h1>
        <p className="mt-3 text-navy/60">Please try again or return home.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="px-5 py-2.5 rounded-full grad-gold text-navy-ink font-medium"
          >
            Try again
          </button>
          <a href="/" className="px-5 py-2.5 rounded-full border border-navy/20 text-navy hover:bg-navy hover:text-cream transition-colors">
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "LuxEstate — Extraordinary Homes, Answered by AI" },
      { name: "description", content: "A quieter way to find an extraordinary home. AI-powered discovery, private advisors, and a curated collection of the world's most exceptional residences." },
      { name: "author", content: "LuxEstate" },
      { property: "og:site_name", content: "LuxEstate" },
      { property: "og:title", content: "LuxEstate — Extraordinary Homes, Answered by AI" },
      { property: "og:description", content: "AI-powered discovery of the world's most exceptional residences." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAuth = pathname === "/auth";

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-cream text-ink">
        {!isAuth && <Header />}
        <main className="flex-1">
          <Outlet />
        </main>
        {!isAuth && <Footer />}
        {!isAuth && <MobileTabBar />}
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}
