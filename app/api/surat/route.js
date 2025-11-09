import { APPSCRIPT_URL } from "../config";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.suratType || !body.formData) {
      return Response.json({ status: "error", message: "Missing suratType or formData" }, { status: 400 });
    }

    const res = await fetch(APPSCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ status: "error", message: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const suratType = searchParams.get("type");

    if (!suratType) {
      return Response.json({ status: "error", message: "Parameter 'type' diperlukan." }, { status: 400 });
    }

    const res = await fetch(`${APPSCRIPT_URL}?type=${encodeURIComponent(suratType)}`);
    const data = await res.json();

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ status: "error", message: error.message }, { status: 500 });
  }
}
