import { NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import {
  successResponse,
  ApiErrors,
  handleApiError,
  requireAdmin,
  isAuthenticated,
} from "@/lib/api";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// POST /api/upload - Upload image to Cloudinary (Admin only)
export async function POST(request: NextRequest) {
  try {
    // Check admin authorization
    const authResult = await requireAdmin();
    if (!isAuthenticated(authResult)) {
      return authResult.response;
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "uploads";

    if (!file) {
      return ApiErrors.badRequest("No file provided");
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return ApiErrors.badRequest("Invalid file type. Allowed: JPEG, PNG, WebP, GIF");
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return ApiErrors.badRequest("File too large. Max size: 5MB");
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: `anastasya/${folder}`,
      resource_type: "image",
      transformation: [
        { quality: "auto", fetch_format: "auto" },
      ],
    });

    return successResponse(
      { 
        url: result.secure_url, 
        public_id: result.public_id,
        width: result.width,
        height: result.height,
      }, 
      "Image uploaded successfully"
    );
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return handleApiError(error);
  }
}
