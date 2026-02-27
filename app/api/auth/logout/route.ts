import { cookies } from "next/headers";
import { successResponse, handleApiError } from "@/lib/api";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token");

    return successResponse(null, "Logged out successfully");
  } catch (error) {
    return handleApiError(error);
  }
}
