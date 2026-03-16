import { NextResponse } from "next/server";
import { bookingSchema, formatBookingText } from "@/lib/booking";
import { getDemoBookings, saveDemoBooking } from "@/lib/demo-bookings";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { sendOwnerSms } from "@/lib/twilio";

export const runtime = "nodejs";

export async function GET() {
  const supabase = getSupabaseAdminClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("repair_bookings")
      .select("id, name, phone, vehicle, issue, preferred_date, created_at")
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ bookings: data ?? [] });
  }
  const bookings = await getDemoBookings();
  return NextResponse.json({
    bookings: bookings.reverse().slice(0, 100),
    demo: true,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: parsed.error.issues[0]?.message ?? "Booking data is invalid.",
        },
        { status: 400 },
      );
    }

    const booking = parsed.data;
    const supabase = getSupabaseAdminClient();
    const vehicle = booking.vehicle ?? "";
    const issue = booking.issue ?? (booking.serviceType ? `${booking.serviceType} booking` : "General");

    let savedToSupabase = false;
    let savedToDemo = false;
    let smsSent = false;
    const warnings: string[] = [];

    if (supabase) {
      const { error } = await supabase.from("repair_bookings").insert({
        name: booking.name,
        phone: booking.phone,
        vehicle,
        issue,
        preferred_date: booking.preferredDate,
      });

      if (error) {
        warnings.push("Supabase insert failed.");
        console.error("Supabase insert failed:", error);
      } else {
        savedToSupabase = true;
      }
    } else {
      warnings.push("Supabase is not configured.");
      savedToDemo = await saveDemoBooking(booking);
    }

    try {
      const smsResult = await sendOwnerSms(formatBookingText(booking));

      if (smsResult.sent) {
        smsSent = true;
      } else {
        warnings.push(smsResult.reason);
      }
    } catch (error) {
      warnings.push("Twilio SMS failed.");
      console.error("Twilio SMS failed:", error);
    }

    const message = smsSent
      ? "Your booking request is in. Manny's Garage has been notified by text and will follow up soon."
      : savedToSupabase
        ? "Your booking request was saved. Configure Twilio to notify the owner by text automatically."
        : savedToDemo
          ? "Your booking request was saved locally. Add Supabase and Twilio env vars to enable database storage and SMS alerts."
          : "Your booking request was received. Add Supabase and Twilio env vars to enable full delivery.";

    return NextResponse.json({
      ok: true,
      message,
      channels: {
        savedToSupabase,
        savedToDemo,
        smsSent,
      },
      warnings,
    });
  } catch (error) {
    console.error("Booking route failed:", error);

    return NextResponse.json(
      {
        message: "We couldn't process the booking request. Please try again.",
      },
      { status: 500 },
    );
  }
}
