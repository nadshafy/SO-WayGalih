import type { NextApiRequest, NextApiResponse } from "next";
import { FEEDBACK_URL } from "./config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { rating, notes } = req.body;

  const appsScriptUrl = FEEDBACK_URL; 

  if (!rating) {
    return res.status(400).json({ message: "Rating wajib diisi." });
  }

  if (!appsScriptUrl) {
    console.error("FEEDBACK_APPS_SCRIPT_URL belum diatur di .env.local");
    return res.status(500).json({ message: "Konfigurasi server error." });
  }

  try {
    const response = await fetch(appsScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating, notes }),
      redirect: "follow", 
    });

    const result = await response.json();

    if (result.status === "success") {
      return res.status(200).json({ message: "Feedback berhasil dikirim." });
    } else {
      return res.status(500).json({
        message: result.message || "Gagal menyimpan ke Google Sheet.",
      });
    }
  } catch (error) {
    console.error("Error saat menghubungi Apps Script:", error);
    return res.status(500).json({ message: "Gagal menghubungi layanan feedback." });
  }
}