import { APPSCRIPT_URL } from "../config";

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]); // ambil base64 tanpa prefix data:
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.suratType || !body.formData) {
      return Response.json(
        { status: "error", message: "Missing suratType or formData" },
        { status: 400 }
      );
    }

    const { suratType, formData } = body;

    // --- Konversi semua file menjadi base64 ---
    const fileFields = [
      "ktp",
      "kk",
      "pengantar_rt",
      "ktp_pendiri",
      "akta_lembaga",
      "surat_keterangan",
      "file_gaji",
    ];

    const processedFormData: Record<string, any> = { ...formData };

    for (const field of fileFields) {
      const file = formData[field];
      if (file && typeof file === "object" && file.name) {
        // konversi ke base64
        const base64Data = await fileToBase64(file);
        processedFormData[`${field}FileName`] = file.name;
        processedFormData[`${field}FileData`] = base64Data;
        delete processedFormData[field]; // hapus objek file mentah
      }
    }

    const payload = {
      suratType,
      formData: processedFormData,
    };

    const url = APPSCRIPT_URL;
    if (!url) {
      return Response.json(
        { status: "error", message: "APPSCRIPT_URL not configured" },
        { status: 500 }
      );
    }

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`Google Apps Script error: ${res.status}`);
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error: any) {
    console.error("POST /api/surat error:", error);
    return Response.json(
      { status: "error", message: error.message || "Server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const suratType = searchParams.get("type");

    if (!suratType) {
      return Response.json(
        { status: "error", message: "Parameter 'type' diperlukan." },
        { status: 400 }
      );
    }

    const url = APPSCRIPT_URL;
    if (!url) {
      return Response.json(
        { status: "error", message: "APPSCRIPT_URL not configured" },
        { status: 500 }
      );
    }

    const res = await fetch(`${url}?type=${encodeURIComponent(suratType)}`);
    const data = await res.json();

    return Response.json(data);
  } catch (error: any) {
    console.error("GET /api/surat error:", error);
    return Response.json(
      { status: "error", message: error.message || "Server error" },
      { status: 500 }
    );
  }
}
