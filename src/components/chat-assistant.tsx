"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Bot, LoaderCircle, MessageSquare, RotateCcw, Send, X } from "lucide-react";
import { bookingSchema, chatSteps, type BookingPayload } from "@/lib/booking";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

const initialMessages: ChatMessage[] = [
  {
    id: "intro-1",
    role: "assistant",
    content:
      "Hi! I’m Manny, owner of Manny’s Garage. I’ll walk you through a few quick details so we can get you scheduled.",
  },
  {
    id: "intro-2",
    role: "assistant",
    content: chatSteps[0].prompt,
  },
];

function validateStep(stepKey: keyof BookingPayload, value: string) {
  const trimmed = value.trim();

  if (stepKey === "name" && trimmed.length < 2) {
    return "Please enter your full name.";
  }

  if (stepKey === "phone" && !/^[0-9+()\-\s]{10,}$/.test(trimmed)) {
    return "Please enter a valid phone number.";
  }

  if (stepKey === "vehicle" && trimmed.length < 3) {
    return "Please include the make and model.";
  }

  if (stepKey === "issue" && trimmed.length < 10) {
    return "Please add a bit more detail about the issue.";
  }

  if (stepKey === "preferredDate" && Number.isNaN(Date.parse(trimmed))) {
    return "Please use a valid date like 2026-03-20.";
  }

  return null;
}

type ChatAssistantProps = {
  open: boolean;
  onOpenChange: (next: boolean) => void;
};

