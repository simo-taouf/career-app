import { NextResponse } from "next/server";

type Payload = {
  fullName?: string;
  email?: string;
  phone?: string;
  service?: string;
  package?: string;
  locale?: string;
};

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.fullName || !body.email || !body.service) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const recipient = process.env.BOOKING_NOTIFICATION_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey && recipient) {
    try {
      const html = renderBookingEmail(body);
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "CareerBridge <onboarding@resend.dev>",
          to: [recipient],
          reply_to: body.email,
          subject: `[CareerBridge] Nouvelle commande : ${body.fullName} — ${body.service} / ${body.package ?? "—"}`,
          html,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Resend error:", text);
        return NextResponse.json({ error: "Email send failed" }, { status: 502 });
      }
    } catch (err) {
      console.error("Resend exception:", err);
      return NextResponse.json({ error: "Email send failed" }, { status: 502 });
    }
  } else {
    console.log("[booking] (dev — email not sent)", body);
  }

  return NextResponse.json({ ok: true });
}

function renderBookingEmail(b: Payload): string {
  const row = (k: string, v?: string) =>
    v
      ? `<tr>
          <td style="padding:7px 16px;color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;white-space:nowrap;width:160px">${esc(k)}</td>
          <td style="padding:7px 16px;color:#0b1f4d;font-size:13px;font-weight:500">${esc(v)}</td>
         </tr>`
      : "";

  const section = (title: string, rows: string) =>
    `<tr><td colspan="2" style="padding:12px 16px 4px;background:#f8fafc;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#2563eb">${esc(title)}</td></tr>${rows}`;

  return `
  <div style="font-family:Inter,system-ui,sans-serif;background:#f1f5f9;padding:32px 16px">
    <div style="max-width:580px;margin:0 auto;background:#ffffff;border-radius:16px;border:1px solid #e2e8f0;overflow:hidden">

      <div style="background:linear-gradient(135deg,#1e3a8a 0%,#2563eb 60%,#0ea5e9 100%);color:#fff;padding:24px 28px">
        <p style="margin:0 0 4px;font-size:11px;letter-spacing:.1em;text-transform:uppercase;opacity:.75">CareerBridge</p>
        <h1 style="margin:0;font-size:22px;font-weight:700">Nouvelle commande</h1>
        <p style="margin:6px 0 0;font-size:13px;opacity:.85">${esc(b.fullName ?? "")} · ${esc(b.service ?? "")} / ${esc(b.package ?? "—")}</p>
      </div>

      <table style="width:100%;border-collapse:collapse">
        ${section("Contact",
          row("Nom", b.fullName) +
          row("Email", b.email) +
          row("Téléphone", b.phone) +
          row("Langue interface", b.locale)
        )}
        ${section("Commande",
          row("Service", b.service) +
          row("Forfait", b.package)
        )}
      </table>

      <div style="padding:14px 20px;background:#eff6ff;border-top:1px solid #bfdbfe;display:flex;align-items:center;gap:8px">
        <span style="font-size:18px">🔒</span>
        <p style="margin:0;color:#1d4ed8;font-size:11px">
          Consentement CNDP + RGPD recueilli lors de la soumission du formulaire.
        </p>
      </div>

      <div style="padding:14px 20px;color:#94a3b8;font-size:11px;text-align:center">
        Répondez directement à cet email pour contacter le client (reply-to configuré).
      </div>
    </div>
  </div>`;
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
