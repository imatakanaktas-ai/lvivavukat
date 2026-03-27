import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth/config";
import { db } from "@/lib/db";
import { clientDocuments, clientDocumentFiles } from "@/lib/db/schema";

interface UploadedFileInfo {
  url: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { clientId, title, category, files } = body as {
      clientId: string;
      title: string;
      category: string;
      files: UploadedFileInfo[];
    };

    if (!clientId || !title || !category || !files?.length) {
      return NextResponse.json(
        { error: "Eksik bilgi: clientId, title, category ve en az 1 dosya gerekli." },
        { status: 400 }
      );
    }

    if (title.length > 255 || category.length > 100) {
      return NextResponse.json({ error: "Başlık veya kategori çok uzun." }, { status: 400 });
    }

    // Create document group
    const [doc] = await db
      .insert(clientDocuments)
      .values({ clientId, title: title.trim(), category })
      .returning({ id: clientDocuments.id });

    // Create DB records for already-uploaded blob files
    const uploadedFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const [dbFile] = await db
        .insert(clientDocumentFiles)
        .values({
          documentId: doc.id,
          fileUrl: file.url,
          fileName: file.fileName,
          fileSize: file.fileSize,
          mimeType: file.mimeType,
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
    console.error("Document save error:", error);
    return NextResponse.json(
      { error: "Belge kaydedilirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