export function ChatAssistant({ open, onOpenChange }: ChatAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [stepIndex, setStepIndex] = useState(0);
  const [booking, setBooking] = useState<Partial<BookingPayload>>({});
  const [submitting, setSubmitting] = useState(false);
  const scrollRegionRef = useRef<HTMLDivElement | null>(null);
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  const currentStep = useMemo(() => chatSteps[stepIndex], [stepIndex]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const region = scrollRegionRef.current;
    const end = endOfMessagesRef.current;

    if (!region || !end) {
      return;
    }

    // Prefer smooth scroll unless user prefers reduced motion.
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    requestAnimationFrame(() => {
      end.scrollIntoView({
        block: "end",
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    });
  }, [open, messages.length, submitting]);

  function resetChat() {
    setMessages(initialMessages);
    setDraft("");
    setStepIndex(0);
    setBooking({});
    setSubmitting(false);
  }

  async function handleSend() {
    if (!currentStep || submitting) {
      return;
    }

    const value = draft.trim();

    if (!value) {
      return;
    }

    const validationMessage = validateStep(currentStep.key, value);

    setMessages((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        role: "user",
        content: value,
      },
    ]);
    setDraft("");

    if (validationMessage) {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: validationMessage,
        },
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: currentStep.prompt,
        },
      ]);
      return;
    }

    const nextBooking = {
      ...booking,
      [currentStep.key]: value,
    } as BookingPayload;

    if (stepIndex < chatSteps.length - 1) {
      const nextStep = chatSteps[stepIndex + 1];

      setBooking(nextBooking);
      setStepIndex((current) => current + 1);
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: nextStep.prompt,
        },
      ]);
      return;
    }

    const parsed = bookingSchema.safeParse(nextBooking);

    if (!parsed.success) {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: parsed.error.issues[0]?.message ?? "Something looked off. Please try again.",
        },
      ]);
      return;
    }

    setBooking(nextBooking);
    setSubmitting(true);

    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed.data),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "Booking request failed.");
      }

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            data.message ??
            "You're all set. I got your request and will follow up with you soon.",
        },
      ]);
      setStepIndex(chatSteps.length);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "Something went wrong while sending your request.",
        },
      ]);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-30 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 ease-out sm:bg-black/50",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden
        onClick={() => onOpenChange(false)}
      />

      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        aria-label={open ? "Close chat" : "Chat with Manny"}
        className="accent-ring focus-ring min-touch fixed z-50 flex items-center gap-2 rounded-full border border-orange-400/40 bg-zinc-950/95 px-3 py-3 text-sm font-semibold text-white backdrop-blur-md hover:-translate-y-0.5 hover:border-orange-300/50 hover:bg-zinc-900/95 active:translate-y-0 sm:right-6 sm:bottom-6 sm:gap-3 sm:px-4 sm:py-3 [bottom:max(0.75rem,env(safe-area-inset-bottom))] [right:max(0.75rem,env(safe-area-inset-right))]"
      >
        {open ? (
          <X className="h-5 w-5 shrink-0 sm:h-4 sm:w-4" />
        ) : (
          <div className="rounded-full bg-orange-500/15 p-1 text-orange-400 shrink-0">
            <MessageSquare className="h-5 w-5 sm:h-4 sm:w-4" />
          </div>
        )}
        <span className="hidden min-[420px]:inline">{open ? "Close chat" : "Chat with Manny"}</span>
      </button>

      <div
        className={cn(
          "panel-strong fixed z-40 flex w-[calc(100vw-1.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl shadow-2xl shadow-black/50 transition-all duration-300 ease-out sm:left-auto sm:right-6 sm:top-auto sm:max-h-[min(28rem,80dvh)] sm:w-full sm:max-w-sm md:max-h-[32rem] md:max-w-md [left:max(0.75rem,env(safe-area-inset-left))] [right:max(0.75rem,env(safe-area-inset-right))] [bottom:max(5.25rem,calc(env(safe-area-inset-bottom)+5rem))] sm:[bottom:max(6rem,calc(env(safe-area-inset-bottom)+5.5rem))] [top:max(0.75rem,env(safe-area-inset-top))]",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Chat with Manny"
      >
        <div className="shrink-0 border-b border-white/10 bg-gradient-to-r from-orange-500/15 via-transparent to-transparent px-3 py-3 sm:px-5 sm:py-4">
          <div className="flex items-center justify-between gap-2 sm:gap-3">
            <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-500/25 ring-1 ring-orange-400/20 sm:h-11 sm:w-11 sm:rounded-2xl">
                <Bot className="h-5 w-5 text-orange-300 sm:h-5 sm:w-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold tracking-tight text-white">Manny</p>
                <p className="hidden truncate text-xs text-zinc-400 sm:block">Shop owner — book auto, handyman, I.T, or DIY</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label="Close chat"
              className="focus-ring min-touch flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 transition-colors hover:border-white/15 hover:bg-white/10 hover:text-white sm:hidden"
            >
              <X className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={resetChat}
              aria-label="Start over"
              className="focus-ring min-touch flex shrink-0 items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-2 text-xs font-medium text-zinc-400 transition-colors hover:border-white/15 hover:bg-white/10 hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        <div className="shrink-0 border-b border-white/[0.06] px-3 py-2.5 sm:px-5 sm:py-3">
          <div className="flex min-w-0 items-center justify-between gap-2">
            <span className="min-w-0 truncate text-xs font-medium text-zinc-400" title={stepIndex < chatSteps.length ? `Step ${stepIndex + 1} of ${chatSteps.length} — ${chatSteps[stepIndex]?.label}` : "Complete"}>
              {stepIndex < chatSteps.length
                ? `Step ${stepIndex + 1} of ${chatSteps.length} · ${chatSteps[stepIndex]?.label}`
                : "Complete"}
            </span>
          </div>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-500 ease-out"
              style={{
                width: `${((stepIndex + 1) / chatSteps.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <div
          ref={scrollRegionRef}
          className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-3 py-3 sm:px-4 sm:py-4"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "max-w-[90%] rounded-2xl px-3 py-2.5 text-sm leading-relaxed sm:max-w-[88%] sm:px-4 sm:py-3",
                message.role === "assistant"
                  ? "mr-auto border border-white/5 bg-white/[0.03] text-zinc-100"
                  : "ml-auto bg-orange-500 text-zinc-950 shadow-lg shadow-orange-950/20",
              )}
            >
              {message.content}
            </div>
          ))}
          {submitting ? (
            <div className="mr-auto flex max-w-[90%] items-center gap-2 rounded-2xl border border-white/5 bg-white/[0.03] px-3 py-2.5 text-sm text-zinc-300 sm:max-w-[88%] sm:px-4 sm:py-3">
              <LoaderCircle className="h-4 w-4 shrink-0 animate-spin text-orange-400" />
              <span className="truncate">Sending your booking...</span>
            </div>
          ) : null}
          <div ref={endOfMessagesRef} />
        </div>

        <div className="shrink-0 px-3 py-2.5 pb-[env(safe-area-inset-bottom)] sm:px-4 sm:py-4">
          <div className="flex min-w-0 items-end gap-2">
            <textarea
              rows={2}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void handleSend();
                }
              }}
              placeholder={
                stepIndex < chatSteps.length
                  ? chatSteps[stepIndex]?.placeholder
                  : "Reset to start another booking"
              }
              disabled={stepIndex >= chatSteps.length || submitting}
              className="focus-ring min-h-[44px] min-w-0 flex-1 resize-none rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5 text-base text-white placeholder:text-zinc-500 focus:border-orange-400/40 focus:bg-white/[0.07] focus:ring-2 focus:ring-orange-400/20 sm:min-h-[52px] sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm"
            />
            <button
              type="button"
              onClick={() => void handleSend()}
              disabled={stepIndex >= chatSteps.length || submitting}
              aria-label="Send"
              className="focus-ring min-touch flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-zinc-950 shadow-md shadow-orange-950/25 hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-500 disabled:shadow-none sm:h-12 sm:w-12 sm:rounded-2xl"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
