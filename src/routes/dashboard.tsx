import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell,
  Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import {
  ArrowUpRight, ArrowDownRight, Eye, Heart, Calendar as CalendarIcon,
  MessagesSquare, Bell, Plus, Search, MoreHorizontal, Home as HomeIcon,
  LayoutGrid, BarChart3, Users, Settings, LogOut, Sparkles,
} from "lucide-react";
import { properties, formatPrice } from "@/data/properties";
import { getAgent } from "@/data/agents";
import { Counter } from "@/components/Counter";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — LuxEstate" },
      { name: "description", content: "Manage listings, track performance, and coordinate viewings — a private control room for LuxEstate advisors." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardPage,
});

// ── Mock data ─────────────────────────────────────────────────
const traffic = [
  { d: "Mon", views: 2340, leads: 42 }, { d: "Tue", views: 3120, leads: 51 },
  { d: "Wed", views: 2810, leads: 46 }, { d: "Thu", views: 3960, leads: 78 },
  { d: "Fri", views: 4820, leads: 92 }, { d: "Sat", views: 5410, leads: 104 },
  { d: "Sun", views: 4290, leads: 71 },
];
const revenue = [
  { m: "Jan", v: 1.2 }, { m: "Feb", v: 1.8 }, { m: "Mar", v: 2.4 },
  { m: "Apr", v: 2.1 }, { m: "May", v: 3.2 }, { m: "Jun", v: 3.8 },
  { m: "Jul", v: 4.6 }, { m: "Aug", v: 5.2 }, { m: "Sep", v: 4.9 },
  { m: "Oct", v: 6.1 }, { m: "Nov", v: 6.8 }, { m: "Dec", v: 7.4 },
];
const mix = [
  { name: "Penthouse", value: 34, fill: "#0B1F3A" },
  { name: "Villa", value: 26, fill: "#0E7C5A" },
  { name: "Residence", value: 22, fill: "#C9A24B" },
  { name: "Waterfront", value: 18, fill: "#17335A" },
];
const activities = [
  { who: "Isabella Moreau", act: "requested a viewing for", what: "Meridian Tower · PH-42", when: "12 min ago", tone: "gold" },
  { who: "Kenji Watanabe", act: "made an offer on", what: "Azure Coastal Residence", when: "1 h ago", tone: "emerald" },
  { who: "Amara Okoye", act: "saved", what: "The Bowery Loft No. 12", when: "3 h ago", tone: "navy" },
  { who: "Julian Arenas", act: "closed the sale of", what: "Palisade Hill Estate", when: "yesterday", tone: "emerald" },
];
const bookings = [
  { time: "10:00", client: "Isabella Moreau", prop: "Meridian Tower", status: "Confirmed" },
  { time: "11:30", client: "Ravi Ahluwalia", prop: "Azure Terrace", status: "Confirmed" },
  { time: "14:00", client: "S. Nakamura", prop: "Palisade Hill", status: "Pending" },
  { time: "16:30", client: "Amara Okoye", prop: "Bowery Loft", status: "Confirmed" },
];

