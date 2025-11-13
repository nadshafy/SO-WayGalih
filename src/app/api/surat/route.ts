// src/app/api/surat/route.ts
import { APPSCRIPT_URL } from "../config";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.suratType || !body.formData) {
      return Response.json({ status: "error", message: "Missing suratType or formData" }, { status: 400 });
    }

    const { formData } = body;

    const fileFields = [
      "ktp",
      "kk",
      "pengantar_rt",
      "ktp_pendiri",
      "akta_lembaga",
      "surat_keterangan",
      "file_gaji",
    ];

    const fileData: Record<string, string> = {};
    const fileNames: Record<string, string> = {};

    for (const field of fileFields) {
      const file = formData[field];
      if (file && file.name) {
        const arrayBuffer = await file.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString("base64");
        fileData[field] = base64;
        fileNames[field] = file.name;
      }
    }

    const payload = {
      suratType: body.suratType,
      formData: { ...formData, fileData, fileNames },
    };

    const res = await fetch(APPSCRIPT_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return Response.json(data);
  } catch (error: any) {
    console.error("POST /api/surat error:", error);
    return Response.json({ status: "error", message: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const suratType = searchParams.get("type");
    if (!suratType) {
      return Response.json({ status: "error", message: "Parameter 'type' diperlukan." }, { status: 400 });
    }

    const res = await fetch(`${APPSCRIPT_URL}?type=${encodeURIComponent(suratType)}`);
    const data = await res.json();
    return Response.json(data);
  } catch (error: any) {
    console.error("GET /api/surat error:", error);
    return Response.json({ status: "error", message: error.message }, { status: 500 });
  }
}
