import twilio from "twilio";

export async function sendOwnerSms(message: string) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  const to = process.env.OWNER_PHONE_NUMBER;

  if (!accountSid || !authToken || !from || !to) {
    return { sent: false, reason: "Twilio env vars are missing." as const };
  }

  const client = twilio(accountSid, authToken);

  await client.messages.create({
    body: message,
    from,
    to,
  });

  return { sent: true as const };
}
