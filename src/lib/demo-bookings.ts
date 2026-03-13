import { writeFile, readFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "node:crypto";
import type { BookingPayload } from "./booking";

const DATA_DIR = path.join(process.cwd(), "data");
const BOOKINGS_FILE = path.join(DATA_DIR, "bookings.json");

export type StoredBooking = BookingPayload & { id: string; createdAt: string };

export async function saveDemoBooking(booking: BookingPayload): Promise<boolean> {
  try {
    await mkdir(DATA_DIR, { recursive: true });
    let bookings: StoredBooking[] = [];
    try {
      const raw = await readFile(BOOKINGS_FILE, "utf-8");
      bookings = JSON.parse(raw) as StoredBooking[];
    } catch {
      // File missing or invalid — start fresh
    }
    const stored: StoredBooking = {
      ...booking,
      id: randomUUID(),
      createdAt: new Date().toISOString(),
    };
    bookings.push(stored);
    await writeFile(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Demo booking save failed:", error);
    return false;
  }
}

export async function getDemoBookings(): Promise<StoredBooking[]> {
  try {
    const raw = await readFile(BOOKINGS_FILE, "utf-8");
    return JSON.parse(raw) as StoredBooking[];
  } catch {
    return [];
  }
}
