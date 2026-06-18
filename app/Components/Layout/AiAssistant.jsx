"use client";

import { useState, useRef, useEffect } from "react";
import {
  X,
  Send,
  Bot,
  Waves,
  Loader2,
  ChevronDown,
  Sparkles,
} from "lucide-react";

const SUGGESTED_QUESTIONS = [
  "How do I prepare for a flood?",
  "What to do during a flash flood?",
  "How can I keep livestock safe?",
  "What should be in an emergency kit?",
  "How to prevent waterborne diseases?",
  "How to keep children safe during floods?",
];

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

function Message({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mt-0.5">
          <Waves className="w-3.5 h-3.5 text-white" />
        </div>
      )}

      {/* Bubble */}
      <div
        className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "bg-blue-600 text-white rounded-tr-sm"
            : "bg-gray-800 text-gray-200 rounded-tl-sm border border-gray-700"
        }`}
      >
        {msg.content}
      </div>
    </div>
  );
}

export default function FloodAIAssistant() {
  const [open, setOpen]         = useState(false);
  const [input, setInput]       = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [unread, setUnread]     = useState(0);
  const [rateLimitUntil, setRateLimitUntil] = useState(0);
  const bottomRef               = useRef(null);
  const inputRef                = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setUnread(0);
    }
  }, [open]);

  async function sendMessage(text) {
    const userText = (text || input).trim();
    const now = Date.now();
    if (!userText || loading) return;
    if (now < rateLimitUntil) {
      const waitSeconds = Math.ceil((rateLimitUntil - now) / 1000);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Error: Rate limit exceeded. Please wait ${waitSeconds} second${waitSeconds === 1 ? "" : "s"} and try again.`,
        },
      ]);
      return;
    }

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages, userText }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        if (res.status === 429) {
          const retryAfterSeconds = data.retryAfter || 60;
          setRateLimitUntil(Date.now() + retryAfterSeconds * 1000);
          throw new Error(data.error || `Rate limit exceeded. Try again in ${retryAfterSeconds} seconds.`);
        }
        throw new Error(data.error || "Server error");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      if (!open) setUnread((n) => n + 1);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Error: ${err.message || "Something went wrong. Please try again."}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  const isEmpty = messages.length === 0;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 ">

      {/* ── CHAT WINDOW ── */}
      {open && (
        <div className="w-[367px] md:w-[370px] max-h-[560px] flex flex-col rounded-2xl border border-gray-700 bg-gray-950 shadow-2xl shadow-black/60 overflow-hidden animate-in slide-in-from-bottom-4 duration-200 -mr-5 md:mr-0">

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center">
                <Waves className="w-4 h-4 text-white" />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-gray-900" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white leading-none">FloodSafe AI</p>
                <p className="text-[10px] text-green-400 mt-0.5">Online · Flood Safety Expert</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          {rateLimitUntil > Date.now() && (
            <div className="px-4 py-2 bg-yellow-500/15 border-t border-yellow-300 text-xs text-yellow-200">
              Rate limit reached. Please wait {Math.ceil((rateLimitUntil - Date.now()) / 1000)} second(s) before trying again.
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 min-h-0 max-h-[360px]">
            {isEmpty ? (
              /* Welcome + suggestions */
              <div className="flex flex-col gap-4">
                <div className="flex flex-col items-center text-center gap-2 pt-2 pb-1">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-600/30 flex items-center justify-center">
                    <Waves className="w-6 h-6 text-blue-400" />
                  </div>
                  <p className="text-sm font-semibold text-white">Hi, I'm FloodSafe AI 👋</p>
                  <p className="text-xs text-gray-400 max-w-[260px] leading-relaxed">
                    Ask me anything about flood preparedness, emergency response, shelter, or disaster recovery.
                  </p>
                </div>

                {/* Suggested questions */}
                <div className="flex flex-col gap-1.5">
                  <p className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-500 uppercase tracking-widest px-1">
                    <Sparkles className="w-3 h-3" /> Try asking
                  </p>
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-left text-xs text-gray-300 bg-gray-800/60 hover:bg-gray-800 border border-gray-700 hover:border-blue-600/50 rounded-xl px-3 py-2 transition-colors leading-snug"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg, i) => <Message key={i} msg={msg} />)
            )}

            {/* Typing indicator */}
            {loading && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                  <Waves className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="bg-gray-800 border border-gray-700 rounded-2xl rounded-tl-sm">
                  <TypingDots />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-gray-800 bg-gray-900">
            <div className="flex items-end gap-2 bg-gray-800 rounded-xl border border-gray-700 focus-within:border-blue-600 transition-colors px-3 py-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                rows={1}
                placeholder="Ask about flood safety…"
                className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 resize-none outline-none max-h-24 leading-relaxed"
                style={{ fieldSizing: "content" }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="w-7 h-7 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors shrink-0 mb-0.5"
              >
                {loading
                  ? <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
                  : <Send className="w-3.5 h-3.5 text-white" />
                }
              </button>
            </div>
            <p className="text-center text-[10px] text-gray-600 mt-2">
              Only answers flood & disaster-related questions
            </p>
          </div>
        </div>
      )}

      {/* ── FAB BUTTON ── */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="relative flex items-center gap-2.5 pl-3.5 pr-4 h-12 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95"
      >
        {open ? (
          <>
            <X className="w-4.5 h-4.5 w-[18px] h-[18px]" />
            <span className="text-sm font-semibold">Close</span>
          </>
        ) : (
          <>
            <Waves className="w-[18px] h-[18px]" />
            <span className="text-sm font-semibold">Ask Me</span>
            {/* Pulse ring */}
            <span className="absolute -top-1 -right-1 w-3 h-3">
              <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
              <span className="absolute inset-0.5 rounded-full bg-green-400" />
            </span>
            {/* Unread badge */}
            {unread > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-[10px] font-bold flex items-center justify-center border-2 border-gray-950">
                {unread}
              </span>
            )}
          </>
        )}
      </button>
    </div>
  );
}