// ── Page ───────────────────────────────────────────────────────
function DashboardPage() {
  return (
    <div className="min-h-screen bg-cream pt-16 lg:pt-0">
      <div className="lg:grid lg:grid-cols-[240px_1fr]">
        <SideNav />
        <main className="min-w-0">
          <TopBar />
          <div className="p-6 lg:p-10 space-y-8">
            <Header />
            <KpiRow />
            <div className="grid lg:grid-cols-3 gap-6">
              <TrafficCard />
              <MixCard />
            </div>
            <RevenueCard />
            <div className="grid lg:grid-cols-3 gap-6">
              <ListingsTable />
              <RightRail />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// ── Side navigation ───────────────────────────────────────────
function SideNav() {
  const items = [
    { icon: LayoutGrid, label: "Overview", active: true },
    { icon: HomeIcon, label: "Listings" },
    { icon: CalendarIcon, label: "Bookings" },
    { icon: MessagesSquare, label: "Messages", badge: 4 },
    { icon: BarChart3, label: "Analytics" },
    { icon: Users, label: "Clients" },
    { icon: Settings, label: "Settings" },
  ];
  return (
    <aside className="hidden lg:flex flex-col fixed inset-y-0 left-0 w-60 border-r border-hairline bg-white/60 backdrop-blur-xl">
      <Link to="/" className="flex items-center gap-2.5 h-20 px-6 border-b border-hairline">
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-navy text-cream font-display text-lg font-semibold">L</span>
        <span className="font-display text-xl text-navy">LuxEstate</span>
      </Link>
      <nav className="flex-1 px-3 py-6 space-y-0.5">
        {items.map((i) => (
          <button
            key={i.label}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors",
              i.active ? "bg-navy text-cream" : "text-navy/70 hover:bg-navy/5 hover:text-navy"
            )}
          >
            <i.icon size={16} strokeWidth={1.75} />
            <span className="flex-1 text-left">{i.label}</span>
            {i.badge && (
              <span className={cn(
                "text-[10px] font-medium tabular px-1.5 py-0.5 rounded-full",
                i.active ? "bg-gold text-navy-ink" : "bg-gold/20 text-navy"
              )}>{i.badge}</span>
            )}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-hairline">
        <div className="p-4 rounded-2xl grad-hero text-cream grain relative overflow-hidden">
          <Sparkles size={16} className="text-gold-soft" />
          <div className="mt-2 font-display text-lg leading-tight">AI Insights <span className="italic text-grad-gold">Pro</span></div>
          <p className="mt-1 text-xs text-cream/70">Predictive pricing on every listing.</p>
          <button className="mt-3 w-full grad-gold text-navy-ink text-xs font-medium py-2 rounded-full">Upgrade</button>
        </div>
        <button className="mt-4 w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-navy/60 hover:text-navy">
          <LogOut size={15} /> Sign out
        </button>
      </div>
    </aside>
  );
}

// ── Top bar ───────────────────────────────────────────────────
function TopBar() {
  const agent = getAgent("julian-arenas")!;
  return (
    <div className="sticky top-0 z-30 h-20 border-b border-hairline bg-white/70 backdrop-blur-xl flex items-center gap-6 px-6 lg:px-10">
      <div className="flex-1 max-w-lg relative">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40" />
        <input
          placeholder="Search listings, clients, addresses…"
          className="w-full h-11 pl-11 pr-16 rounded-full border border-hairline bg-cream/50 text-sm outline-none focus:border-gold transition-colors"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-navy/40 px-1.5 py-0.5 rounded border border-hairline bg-white">⌘K</kbd>
      </div>
      <button className="relative w-10 h-10 rounded-full border border-hairline hover:border-navy/30 grid place-items-center text-navy/70">
        <Bell size={15} />
        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald" />
      </button>
      <div className="flex items-center gap-3 pl-4 border-l border-hairline">
        <img src={agent.image} alt="" className="w-9 h-9 rounded-full object-cover" />
        <div className="hidden md:block">
          <div className="text-sm text-navy font-medium leading-tight">{agent.name}</div>
          <div className="text-[11px] text-navy/50">Senior Advisor</div>
        </div>
      </div>
    </div>
  );
}

// ── Header greeting ───────────────────────────────────────────
function Header() {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:flex-wrap sm:justify-between">
      <div className="min-w-0">
        <div className="eyebrow mb-3">Wednesday · July 15</div>
        <h1 className="font-display text-3xl md:text-5xl text-navy leading-tight truncate">
          Good morning, <span className="italic text-grad-gold">Julian.</span>
        </h1>
        <p className="mt-2 text-navy/60 text-sm">You have 4 viewings today and 2 offers awaiting review.</p>
      </div>
      <button className="btn-shimmer shrink-0 grad-gold text-navy-ink px-5 py-3 rounded-full font-medium inline-flex items-center gap-2 shadow-luxe">
        <Plus size={15} /> New listing
      </button>
    </div>
  );
}

// ── KPI cards ─────────────────────────────────────────────────
function KpiRow() {
  const kpis = [
    { label: "Total views", value: 128420, delta: 12.4, icon: Eye },
    { label: "Active leads", value: 384, delta: 8.1, icon: MessagesSquare },
    { label: "Saved listings", value: 1092, delta: -2.3, icon: Heart },
    { label: "Revenue (YTD)", value: 7.4, decimals: 1, prefix: "$", suffix: "M", delta: 24.6, icon: BarChart3 },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
      {kpis.map((k, i) => (
        <Reveal key={k.label} delay={i * 0.05}>
          <div className="group relative overflow-hidden p-5 lg:p-6 rounded-2xl bg-card border border-hairline shadow-luxe hover:shadow-luxe-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-navy/[0.04] grid place-items-center text-navy">
                <k.icon size={16} />
              </div>
              <div className={cn(
                "inline-flex items-center gap-0.5 text-[11px] font-medium tabular px-1.5 py-0.5 rounded-full",
                k.delta >= 0 ? "bg-emerald/10 text-emerald" : "bg-destructive/10 text-destructive"
              )}>
                {k.delta >= 0 ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
                {Math.abs(k.delta).toFixed(1)}%
              </div>
            </div>
            <div className="eyebrow mt-6">{k.label}</div>
            <div className="mt-2 font-display text-3xl lg:text-4xl text-navy tabular">
              {k.prefix}<Counter to={k.value} decimals={k.decimals ?? 0} />{k.suffix}
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gold/5 group-hover:bg-gold/10 transition-colors" />
          </div>
        </Reveal>
      ))}
    </div>
  );
}

// ── Charts ────────────────────────────────────────────────────
function TrafficCard() {
  return (
    <Reveal className="lg:col-span-2">
      <div className="p-6 rounded-2xl bg-card border border-hairline shadow-luxe h-full">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="eyebrow">Weekly traffic</div>
            <div className="mt-1 font-display text-2xl text-navy">Views & leads</div>
          </div>
          <div className="flex gap-1 text-xs">
            {["7D", "30D", "90D"].map((r, i) => (
              <button key={r} className={cn(
                "px-3 py-1.5 rounded-full",
                i === 0 ? "bg-navy text-cream" : "text-navy/60 hover:bg-navy/5"
              )}>{r}</button>
            ))}
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={traffic} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
              <defs>
                <linearGradient id="gv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0B1F3A" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#0B1F3A" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gl" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C9A24B" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#C9A24B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ECECE6" vertical={false} />
              <XAxis dataKey="d" stroke="#6B7280" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#6B7280" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #ECECE6", fontSize: 12 }} />
              <Area type="monotone" dataKey="views" stroke="#0B1F3A" strokeWidth={2} fill="url(#gv)" />
              <Area type="monotone" dataKey="leads" stroke="#C9A24B" strokeWidth={2} fill="url(#gl)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Reveal>
  );
}

function MixCard() {
  return (
    <Reveal>
      <div className="p-6 rounded-2xl bg-card border border-hairline shadow-luxe h-full">
        <div className="eyebrow">Portfolio mix</div>
        <div className="mt-1 font-display text-2xl text-navy mb-2">By category</div>
        <div className="h-44 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={mix} innerRadius={48} outerRadius={72} paddingAngle={3} dataKey="value" stroke="none">
                {mix.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #ECECE6", fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 grid place-items-center pointer-events-none">
            <div className="text-center">
              <div className="font-display text-3xl text-navy tabular">{mix.reduce((a, b) => a + b.value, 0)}</div>
              <div className="eyebrow">Listings</div>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          {mix.map((m) => (
            <div key={m.name} className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full" style={{ background: m.fill }} />
              <span className="text-navy/70 flex-1">{m.name}</span>
              <span className="tabular text-navy">{m.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function RevenueCard() {
  return (
    <Reveal>
      <div className="p-6 rounded-2xl bg-card border border-hairline shadow-luxe">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:flex-wrap sm:justify-between mb-4">
          <div className="min-w-0">
            <div className="eyebrow">Revenue</div>
            <div className="mt-1 font-display text-2xl text-navy">Monthly commissions</div>
          </div>
          <div className="shrink-0 text-right">
            <div className="text-xs text-navy/60">This year</div>
            <div className="font-display text-2xl text-navy tabular">$49.5M</div>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenue} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
              <defs>
                <linearGradient id="gb" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0E7C5A" />
                  <stop offset="100%" stopColor="#14A278" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ECECE6" vertical={false} />
              <XAxis dataKey="m" stroke="#6B7280" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#6B7280" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}M`} />
              <Tooltip
                cursor={{ fill: "rgba(11,31,58,0.04)" }}
                contentStyle={{ borderRadius: 12, border: "1px solid #ECECE6", fontSize: 12 }}
                formatter={(v: any) => [`$${v}M`, "Revenue"]}
              />
              <Bar dataKey="v" fill="url(#gb)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Reveal>
  );
}

// ── Listings table ────────────────────────────────────────────
function ListingsTable() {
  const rows = properties.slice(0, 6);
  const [tab, setTab] = useState<"active" | "pending" | "sold">("active");
  return (
    <Reveal className="lg:col-span-2">
      <div className="rounded-2xl bg-card border border-hairline shadow-luxe overflow-hidden">
        <div className="p-6 flex items-center justify-between gap-4 border-b border-hairline">
          <div>
            <div className="eyebrow">Your listings</div>
            <div className="mt-1 font-display text-2xl text-navy">Property management</div>
          </div>
          <div className="flex gap-1 text-xs bg-navy/[0.04] rounded-full p-1">
            {(["active", "pending", "sold"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={cn(
                "px-3 py-1.5 rounded-full capitalize",
                tab === t ? "bg-white text-navy shadow-sm" : "text-navy/60"
              )}>{t}</button>
            ))}
          </div>
        </div>
        <div className="divide-y divide-hairline">
          {rows.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="grid grid-cols-[auto_minmax(0,1fr)_auto] md:grid-cols-[auto_minmax(0,2fr)_1fr_1fr_1fr_auto] items-center gap-4 p-4 md:p-5 hover:bg-navy/[0.02] transition-colors"
            >
              <img src={p.images[0]} alt="" className="w-14 h-14 rounded-xl object-cover shrink-0" />
              <div className="min-w-0">
                <Link to="/properties/$id" params={{ id: p.id }} className="font-display text-navy text-lg truncate block hover:text-gold transition-colors">
                  {p.title}
                </Link>
                <div className="text-xs text-navy/50 truncate">{p.neighborhood}, {p.city}</div>
              </div>
              <div className="hidden md:block">
                <div className="eyebrow mb-1">Price</div>
                <div className="text-sm text-navy tabular">{formatPrice(p)}</div>
              </div>
              <div className="hidden md:block">
                <div className="eyebrow mb-1">Views</div>
                <div className="text-sm text-navy tabular">{(3200 + i * 428).toLocaleString()}</div>
              </div>
              <div className="hidden md:block">
                <div className="eyebrow mb-1">Status</div>
                <span className="inline-flex items-center gap-1.5 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
                  <span className="text-navy/70">Active</span>
                </span>
              </div>
              <button className="w-8 h-8 rounded-full hover:bg-navy/5 grid place-items-center text-navy/50">
                <MoreHorizontal size={15} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

// ── Right rail: bookings + activity ────────────────────────────
function RightRail() {
  return (
    <div className="space-y-6">
      <Reveal>
        <div className="p-6 rounded-2xl bg-card border border-hairline shadow-luxe">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="eyebrow">Today</div>
              <div className="mt-1 font-display text-xl text-navy">Bookings</div>
            </div>
            <span className="text-xs tabular text-navy/50">{bookings.length} viewings</span>
          </div>
          <div className="space-y-3">
            {bookings.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-navy/[0.03] transition-colors"
              >
                <div className="w-12 text-center shrink-0">
                  <div className="text-[10px] uppercase tracking-widest text-navy/40">Jul</div>
                  <div className="font-display text-lg text-navy leading-none tabular">15</div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-navy truncate">{b.client}</div>
                  <div className="text-[11px] text-navy/50 truncate">{b.prop}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm tabular text-navy">{b.time}</div>
                  <div className={cn(
                    "text-[10px] mt-0.5 inline-block px-1.5 py-0.5 rounded-full",
                    b.status === "Confirmed" ? "bg-emerald/10 text-emerald" : "bg-gold/10 text-navy"
                  )}>{b.status}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="p-6 rounded-2xl bg-card border border-hairline shadow-luxe">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="eyebrow">Live</div>
              <div className="mt-1 font-display text-xl text-navy">Recent activity</div>
            </div>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald" />
            </span>
          </div>
          <div className="space-y-4">
            {activities.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="flex gap-3 text-sm"
              >
                <div className={cn(
                  "w-8 h-8 rounded-full grid place-items-center shrink-0 text-[11px] font-medium",
                  a.tone === "gold" && "bg-gold/15 text-navy",
                  a.tone === "emerald" && "bg-emerald/15 text-emerald",
                  a.tone === "navy" && "bg-navy/10 text-navy"
                )}>
                  {a.who.split(" ").map(w => w[0]).join("").slice(0, 2)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-navy leading-snug">
                    <span className="font-medium">{a.who}</span>
                    <span className="text-navy/60"> {a.act} </span>
                    <span className="text-navy">{a.what}</span>
                  </div>
                  <div className="text-[11px] text-navy/40 mt-0.5">{a.when}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
