import { NextRequest, NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { auth } from "@/lib/auth/config";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/bmp",
  "image/tiff",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain",
];

export async function POST(request: NextRequest) {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        const session = await auth();
        if (!session?.user) {
          throw new Error("Unauthorized");
        }

        return {
          allowedContentTypes: ALLOWED_TYPES,
          maximumSizeInBytes: 20 * 1024 * 1024, // 20MB
        };
      },
      onUploadCompleted: async () => {
        // DB records are created by the /api/documents POST after all uploads complete
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("Upload token error:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Token oluşturulamadı." },
      { status: 400 }
    );
  }
}
