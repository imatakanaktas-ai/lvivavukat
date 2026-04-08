import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file size (max 20MB)
    if (file.size > 20 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Max 20MB." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");
    const mimeType = file.type;
    const fileName = file.name;

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ];
    if (!allowedTypes.includes(mimeType)) {
      return NextResponse.json(
        { error: "Unsupported file type. Allowed: PDF, JPEG, PNG, WebP, GIF" },
        { status: 400 }
      );
    }

    let extractedText: string | undefined;

    // Extract text from PDF
    if (mimeType === "application/pdf") {
      try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const pdfParseModule = require("pdf-parse") as { PDFParse: new (opts: { dataBuffer: Buffer }) => { load: () => Promise<void>; getText: () => string } };
        const parser = new pdfParseModule.PDFParse({ dataBuffer: buffer });
        await parser.load();
        extractedText = parser.getText();
      } catch (e) {
        console.error("PDF parse error:", e);
        extractedText = "[PDF metnini okumak mümkün olmadı]";
      }
    }

    return NextResponse.json({
      success: true,
      base64,
      mimeType,
      fileName,
      extractedText,
    });
  } catch (e) {
    console.error("File upload error:", e);
    return NextResponse.json(
      { error: "File processing failed" },
      { status: 500 }
    );
  }
}
