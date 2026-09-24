"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Send,
  Sparkles,
  Phone,
  Mail,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  Globe
} from "lucide-react";

function ModernAiIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="kyberAiSpark" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38bdf8" />
          <stop offset="0.5" stopColor="#0ea5e9" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      {/* Primary 4-pointed generative intelligence star */}
      <path
        d="M12 2.5C12 7.75 7.75 12 2.5 12C7.75 12 12 16.25 12 21.5C12 16.25 16.25 12 21.5 12C16.25 12 12 7.75 12 2.5Z"
        fill="url(#kyberAiSpark)"
      />
      {/* Secondary companion sparkle */}
      <path
        d="M19 1.5C19 3.4 17.6 4.8 15.7 4.8C17.6 4.8 19 6.2 19 8.1C19 6.2 20.4 4.8 22.3 4.8C20.4 4.8 19 3.4 19 1.5Z"
        fill="#bae6fd"
      />
      {/* Tertiary micro accent sparkle */}
      <circle cx="5.5" cy="18.5" r="1.25" fill="#38bdf8" opacity="0.9" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  links?: { label: string; href: string }[];
  actions?: { label: string; query: string }[];
  timestamp: string;
}

const DEFAULT_SUGGESTIONS_TH = [
  "KYBER HCI คืออะไร?",
  "MARSLOQ มีฟีเจอร์อะไรบ้าง?",
  "ย้ายระบบจาก VMware ได้ไหม?",
  "ขอใบเสนอราคา / ติดต่อเรา",
  "สเปกเซิร์ฟเวอร์ที่รองรับ"
];

const DEFAULT_SUGGESTIONS_EN = [
  "What is KYBER HCI?",
  "What are MARSLOQ features?",
  "Can I migrate from VMware?",
  "Pricing & Quotation",
  "Supported Hardware Specs"
];

