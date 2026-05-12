"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle2, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import emailjs from "emailjs-com";
import toast, { Toaster } from "react-hot-toast";

const GitHub = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedIn = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const EMAILJS_SERVICE_ID = "service_hiiv81g";
const EMAILJS_TEMPLATE_ID = "template_nzspmdk";
const EMAILJS_PUBLIC_KEY = "dqzfNz7gbv9q-B4mD";

const CONTACT_LINKS = [
  {
    id: "email",
    icon: Mail,
    label: "Email",
    value: "roytonmoy901@gmail.com",
    href: "mailto:roytonmoy901@gmail.com",
    description: "For emergency partnerships or collaboration",
    color: "text-red-500",
    bg: "bg-red-50 dark:bg-red-900/20",
    border: "border-red-200 dark:border-red-800",
    hoverBorder: "hover:border-red-400",
  },
  {
    id: "github",
    icon: GitHub,
    label: "GitHub",
    value: "github.com/Tonmoy-Roy",
    href: "https://github.com/Tonmoy-Roy",
    description: "View source code & contribute",
    color: "text-gray-800 dark:text-gray-200",
    bg: "bg-gray-100 dark:bg-gray-800",
    border: "border-gray-200 dark:border-gray-700",
    hoverBorder: "hover:border-gray-400",
  },
  {
    id: "linkedin",
    icon: LinkedIn,
    label: "LinkedIn",
    value: "linkedin.com/in/tonmoy-roy-own",
    href: "https://www.linkedin.com/in/tonmoy-roy-own/",
    description: "Connect professionally",
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-800",
    hoverBorder: "hover:border-blue-400",
  },
];

function ContactCard({ contact }) {
  const Icon = contact.icon;

  return (
    <a
      href={contact.href}
      target={contact.id !== "email" ? "_blank" : undefined}
      rel="noopener noreferrer"
      className={`group flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border-2 ${contact.border} ${contact.hoverBorder} transition-all duration-200 shadow-sm hover:shadow-md`}
    >
      <div className={`w-12 h-12 rounded-xl ${contact.bg} flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-6 h-6 ${contact.color}`} />
      </div>

      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
        <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
          {contact.label}
        </span>
        <span className={`text-sm font-semibold ${contact.color} truncate`}>
          {contact.value}
        </span>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {contact.description}
        </span>
      </div>

      <ExternalLink className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-400 flex-shrink-0 transition-colors" />
    </a>
  );
}

function FeedbackForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSending(true);

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { name, email, message },
        EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setSending(false);
        setSent(true);
        toast.success("Message sent successfully!");
      })
      .catch(() => {
        setSending(false);
        toast.error("Failed to send message. Please try again.");
      });
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7 text-green-500" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-base font-semibold text-gray-900 dark:text-gray-100">
            Message Sent!
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Thanks for the feedback. I'll get back to you soon.
          </p>
        </div>
        <button
          onClick={() => { setSent(false); setName(""); setEmail(""); setMessage(""); }}
          className="text-xs text-blue-500 hover:underline underline-offset-2"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      {/* Name + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Message
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Share feedback, report an issue, or suggest a feature..."
          rows={4}
          required
          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
        />
      </div>

      <Button
        type="submit"
        disabled={sending || !name || !email || !message}
        className="flex justify-center items-center w-full gap-2 bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 text-white font-semibold disabled:opacity-50 p-2 rounded-lg"
      >
        {sending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send className="w-4 h-4" />
          </>
        )}
      </Button>
    </form>
  );
}

export default function ContactSection() {
  return (
    <section className="w-full px-4 py-20 bg-white dark:bg-gray-950">

      {/* Toast notifications */}
      <Toaster position="top-right" />

      <div className="max-w-4xl mx-auto flex flex-col gap-12">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-semibold tracking-wide uppercase">
            <Mail className="w-3 h-3" />
            Contact & Feedback
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
            Get In Touch
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed">
            Have feedback, found a bug, or want to collaborate on this project?
            Reach out through any of these channels or send a message directly.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Left — contact links */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Find me on
            </p>
            <div className="flex flex-col gap-3">
              {CONTACT_LINKS.map((contact) => (
                <ContactCard key={contact.id} contact={contact} />
              ))}
            </div>

          </div>

          {/* Right — feedback form */}
          <div className="flex flex-col gap-4 ">
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Send a message
            </p>
            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 md:h-[46vh]">
              <FeedbackForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}