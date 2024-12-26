import { AWS_BUCKET_NAME } from "@/app/config";
import minioClient from "@/lib/minio";
import { BucketItem } from "minio";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const exists = await minioClient.bucketExists(AWS_BUCKET_NAME);

    if (!exists) {
      await minioClient.makeBucket(AWS_BUCKET_NAME, "us-east-1");
      return NextResponse.json({
        message: "Bucket created successfully.",
      });
    }

    const bucketDatas = await new Promise((resolve, reject) => {
      const datas: BucketItem[] = [];
      const stream = minioClient.listObjectsV2(AWS_BUCKET_NAME, "", true, "");

      stream.on("data", async (obj) => {
        datas.push(obj);
      });

      stream.on("end", () => resolve(datas));

      stream.on("error", (error) => reject(error));
    });

    if ((bucketDatas as []).length > 0) {
      return NextResponse.json(bucketDatas);
    } else {
      return NextResponse.json({ message: "No data found in the bucket." });
    }
  } catch (error) {
    return NextResponse.json({
      error: error,
    });
  }
}

export async function POST(request: Request) {
  const data = await request.formData();
  console.log(data);
  return NextResponse.json({
    data: Object.fromEntries(data),
  });
}