export default function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lang, setLang] = useState<"th" | "en">("th");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const initialGreeting: Message = {
    id: "welcome",
    role: "assistant",
    content:
      lang === "th"
        ? `สวัสดีครับ! 👋 ผมคือ **KYBER AI Support** ยินดีต้อนรับสู่ KYBER & MARSLOQ ครับ

สามารถสอบถามข้อมูลโครงสร้างพื้นฐาน **KYBER HCI**, ระบบจัดเก็บและวิเคราะห์ Log **MARSLOQ**, การย้ายระบบจาก VMware หรือขอคำแนะนำด้านราคาและการติดต่อทีมงานได้ทันทีครับ!`
        : `Hello! 👋 I am the **KYBER AI Support** assistant. Welcome to KYBER & MARSLOQ!

Feel free to ask me anything about **KYBER HCI**, **MARSLOQ Log & Observability**, VMware migration, hardware specifications, or getting in touch with our engineering and sales team!`,
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  };

  const [messages, setMessages] = useState<Message[]>([initialGreeting]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: time
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content
          })),
          language: lang
        })
      });

      if (!res.ok) throw new Error("Chat request failed");
      const data = await res.json();

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: data.reply || (lang === "th" ? "ขออภัยครับ ไม่สามารถโหลดคำตอบได้" : "Sorry, could not load response."),
        links: data.links,
        actions: data.actions,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content:
          lang === "th"
            ? "ขออภัยครับ ระบบขัดข้องชั่วคราว ท่านสามารถติดต่อสายด่วนได้ที่ [099-105-3888](tel:+66991053888) หรือ [supawat@kyber-it.com](mailto:supawat@kyber-it.com)"
            : "Sorry, a temporary connection error occurred. Please contact our support hotline at [+66 99-105-3888](tel:+66991053888) or [supawat@kyber-it.com](mailto:supawat@kyber-it.com).",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: "assistant",
        content:
          lang === "th"
            ? "เริ่มต้นการสนทนาใหม่แล้วครับ มีข้อมูลส่วนไหนที่ต้องการให้ผมช่วยเหลือเพิ่มเติมไหมครับ?"
            : "Conversation reset! What information can I help you find today?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }
    ]);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const currentSuggestions = lang === "th" ? DEFAULT_SUGGESTIONS_TH : DEFAULT_SUGGESTIONS_EN;

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {/* Compact Trigger Button */}
      {!isOpen && (
        <div className="relative group">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center w-11 h-11 rounded-full bg-[#0c1424]/90 hover:bg-[#111e38] text-slate-300 hover:text-white border border-cyan-500/30 hover:border-cyan-400/80 shadow-[0_4px_18px_rgba(6,182,212,0.25)] hover:shadow-[0_6px_24px_rgba(6,182,212,0.45)] transition-all duration-200 backdrop-blur-md"
            aria-label="Open KYBER AI Support Chat"
          >
            <ModernAiIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span
              className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-[#0c1424]"
              aria-hidden="true"
            />
          </button>

          {/* Discreet Hover Tooltip */}
          <div className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-2.5 hidden sm:group-hover:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0c1424]/95 border border-white/10 text-[11px] font-medium text-slate-200 whitespace-nowrap shadow-lg backdrop-blur-sm animate-in fade-in duration-150">
            <span>AI Support</span>
            <span className="text-[10px] text-white/50">· TH/EN</span>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="relative flex flex-col w-[calc(100vw-2.5rem)] sm:w-[410px] h-[560px] max-h-[85vh] bg-[#0b101b] border border-[var(--brand)]/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-hidden backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 bg-gradient-to-r from-[#101b2f] to-[#0c1424] border-b border-white/10 text-white">
            <div className="flex items-center gap-3">
              <div className="relative p-2 rounded-xl bg-gradient-to-br from-[#101b2f] to-[#1e293b] border border-cyan-500/30 text-white shadow-md">
                <ModernAiIcon className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#0b101b] rounded-full"></span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm text-white">KYBER AI</h3>
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-[var(--brand)]/20 text-[var(--brand-light)] border border-[var(--brand)]/40">
                    Enterprise
                  </span>
                </div>
                <p className="text-[11px] text-white/60">
                  {lang === "th" ? "ผู้ช่วยสนับสนุนภาษาไทย & English" : "Support Assistant (Thai & English)"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Language Switch */}
              <button
                type="button"
                onClick={() => setLang(lang === "th" ? "en" : "th")}
                className="px-2 py-1 text-xs font-medium rounded-lg bg-white/5 hover:bg-white/10 text-white/80 transition-colors flex items-center gap-1 border border-white/10"
                title={lang === "th" ? "Switch to English" : "เปลี่ยนเป็นภาษาไทย"}
              >
                <Globe className="w-3.5 h-3.5 text-[var(--brand-light)]" />
                <span>{lang === "th" ? "TH" : "EN"}</span>
              </button>

              {/* Reset Chat */}
              <button
                type="button"
                onClick={handleReset}
                className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                title="Reset conversation"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              {/* Close / Minimize */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close chat"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm scroll-smooth">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#101b2f] to-[#1e293b] border border-cyan-500/30 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <ModernAiIcon className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`relative max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-sm ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-[var(--brand)] to-[var(--brand-hover)] text-white rounded-br-xs"
                      : "bg-[#141d30] border border-white/10 text-slate-100 rounded-bl-xs"
                  }`}
                >
                  <div className="whitespace-pre-wrap leading-relaxed text-[13px] break-words">
                    {msg.content}
                  </div>

                  {/* Related Links */}
                  {msg.links && msg.links.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
                      {msg.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-[var(--brand)]/15 text-[var(--brand-light)] border border-[var(--brand)]/30 hover:bg-[var(--brand)]/25 transition-colors"
                        >
                          <span>{link.label}</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Quick Action Suggestion Chips */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {msg.actions.map((act) => (
                        <button
                          key={act.label}
                          type="button"
                          onClick={() => handleSend(act.query)}
                          className="text-left px-2 py-1 rounded text-[11px] bg-white/5 hover:bg-white/15 text-white/80 transition-colors border border-white/10"
                        >
                          💬 {act.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Message Meta & Copy */}
                  <div className="mt-1 flex items-center justify-end gap-2 text-[10px] text-white/40">
                    <span>{msg.timestamp}</span>
                    {msg.role === "assistant" && (
                      <button
                        type="button"
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="hover:text-white transition-colors"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? (
                          <CheckIcon className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <CopyIcon className="w-3 h-3" />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-lg bg-white/10 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <UserIcon className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Loading / Thinking Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 justify-start items-center">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#101b2f] to-[#1e293b] border border-cyan-500/30 text-white flex items-center justify-center shrink-0">
                  <ModernAiIcon className="w-4 h-4" />
                </div>
                <div className="bg-[#141d30] border border-white/10 text-white/70 rounded-2xl rounded-bl-xs px-4 py-2.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[var(--brand-light)] animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-2 h-2 rounded-full bg-[var(--brand-light)] animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-2 h-2 rounded-full bg-[var(--brand-light)] animate-bounce"></span>
                  <span className="text-xs text-white/50 ml-2">
                    {lang === "th" ? "กำลังประมวลผล..." : "Thinking..."}
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Preset Questions Suggestions */}
          <div className="px-3 py-2 bg-[#0d1422] border-t border-white/5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40 mb-1.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[var(--brand-light)]" />
              <span>{lang === "th" ? "คำถามที่พบบ่อย" : "Suggested questions"}</span>
            </p>
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
              {currentSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleSend(suggestion)}
                  className="shrink-0 px-2.5 py-1 rounded-full bg-white/5 hover:bg-[var(--brand)]/20 hover:border-[var(--brand)]/40 text-white/80 hover:text-white border border-white/10 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Contact Bar */}
          <div className="px-3 py-1.5 bg-[#090d17] border-t border-white/5 flex items-center justify-between text-[11px] text-white/60">
            <span className="text-[10px] text-white/40">{lang === "th" ? "ติดต่อด่วน:" : "Direct line:"}</span>
            <div className="flex items-center gap-3">
              <a
                href="tel:+66991053888"
                className="hover:text-[var(--brand-light)] transition-colors flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                <span>099-105-3888</span>
              </a>
              <span className="text-white/20">·</span>
              <a
                href="mailto:supawat@kyber-it.com"
                className="hover:text-[var(--brand-light)] transition-colors flex items-center gap-1"
              >
                <Mail className="w-3 h-3" />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2.5 bg-[#0b101b] border-t border-white/10 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={lang === "th" ? "พิมพ์คำถามของคุณ... (กด Enter เพื่อส่ง)" : "Ask anything... (Press Enter to send)"}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[var(--brand-light)] transition-colors"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2 rounded-xl bg-[var(--brand)] hover:bg-[var(--brand-hover)] disabled:opacity-40 disabled:hover:bg-[var(--brand)] text-white transition-all shadow-md shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
