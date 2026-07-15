import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { cn } from "@/lib/utils";

function calc(price: number, downPct: number, ratePct: number, years: number) {
  const principal = Math.max(0, price - price * (downPct / 100));
  const r = ratePct / 100 / 12;
  const n = years * 12;
  const monthly = r === 0 ? principal / n : (principal * r) / (1 - Math.pow(1 + r, -n));
  const total = monthly * n;
  const interest = total - principal;
  return { principal, monthly, total, interest };
}

export function MortgageCalculator({ initialPrice = 2_400_000, compact = false }: { initialPrice?: number; compact?: boolean }) {
  const [price, setPrice] = useState(initialPrice);
  const [down, setDown] = useState(20);
  const [rate, setRate] = useState(6.25);
  const [years, setYears] = useState(30);

  const { monthly, interest, total, principal } = useMemo(
    () => calc(price, down, rate, years),
    [price, down, rate, years]
  );

  const data = useMemo(() => {
    const arr = [];
    const r = rate / 100 / 12;
    let balance = principal;
    let cumInterest = 0;
    for (let m = 0; m <= years * 12; m += 12) {
      arr.push({ year: m / 12, balance: Math.max(0, balance), interest: cumInterest });
      for (let k = 0; k < 12 && balance > 0; k++) {
        const iPart = balance * r;
        const pPart = monthly - iPart;
        cumInterest += iPart;
        balance -= pPart;
      }
    }
    return arr;
  }, [principal, rate, years, monthly]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className={cn("grid gap-8 md:gap-12", compact ? "md:grid-cols-1" : "md:grid-cols-5")}>
      <div className={cn("space-y-6", !compact && "md:col-span-2")}>
        <Field label="Property price" value={fmt(price)}>
          <input
            type="range" min={200000} max={30_000_000} step={50000}
            value={price} onChange={(e) => setPrice(+e.target.value)}
            className="range"
          />
        </Field>
        <Field label="Down payment" value={`${down}%`}>
          <input type="range" min={5} max={60} value={down} onChange={(e) => setDown(+e.target.value)} className="range" />
        </Field>
        <Field label="Interest rate" value={`${rate.toFixed(2)}%`}>
          <input type="range" min={2} max={12} step={0.05} value={rate} onChange={(e) => setRate(+e.target.value)} className="range" />
        </Field>
        <Field label="Term" value={`${years} years`}>
          <div className="flex gap-2">
            {[10, 15, 20, 30].map((y) => (
              <button
                key={y}
                onClick={() => setYears(y)}
                className={cn(
                  "flex-1 py-2 rounded-full text-sm border transition-all",
                  years === y
                    ? "bg-navy text-cream border-navy"
                    : "border-hairline text-navy/70 hover:border-navy/40"
                )}
              >
                {y}y
              </button>
            ))}
          </div>
        </Field>
      </div>

      <div className={cn("relative rounded-3xl p-8 grad-hero text-cream overflow-hidden grain", !compact && "md:col-span-3")}>
        <div className="eyebrow text-gold-soft mb-2">Estimated monthly</div>
        <motion.div
          key={monthly.toFixed(0)}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-display text-5xl md:text-6xl tabular"
        >
          {fmt(monthly)}
        </motion.div>

        <div className="grid grid-cols-3 gap-4 mt-8">
          <Metric label="Principal" value={fmt(principal)} />
          <Metric label="Interest" value={fmt(interest)} />
          <Metric label="Total cost" value={fmt(total)} />
        </div>

        <div className="mt-6 h-40 -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E4C77B" stopOpacity={0.7} />
                  <stop offset="100%" stopColor="#E4C77B" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#14A278" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#14A278" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="year" stroke="rgba(250,250,247,0.35)" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ background: "#06111F", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }}
                labelStyle={{ color: "#E4C77B" }}
                formatter={(v: number) => fmt(v)}
              />
              <Area type="monotone" dataKey="balance" stroke="#E4C77B" strokeWidth={2} fill="url(#g1)" />
              <Area type="monotone" dataKey="interest" stroke="#14A278" strokeWidth={2} fill="url(#g2)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <style>{`
        .range {
          appearance: none; width: 100%; height: 4px; background: var(--hairline); border-radius: 999px; outline: none;
        }
        .range::-webkit-slider-thumb {
          appearance: none; width: 20px; height: 20px; border-radius: 50%;
          background: linear-gradient(135deg,#E4C77B,#C9A24B);
          box-shadow: 0 4px 12px rgba(201,162,75,0.4);
          cursor: pointer; border: 3px solid #FAFAF7;
        }
        .range::-moz-range-thumb {
          width: 20px; height: 20px; border-radius: 50%;
          background: linear-gradient(135deg,#E4C77B,#C9A24B); cursor: pointer; border: 3px solid #FAFAF7;
        }
      `}</style>
    </div>
  );
}

function Field({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-sm text-navy/60">{label}</span>
        <span className="font-display text-navy tabular">{value}</span>
      </div>
      {children}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-cream/50 text-[10px] uppercase tracking-widest mb-1">{label}</div>
      <div className="font-display tabular text-lg md:text-xl">{value}</div>
    </div>
  );
}
