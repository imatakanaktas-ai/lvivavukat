import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth/config";
import { db } from "@/lib/db";
import { clientDocuments, clientDocumentFiles } from "@/lib/db/schema";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
const ALLOWED_TYPES = new Set([
  // Images
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/bmp",
  "image/tiff",
  // PDF
  "application/pdf",
  // Word
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // Excel
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  // Text
  "text/plain",
]);

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const clientId = formData.get("clientId") as string;
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const files = formData.getAll("files") as File[];

    if (!clientId || !title || !category || files.length === 0) {
      return NextResponse.json(
        { error: "Eksik bilgi: clientId, title, category ve en az 1 dosya gerekli." },
        { status: 400 }
      );
    }

    if (title.length > 255 || category.length > 100) {
      return NextResponse.json({ error: "Başlık veya kategori çok uzun." }, { status: 400 });
    }

    // Validate files
    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `Dosya çok büyük: ${file.name} (max 20MB)` },
          { status: 400 }
        );
      }
      if (!ALLOWED_TYPES.has(file.type)) {
        return NextResponse.json(
          { error: `Desteklenmeyen dosya türü: ${file.name}` },
          { status: 400 }
        );
      }
    }

    // Create document group
    const [doc] = await db
      .insert(clientDocuments)
      .values({ clientId, title: title.trim(), category })
      .returning({ id: clientDocuments.id });

    // Upload files to Vercel Blob and create DB records
    const uploadedFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `documents/${clientId}/${doc.id}/${safeName}`;

      const blob = await put(path, file, {
        access: "public",
        contentType: file.type,
      });

      const [dbFile] = await db
        .insert(clientDocumentFiles)
        .values({
          documentId: doc.id,
          fileUrl: blob.url,
          fileName: file.name,
          fileSize: file.size,
          mimeType: file.type,
          sortOrder: i,
        })
        .returning();

      uploadedFiles.push(dbFile);
    }

    const adminPrefix = process.env.ADMIN_ROUTE_PREFIX || "panel-yonetim2024x";
    revalidatePath(`/${adminPrefix}/muvekiller/${clientId}`);

    return NextResponse.json({
      success: true,
      document: { id: doc.id, title, category },
      files: uploadedFiles,
    });
  } catch (error) {
    console.error("Document upload error:", error);
    return NextResponse.json(
      { error: "Dosya yüklenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
