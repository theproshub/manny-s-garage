"use client";

import { useMemo, useState } from "react";
import { Bot, LoaderCircle, MessageSquare, Send, X } from "lucide-react";
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
      "Hi, I'm Manny's booking assistant. I can get your repair request lined up in just a couple of minutes.",
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

  const currentStep = useMemo(() => chatSteps[stepIndex], [stepIndex]);

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
            "You're all set. Manny's Garage received your booking request and will follow up soon.",
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
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        aria-label={open ? "Close assistant" : "Book with AI assistant"}
        className="accent-ring focus-ring min-touch fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-full border border-orange-400/40 bg-zinc-950/95 px-4 py-3 text-sm font-semibold text-white backdrop-blur-md hover:-translate-y-0.5 hover:border-orange-300/50 hover:bg-zinc-900/95 active:translate-y-0 [bottom:max(1rem,env(safe-area-inset-bottom))] [right:max(1rem,env(safe-area-inset-right))] sm:right-6 sm:bottom-6 sm:gap-3"
      >
        {open ? (
          <X className="h-5 w-5 sm:h-4 sm:w-4" />
        ) : (
          <div className="rounded-full bg-orange-500/15 p-1 text-orange-400">
            <MessageSquare className="h-5 w-5 sm:h-4 sm:w-4" />
          </div>
        )}
        <span className="hidden sm:inline">{open ? "Close assistant" : "Book with AI assistant"}</span>
      </button>

      <div
        className={cn(
          "panel-strong fixed left-4 right-4 z-40 max-h-[min(24rem,70dvh)] max-w-sm overflow-hidden rounded-2xl shadow-2xl shadow-black/50 transition-all duration-300 ease-out [bottom:max(5rem,calc(env(safe-area-inset-bottom)+4.5rem))] sm:left-auto sm:right-6 sm:bottom-24 sm:max-h-[24rem]",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        <div className="border-b border-white/10 bg-linear-to-r from-orange-500/20 via-transparent to-transparent px-4 py-3 sm:px-5 sm:py-4">
          <div className="flex items-center justify-between gap-2 sm:gap-3">
            <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
              <div className="shrink-0 rounded-xl bg-orange-500/20 p-2 text-orange-300 sm:rounded-2xl">
                <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">Manny&apos;s Garage Assistant</p>
                <p className="hidden text-xs text-zinc-400 sm:block">Fargo repair booking concierge</p>
              </div>
            </div>
            <button
              type="button"
              onClick={resetChat}
              className="focus-ring min-touch shrink-0 rounded-lg px-3 py-2 text-xs text-zinc-400 hover:text-white"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="border-b border-white/6 px-5 py-3">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>
              {stepIndex < chatSteps.length ? `Step ${stepIndex + 1} of ${chatSteps.length}` : "Complete"}
            </span>
            <span>{stepIndex < chatSteps.length ? chatSteps[stepIndex]?.label : "Booking sent"}</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-orange-500 transition-all duration-500 ease-out"
              style={{
                width: `${((Math.min(stepIndex, chatSteps.length) + 1) / (chatSteps.length + 1)) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="max-h-[min(14rem,50dvh)] space-y-3 overflow-y-auto overscroll-contain px-4 py-4 sm:max-h-[24rem]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6",
                message.role === "assistant"
                  ? "panel mr-auto text-zinc-100"
                  : "ml-auto bg-orange-500 text-zinc-950 shadow-md shadow-orange-950/25",
              )}
            >
              {message.content}
            </div>
          ))}
          {submitting ? (
            <div className="panel mr-auto flex max-w-[88%] items-center gap-2 rounded-2xl px-4 py-3 text-sm text-zinc-100">
              <LoaderCircle className="h-4 w-4 animate-spin text-orange-300" />
              Sending your booking request...
            </div>
          ) : null}
        </div>

        <div className="px-4 py-3 pb-safe sm:py-4">
          <p className="mb-2 px-1 text-xs text-zinc-500">
            {stepIndex < chatSteps.length
              ? `Current step: ${chatSteps[stepIndex]?.label}`
              : "Booking request sent"}
          </p>
          <div className="flex items-end gap-2">
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
                  : "Tap reset to start another booking."
              }
              disabled={stepIndex >= chatSteps.length || submitting}
              className="focus-ring min-h-[48px] flex-1 resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-base text-white transition-colors placeholder:text-zinc-500 focus:border-orange-400/50 focus:bg-white/[0.06] sm:min-h-[56px] sm:rounded-2xl sm:text-sm"
            />
            <button
              type="button"
              onClick={() => void handleSend()}
              disabled={stepIndex >= chatSteps.length || submitting}
              className="focus-ring min-touch flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-zinc-950 hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500 sm:rounded-2xl"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
