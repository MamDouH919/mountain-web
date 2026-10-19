"use server";

import { serviceIds } from "@/content/services";
import { site } from "@/content/site";

export type ContactField = "name" | "email" | "service" | "message";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; fieldErrors?: Partial<Record<ContactField, true>>; values?: Record<string, string> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const allowedServices = new Set<string>([...serviceIds, "other"]);

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real visitors never see or fill this field.
  if (formData.get("company")) return { status: "success" };

  const values = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    service: String(formData.get("service") ?? ""),
    message: String(formData.get("message") ?? "").trim(),
  };

  const fieldErrors: Partial<Record<ContactField, true>> = {};
  if (values.name.length < 2 || values.name.length > 100) fieldErrors.name = true;
  if (!EMAIL_RE.test(values.email) || values.email.length > 200) fieldErrors.email = true;
  if (!allowedServices.has(values.service)) fieldErrors.service = true;
  if (values.message.length < 10 || values.message.length > 5000) fieldErrors.message = true;

  if (Object.keys(fieldErrors).length > 0) return { status: "error", fieldErrors, values };

  const subject = `New lead: ${values.name} (${values.service})`;
  const text = `Name: ${values.name}\nEmail: ${values.email}\nService: ${values.service}\n\n${values.message}`;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // No mail provider configured: log the lead locally so development works,
    // but fail loudly in production rather than silently dropping leads.
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] RESEND_API_KEY not set, lead not emailed:\n" + text);
      return { status: "success" };
    }
    console.error("[contact] RESEND_API_KEY is not configured");
    return { status: "error", values };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? "Mountain Website <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO ?? site.email],
        reply_to: values.email,
        subject,
        text,
      }),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
    return { status: "success" };
  } catch (err) {
    console.error("[contact] failed to send", err);
    return { status: "error", values };
  }
}
