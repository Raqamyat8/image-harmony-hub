import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, addDays, isSameDay } from "date-fns";
import { Check, ChevronLeft, ArrowRight } from "lucide-react";
import { getProperty, formatPrice } from "@/data/properties";
import { getAgent } from "@/data/agents";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/book/$id")({
  loader: ({ params }) => {
    const p = getProperty(params.id);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `Book a viewing · ${loaderData?.title ?? "Residence"} — LuxEstate` },
      { name: "description", content: "Book a private viewing with your LuxEstate advisor." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BookPage,
});

const SLOTS = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

function BookPage() {
  const p = Route.useLoaderData();
  const agent = getAgent(p.agentId);
  const [step, setStep] = useState(0);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [done, setDone] = useState(false);

  const days = Array.from({ length: 14 }).map((_, i) => addDays(new Date(), i));
  const canNext = (step === 0 && date) || (step === 1 && time) || step === 2;

  return (
    <div className="min-h-screen pt-24 pb-24 bg-cream">
      <div className="max-w-3xl mx-auto px-6">
        <Link to="/properties/$id" params={{ id: p.id }} className="inline-flex items-center gap-1 text-navy/60 hover:text-navy text-sm mb-8">
          <ChevronLeft size={15} /> Back to residence
        </Link>

        <div className="eyebrow mb-3">Private viewing</div>
        <h1 className="font-display text-4xl md:text-5xl text-navy leading-tight">
          {done ? <>You're on <span className="italic text-grad-gold">the calendar.</span></> : <>Reserve a moment with <span className="italic text-grad-gold">{agent.name.split(" ")[0]}.</span></>}
        </h1>

        {/* progress */}
        <div className="mt-8 flex items-center gap-2">
          {["Date", "Time", "Confirm"].map((s, i) => (
            <div key={s} className="flex-1">
              <div className={cn(
                "h-1 rounded-full transition-all duration-500",
                i <= step || done ? "grad-gold" : "bg-hairline"
              )} />
              <div className={cn("mt-2 text-xs uppercase tracking-widest", i <= step || done ? "text-navy" : "text-navy/40")}>{s}</div>
            </div>
          ))}
        </div>

        {done ? (
          <ConfirmationScreen p={p} agent={agent} date={date!} time={time!} onReset={() => { setDone(false); setStep(0); setDate(null); setTime(null); }} />
        ) : (
          <div className="mt-10 bg-card rounded-3xl border border-hairline shadow-luxe p-6 md:p-10">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="d" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-display text-2xl text-navy mb-6">Choose a day</h2>
                  <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                    {days.map((d) => {
                      const active = date && isSameDay(d, date);
                      const isSunday = d.getDay() === 0;
                      return (
                        <button
                          key={d.toISOString()}
                          disabled={isSunday}
                          onClick={() => setDate(d)}
                          className={cn(
                            "aspect-square rounded-2xl border flex flex-col items-center justify-center transition-all",
                            active ? "border-gold bg-gold/10 text-navy scale-105 shadow-luxe" :
                            isSunday ? "border-hairline text-navy/30 line-through" :
                            "border-hairline text-navy hover:border-navy/40"
                          )}
                        >
                          <span className="text-[10px] uppercase tracking-widest text-navy/40">{format(d, "EEE")}</span>
                          <span className="font-display text-2xl tabular">{format(d, "d")}</span>
                          <span className="text-[10px] text-navy/40">{format(d, "MMM")}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
              {step === 1 && (
                <motion.div key="t" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-display text-2xl text-navy mb-2">Choose a time</h2>
                  <p className="text-navy/60 text-sm mb-6">{date && format(date, "EEEE, MMMM d")}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {SLOTS.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTime(t)}
                        className={cn(
                          "py-4 rounded-2xl border tabular transition-all",
                          time === t
                            ? "border-gold bg-gold/10 text-navy scale-105 shadow-luxe"
                            : "border-hairline text-navy hover:border-navy/40"
                        )}
                      >{t}</button>
                    ))}
                  </div>
                </motion.div>
              )}
              {step === 2 && (
                <motion.form
                  key="c" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  onSubmit={(e) => { e.preventDefault(); setDone(true); }}
                >
                  <h2 className="font-display text-2xl text-navy mb-6">Confirm your details</h2>
                  <div className="p-4 rounded-2xl bg-navy/[0.04] flex items-center gap-4 mb-6">
                    <img src={p.images[0]} alt="" className="w-16 h-16 object-cover rounded-xl" />
                    <div className="flex-1 min-w-0">
                      <div className="font-display text-navy truncate">{p.title}</div>
                      <div className="text-xs text-navy/60">{date && format(date, "EEE, MMM d")} · {time}</div>
                    </div>
                    <div className="font-display tabular text-navy">{formatPrice(p)}</div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Input label="Full name" value={name} onChange={setName} required />
                    <Input label="Email" type="email" value={email} onChange={setEmail} required />
                    <Input label="Phone" type="tel" value={phone} onChange={setPhone} required />
                    <div>
                      <div className="eyebrow mb-2">Advisor</div>
                      <div className="h-11 flex items-center gap-2 text-sm text-navy/70">
                        <img src={agent.image} className="w-7 h-7 rounded-full object-cover" alt="" />
                        {agent.name}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="eyebrow mb-2">Notes (optional)</div>
                    <textarea
                      value={notes} onChange={(e) => setNotes(e.target.value)}
                      className="w-full border border-hairline rounded-2xl p-4 outline-none focus:border-gold min-h-24 text-sm"
                      placeholder="Anything your advisor should know before the viewing?"
                    />
                  </div>
                  <button type="submit" className="btn-shimmer mt-8 w-full grad-gold text-navy-ink py-4 rounded-full font-medium inline-flex items-center justify-center gap-2 shadow-luxe">
                    Confirm private viewing <ArrowRight size={15} />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            {step < 2 && (
              <div className="mt-8 flex items-center justify-between">
                <button
                  disabled={step === 0}
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className="text-sm text-navy/60 hover:text-navy disabled:opacity-40"
                >
                  ← Back
                </button>
                <button
                  disabled={!canNext}
                  onClick={() => setStep((s) => s + 1)}
                  className="grad-gold text-navy-ink px-6 py-3 rounded-full font-medium disabled:opacity-40 inline-flex items-center gap-2"
                >
                  Continue <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div>
      <div className="eyebrow mb-2">{label}</div>
      <input
        type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required}
        className="w-full border border-hairline rounded-xl h-11 px-4 text-sm outline-none focus:border-gold bg-transparent"
      />
    </div>
  );
}

function ConfirmationScreen({ p, agent, date, time, onReset }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-10 text-center bg-card rounded-3xl border border-hairline shadow-luxe p-10 md:p-14">
      <motion.div
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
        className="w-20 h-20 rounded-full grad-gold text-navy-ink mx-auto flex items-center justify-center shadow-luxe-lg"
      >
        <Check size={32} strokeWidth={2.5} />
      </motion.div>
      <h2 className="mt-6 font-display text-3xl text-navy">Confirmation sent.</h2>
      <p className="mt-3 text-navy/60 max-w-md mx-auto">
        We've emailed the details. {agent.name.split(" ")[0]} will call to confirm access shortly.
      </p>
      <div className="mt-8 p-4 rounded-2xl bg-navy/[0.04] text-left flex items-center gap-4 max-w-md mx-auto">
        <img src={p.images[0]} alt="" className="w-14 h-14 object-cover rounded-xl" />
        <div className="flex-1 min-w-0">
          <div className="font-display text-navy truncate">{p.title}</div>
          <div className="text-xs text-navy/60">{format(date, "EEE, MMM d")} at {time}</div>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <Link to="/properties" className="px-5 py-2.5 rounded-full border border-navy/20 text-navy hover:bg-navy hover:text-cream transition-colors">
          Browse more
        </Link>
        <button onClick={onReset} className="px-5 py-2.5 rounded-full grad-gold text-navy-ink font-medium">
          Reschedule
        </button>
      </div>
    </motion.div>
  );
}
