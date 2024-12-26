import formidable from "formidable";
import fs from "fs";
import minioClient from "@/lib/minio";
import { AWS_BUCKET_NAME } from "@/app/config";
import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";

export const config = {
  api: {
    bodyParser: false, // Désactivation pour utiliser formidable
  },
};

// Transformer `ReadableStream` en un objet compatible avec `IncomingMessage`
async function toCompatibleIncomingMessage(req: NextRequest): Promise<any> {
  // const { Readable } = require('stream'); // Dynamique pour éviter des problèmes côté client
  const buffer = await req.arrayBuffer();
  const stream = new Readable();
  stream.push(Buffer.from(buffer));
  stream.push(null); // Fin du flux
  return Object.assign(stream, {
    headers: Object.fromEntries(req.headers.entries()),
    method: req.method,
    url: req.url,
  });
}

// Fonction utilitaire pour gérer formidable en mode Promesse
const parseForm = (
  req: any
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const form = formidable({
    keepExtensions: true,
    multiples: true,
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};

export async function POST(req: NextRequest) {
  try {
    // Convertir le ReadableStream de la requête en Buffer
    const compatibleReq = await toCompatibleIncomingMessage(req);

    // Traiter le formulaire avec formidable
    const { files } = await parseForm(compatibleReq);

    if (!files.file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const file = Array.isArray(files.file) ? files.file[0] : files.file;

    // Upload du fichier vers MinIO
    const fileStream = fs.createReadStream(file.filepath);
    await minioClient.putObject(
      AWS_BUCKET_NAME,
      file.originalFilename!,
      fileStream
    );

    // Supprimer le fichier temporaire
    fs.unlinkSync(file.filepath);

    return NextResponse.json(
      { message: "File uploaded successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Error uploading file" },
      { status: 500 }
    );
  }
}
