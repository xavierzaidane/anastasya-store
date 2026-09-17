import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  let evt;
  try {
    evt = await verifyWebhook(req);
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Webhook verification failed", { status: 400 });
  }

  try {
    if (evt.type === "user.created") {
      const { id, email_addresses, first_name, last_name } = evt.data;
      const email = email_addresses?.[0]?.email_address;
      const name = [first_name, last_name].filter(Boolean).join(" ") || null;

      if (email && id) {
        await prisma.user.upsert({
          where: { clerkId: id },
          update: {
            email,
            name,
          },
          create: {
            clerkId: id,
            email,
            name,
            role: "ADMIN",
          },
        });
      }
    }

    if (evt.type === "user.updated") {
      const { id, email_addresses, first_name, last_name } = evt.data;
      const email = email_addresses?.[0]?.email_address;
      const name = [first_name, last_name].filter(Boolean).join(" ") || null;

      if (id) {
        await prisma.user.updateMany({
          where: { clerkId: id },
          data: {
            ...(email ? { email } : {}),
            name,
          },
        });
      }
    }

    if (evt.type === "user.deleted") {
      const { id } = evt.data;
      if (id) {
        await prisma.user.deleteMany({
          where: { clerkId: id },
        });
      }
    }

    return new Response("Webhook processed successfully", { status: 200 });
  } catch (error) {
    console.error("Error processing Clerk webhook:", error);
    return new Response("Error processing webhook", { status: 500 });
  }
}

