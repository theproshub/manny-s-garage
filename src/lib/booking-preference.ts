const STORAGE_KEY = "mannysgarage_preferred_service";

export const BOOKING_SERVICE_IDS = ["automotive", "handyman", "diy", "it"] as const;
export type BookingServiceId = (typeof BOOKING_SERVICE_IDS)[number];

export function isBookingServiceId(value: string): value is BookingServiceId {
  return (BOOKING_SERVICE_IDS as readonly string[]).includes(value);
}

export function getPreferredService(): BookingServiceId | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw && isBookingServiceId(raw) ? raw : null;
}

export function setPreferredService(id: BookingServiceId): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, id);
}
