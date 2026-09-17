import "server-only";

/**
 * Fire-and-forget Telegram notification to the studio owner's chat.
 * Reads TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID. If either is missing it no-ops,
 * so the app never breaks just because notifications aren't configured.
 */
export async function sendTelegram(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** Digits-only phone for a wa.me link (strips +, spaces, dashes). */
export function waLink(phone: string): string {
  const digits = phone.replace(/[^\d]/g, "");
  return digits ? `https://wa.me/${digits}` : "";
}
