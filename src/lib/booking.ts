import { z } from "zod";

export const serviceTypes = ["automotive", "handyman", "diy", "it"] as const;
export type ServiceType = (typeof serviceTypes)[number];

export const bookingSchema = z.object({
  name: z.string().min(2, "Please share your name."),
  phone: z
    .string()
    .min(10, "Please share a phone number.")
    .regex(/^[0-9+()\-\s]+$/, "Phone number format looks invalid."),
  vehicle: z.string().optional(),
  issue: z.string().optional(),
  preferredDate: z
    .string()
    .min(1, "Please choose a preferred date.")
    .refine((value) => !Number.isNaN(Date.parse(value)), {
      message: "Preferred date is invalid.",
    }),
  serviceType: z.enum(serviceTypes).optional(),
  estimatedTotal: z.string().optional(),
  notes: z.string().optional(),
});

export type BookingPayload = z.infer<typeof bookingSchema>;

export const chatSteps: Array<{
  key: keyof BookingPayload;
  label: string;
  prompt: string;
  placeholder: string;
}> = [
  {
    key: "name",
    label: "Name",
    prompt: "What name should we use for your booking?",
    placeholder: "Manny Garcia",
  },
  {
    key: "phone",
    label: "Phone",
    prompt: "Best phone number to text or call you back?",
    placeholder: "(701) 555-0142",
  },
  {
    key: "vehicle",
    label: "Vehicle",
    prompt: "What are you driving? Include the make and model.",
    placeholder: "2018 Ford F-150",
  },
  {
    key: "issue",
    label: "Issue",
    prompt: "Tell me what is going on with the vehicle.",
    placeholder: "Brake pedal feels soft and squeaks while stopping.",
  },
  {
    key: "preferredDate",
    label: "Preferred Date",
    prompt: "What day would you like me to take a look?",
    placeholder: "2026-03-20",
  },
];

export function formatBookingText(payload: BookingPayload) {
  const lines = [
    "New Manny's Garage booking request",
    payload.serviceType ? `Service: ${payload.serviceType}` : null,
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    payload.vehicle ? `Vehicle: ${payload.vehicle}` : null,
    payload.issue ? `Issue: ${payload.issue}` : null,
    `Preferred date: ${payload.preferredDate}`,
    payload.estimatedTotal ? `Est. total: $${payload.estimatedTotal}` : null,
    payload.notes ? `Notes: ${payload.notes}` : null,
  ].filter(Boolean) as string[];
  return lines.join("\n");
}
