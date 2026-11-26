"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Copy,
  Check,
  Send,
  ArrowUpRight,
  ArrowUp,
  RotateCcw,
  Paperclip,
  X,
  FileText,
  Loader2,
} from "lucide-react";
import { PROFILE } from "@/data/portfolio";
import { useAppContext } from "./SmoothScrollProvider";
import { Magnetic, TiltPaperCard } from "./Magnetic";
import { paperSound } from "@/lib/paperSound";

const INTENTS = [
  {
    id: "sde",
    label: "Full-Stack Role",
    refCode: "REF // BN-SDE",
    placeholder: "Hiring for a Full-Stack Engineer (React, Next.js, Spring Boot)...",
  },
  {
    id: "ai",
    label: "AI / RAG",
    refCode: "REF // BN-AI",
    placeholder: "Let's discuss LLM pipelines, CrewAI agents, or RAG systems...",
  },
  {
    id: "build",
    label: "Project Build",
    refCode: "REF // BN-BUILD",
    placeholder: "Looking to collaborate on a production web or AI build...",
  },
  {
    id: "hi",
    label: "Say Hi",
    refCode: "REF // BN-HI",
    placeholder: "Hey Bhanu! Just vibing on your portfolio (or offering a cool role)...",
  },
] as const;

export function ContactSection() {
  const { showToast, scrollToSection } = useAppContext();
  const [selectedIntent, setSelectedIntent] = useState<(typeof INTENTS)[number]["id"]>("sde");
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<"email" | "phone" | "dispatch" | null>(null);
  const [dispatched, setDispatched] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const MAX_TOTAL_BYTES = 10 * 1024 * 1024; // 10 MB FormSubmit limit

  const activeIntent =
    INTENTS.find((i) => i.id === selectedIntent) ?? INTENTS[0];

  const copyText = (text: string, field: "email" | "phone", label: string) => {
    paperSound.playClick();
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    showToast(`Copied ${label}: ${text}`);
    window.setTimeout(() => {
      setCopiedField((cur) => (cur === field ? null : cur));
    }, 2000);
  };

  const formattedNote = `[${activeIntent.label}] ${activeIntent.refCode}\nFrom: ${senderName || "Visitor"} (${senderEmail || "N/A"})\n\n${message || activeIntent.placeholder}`;

  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    if (!picked.length) return;

    const merged = [...attachments, ...picked];
    const totalBytes = merged.reduce((sum, f) => sum + f.size, 0);
    if (totalBytes > MAX_TOTAL_BYTES) {
      showToast("Attachments exceed 10 MB limit");
      e.target.value = "";
      return;
    }

    paperSound.playClick();
    setAttachments(merged);
    if (dispatched) setDispatched(false);
    e.target.value = "";
  };

  const removeAttachment = (idx: number) => {
    paperSound.playClick();
    setAttachments((prev) => prev.filter((_, i) => i !== idx));
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleDispatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending || honeypot) return;

    const finalMessage = message.trim();
    if (!finalMessage) {
      setSendError("Please add a quick message before sending.");
      return;
    }

    paperSound.playCardFlick();
    setSending(true);
    setSendError(null);

    try {
      const formData = new FormData();
      formData.append("name", senderName.trim() || "Portfolio Visitor");
      formData.append("email", senderEmail.trim() || "Not provided");
      formData.append("intent", `${activeIntent.label} (${activeIntent.refCode})`);
      formData.append("message", finalMessage);
      formData.append(
        "_subject",
        `[${activeIntent.label}] Portfolio inquiry from ${senderName.trim() || "Visitor"}`
      );
      if (senderEmail.includes("@")) {
        formData.append("_replyto", senderEmail.trim());
      }
      formData.append("_template", "table");
      formData.append("_captcha", "false");
      formData.append("_honey", honeypot);

      attachments.forEach((file, i) => {
        formData.append(i === 0 ? "attachment" : `attachment_${i}`, file);
      });

      const res = await fetch(`https://formsubmit.co/${PROFILE.email}`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      const data = await res.json().catch(() => null);
      if (!res.ok || (data && data.success === "false")) {
        throw new Error(data?.message || "Could not deliver message right now.");
      }

      setDispatched(true);
      setAttachments([]);
      showToast(`Sent straight to ${PROFILE.email}`);
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Network issue — you can still copy the note below.";
      setSendError(msg);
      showToast("Delivery failed — see note options");
    } finally {
      setSending(false);
    }
  };

  const copyFormattedDispatch = () => {
    paperSound.playClick();
    navigator.clipboard.writeText(formattedNote);
    setCopiedField("dispatch");
    showToast("Copied formatted dispatch note");
    window.setTimeout(() => {
      setCopiedField((cur) => (cur === "dispatch" ? null : cur));
    }, 2000);
  };

  return (
    <section id="contact" className="relative pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Studio Card with 3D Paper Tilt + Live Signal Route */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <TiltPaperCard className="drafting-grid flex h-full flex-col justify-between rounded-[28px] border border-[var(--border-hairline)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-card)] sm:p-8">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--ink-muted)]">
                  <span className="text-[var(--accent)]">06</span>
                  <span>/</span>
                  <span>Dispatch Studio</span>
                </div>

                <div className="overflow-hidden">
                  <motion.h2
                    initial={{ y: "100%", opacity: 0 }}
                    whileInView={{ y: "0%", opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-4 text-3xl font-bold tracking-[-0.03em] text-[var(--ink-primary)] sm:text-5xl"
                  >
                    Got a cool problem?{" "}
                    <span className="font-serif font-normal italic text-[var(--accent)]">
                      Let&apos;s talk.
                    </span>
                  </motion.h2>
                </div>

                <p className="mt-4 max-w-lg text-sm leading-relaxed text-[var(--ink-secondary)] sm:text-base">
                  Open to Full-Stack, Backend, and Applied AI roles — or talking architecture,
                  local LLMs, and clean UI. Send a note (with files) straight to my inbox.
                </p>

                {/* Tactile Copy Cards with Flip Confirmation */}
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <motion.button
                    type="button"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => copyText(PROFILE.email, "email", "Email")}
                    className="group relative flex items-center justify-between overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-4 text-left transition-colors hover:border-[var(--ink-primary)]"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-mono text-[10px] uppercase text-[var(--ink-muted)]">
                          Email
                        </div>
                        <div className="truncate text-xs font-semibold text-[var(--ink-primary)] sm:text-sm">
                          {PROFILE.email}
                        </div>
                      </div>
                    </div>
                    <AnimatePresence mode="wait">
                      {copiedField === "email" ? (
                        <motion.span
                          key="copied-email"
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.6, opacity: 0 }}
                          className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-600"
                        >
                          <Check className="h-3 w-3" />
                        </motion.span>
                      ) : (
                        <motion.span key="copy-email" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          <Copy className="h-3.5 w-3.5 shrink-0 text-[var(--ink-muted)] transition-colors group-hover:text-[var(--ink-primary)]" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  <motion.button
                    type="button"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => copyText(PROFILE.phone, "phone", "Phone")}
                    className="group relative flex items-center justify-between overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-4 text-left transition-colors hover:border-[var(--ink-primary)]"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--bg-well)] text-[var(--ink-primary)]">
                        <Phone className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-mono text-[10px] uppercase text-[var(--ink-muted)]">
                          Phone
                        </div>
                        <div className="truncate text-xs font-semibold text-[var(--ink-primary)] sm:text-sm">
                          {PROFILE.phone}
                        </div>
                      </div>
                    </div>
                    <AnimatePresence mode="wait">
                      {copiedField === "phone" ? (
                        <motion.span
                          key="copied-phone"
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.6, opacity: 0 }}
                          className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-600"
                        >
                          <Check className="h-3 w-3" />
                        </motion.span>
                      ) : (
                        <motion.span key="copy-phone" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          <Copy className="h-3.5 w-3.5 shrink-0 text-[var(--ink-muted)] transition-colors group-hover:text-[var(--ink-primary)]" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </div>

              {/* Magnetic Social Dock */}
              <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-hairline)] pt-5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Magnetic strength={0.2}>
                    <a
                      href={PROFILE.links.github}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => paperSound.playClick()}
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-paper)] px-4 py-2 text-xs font-semibold text-[var(--ink-primary)] transition-colors hover:border-[var(--ink-primary)]"
                    >
                      <Github className="h-3.5 w-3.5" />
                      <span>GitHub</span>
                      <ArrowUpRight className="h-3 w-3 text-[var(--ink-muted)]" />
                    </a>
                  </Magnetic>

                  <Magnetic strength={0.2}>
                    <a
                      href={PROFILE.links.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => paperSound.playClick()}
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-paper)] px-4 py-2 text-xs font-semibold text-[var(--ink-primary)] transition-colors hover:border-[var(--ink-primary)]"
                    >
                      <Linkedin className="h-3.5 w-3.5" />
                      <span>LinkedIn</span>
                      <ArrowUpRight className="h-3 w-3 text-[var(--ink-muted)]" />
                    </a>
                  </Magnetic>
                </div>

                <span className="font-mono text-[10px] text-[var(--ink-muted)]">
                  FAST REPLY (UNLESS DEBUGGING)
                </span>
              </div>
            </TiltPaperCard>
          </motion.div>

          {/* Right Interactive Dispatch Slip Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-[var(--border-hairline)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-card)] sm:p-8 lg:col-span-5"
          >
            {/* Tactile "SEALED // SENT" Ink Stamp VFX */}
            <AnimatePresence>
              {dispatched && (
                <motion.div
                  initial={{ scale: 1.8, opacity: 0, rotate: -14 }}
                  animate={{ scale: 1, opacity: 1, rotate: -7 }}
                  exit={{ scale: 0.85, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 360, damping: 20 }}
                  className="pointer-events-none absolute right-6 top-6 z-20 rounded-xl border-2 border-[var(--accent)] bg-[var(--bg-card)]/90 px-3 py-1 font-mono text-[10px] font-bold tracking-[0.2em] text-[var(--accent)] shadow-xs"
                >
                  SEALED ✓
                </motion.div>
              )}
            </AnimatePresence>

            <form
              onSubmit={handleDispatch}
              encType="multipart/form-data"
              className="flex h-full flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-semibold tracking-wider text-[var(--accent)]">
                    {activeIntent.refCode}
                  </span>
                  <span className="font-mono text-[10px] text-[var(--ink-muted)]">
                    DISPATCH SLIP
                  </span>
                </div>

                {/* Gliding Intent Selector */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {INTENTS.map((intent) => {
                    const active = selectedIntent === intent.id;
                    return (
                      <button
                        key={intent.id}
                        type="button"
                        onClick={() => {
                          paperSound.playClick();
                          setSelectedIntent(intent.id);
                          setDispatched(false);
                        }}
                        className={`relative rounded-full px-2.5 py-1 font-mono text-[10px] font-medium transition-colors ${
                          active
                            ? "text-[var(--bg-paper)]"
                            : "border border-[var(--border-hairline)] bg-[var(--bg-paper)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="contact-intent-pill"
                            transition={{ type: "spring", stiffness: 360, damping: 28 }}
                            className="absolute inset-0 rounded-full bg-[var(--ink-primary)]"
                          />
                        )}
                        <span className="relative z-10">{intent.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5 space-y-3.5">
                  {/* Anti-spam honeypot */}
                  <input
                    type="text"
                    name="_honey"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-[var(--ink-secondary)]"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={senderName}
                      onChange={(e) => {
                        setSenderName(e.target.value);
                        if (dispatched) setDispatched(false);
                      }}
                      placeholder="Alex Morgan"
                      className="w-full rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] px-3.5 py-2.5 text-sm text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)] transition-colors focus:border-[var(--accent)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-[var(--ink-secondary)]"
                    >
                      Your Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={senderEmail}
                      onChange={(e) => {
                        setSenderEmail(e.target.value);
                        if (dispatched) setDispatched(false);
                      }}
                      placeholder="recruiter@company.com"
                      className="w-full rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] px-3.5 py-2.5 text-sm text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)] transition-colors focus:border-[var(--accent)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-msg"
                      className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-[var(--ink-secondary)]"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-msg"
                      rows={3}
                      required
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (dispatched) setDispatched(false);
                        if (sendError) setSendError(null);
                      }}
                      placeholder={activeIntent.placeholder}
                      className="w-full resize-none rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] px-3.5 py-2.5 text-sm text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)] transition-colors focus:border-[var(--accent)] focus:outline-none"
                    />
                  </div>

                  {/* Optional File Attachment Picker */}
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.webp,.zip"
                      onChange={handleFilePick}
                      className="hidden"
                      aria-label="Attach files"
                    />
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-[var(--border-strong)] bg-[var(--bg-paper)] px-3 py-1.5 font-mono text-[10px] font-medium text-[var(--ink-secondary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                      >
                        <Paperclip className="h-3 w-3 text-[var(--accent)]" />
                        <span>Attach Files</span>
                        <span className="text-[var(--ink-muted)]">(max 10 MB)</span>
                      </button>

                      {attachments.length > 0 && (
                        <span className="font-mono text-[10px] text-[var(--ink-muted)]">
                          {attachments.length} file{attachments.length > 1 ? "s" : ""} ready
                        </span>
                      )}
                    </div>

                    {attachments.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {attachments.map((file, idx) => (
                          <span
                            key={`${file.name}-${idx}`}
                            className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-paper)] px-2.5 py-1 font-mono text-[10px] text-[var(--ink-primary)]"
                          >
                            <FileText className="h-3 w-3 shrink-0 text-[var(--accent)]" />
                            <span className="max-w-[125px] truncate">{file.name}</span>
                            <span className="shrink-0 text-[var(--ink-muted)]">
                              ({formatBytes(file.size)})
                            </span>
                            <button
                              type="button"
                              onClick={() => removeAttachment(idx)}
                              aria-label={`Remove ${file.name}`}
                              className="rounded-full p-0.5 text-[var(--ink-muted)] transition-colors hover:text-[var(--accent)]"
                            >
                              <X className="h-2.5 w-2.5" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-2.5">
                {sendError && (
                  <div className="rounded-xl border border-[var(--accent)]/40 bg-[var(--accent-soft)] px-3 py-2 font-mono text-[10px] text-[var(--accent)]">
                    {sendError}
                  </div>
                )}

                <Magnetic className="w-full" strength={0.14}>
                  <button
                    type="submit"
                    disabled={sending}
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-[var(--ink-primary)] px-5 py-3 text-sm font-semibold text-[var(--bg-paper)] transition-all hover:bg-[var(--accent)] hover:text-white active:scale-[0.99] disabled:opacity-60"
                  >
                    {sending ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>Delivering to Inbox...</span>
                      </>
                    ) : (
                      <>
                        <span>{dispatched ? "Delivered to Inbox — Send Another" : "Send Direct to Inbox"}</span>
                        <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                </Magnetic>

                {(dispatched || sendError) && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between gap-2 rounded-xl border border-dashed border-[var(--border-strong)] bg-[var(--bg-paper)] px-3 py-2 font-mono text-[10px]"
                  >
                    <button
                      type="button"
                      onClick={copyFormattedDispatch}
                      className="inline-flex items-center gap-1.5 text-[var(--ink-primary)] hover:text-[var(--accent)]"
                    >
                      {copiedField === "dispatch" ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-600" />
                          <span>Copied Note!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy dispatch note</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        paperSound.playClick();
                        setDispatched(false);
                        setSendError(null);
                        setSenderName("");
                        setSenderEmail("");
                        setMessage("");
                        setAttachments([]);
                      }}
                      className="inline-flex items-center gap-1 text-[var(--ink-muted)] hover:text-[var(--ink-primary)]"
                    >
                      <RotateCcw className="h-3 w-3" />
                      <span>Clear</span>
                    </button>
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
        </div>

        {/* Crisp Paper Footer with Magnetic Back-to-Top */}
        <footer className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[var(--border-hairline)] pt-8 font-mono text-[11px] text-[var(--ink-muted)] sm:flex-row">
          <span>
            © {new Date().getFullYear()} {PROFILE.name} · {PROFILE.location} · Zero templates, all custom code
          </span>
          <Magnetic strength={0.2}>
            <button
              type="button"
              onClick={() => {
                paperSound.playCardFlick();
                scrollToSection("hero");
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-card)] px-3.5 py-1.5 font-mono text-[10px] font-medium text-[var(--ink-primary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3 w-3" />
            </button>
          </Magnetic>
        </footer>
      </div>
    </section>
  );
}
