import bcrypt from "bcryptjs";
import db from "@/utils/db";

async function seedAdmin() {
  try {
    console.log("Starting seed...");

    const email = process.env.ADMIN_EMAIL;
    if (!email) {
      throw new Error("ADMIN_EMAIL not found in environment variables");
    }

    const existingAdmin = await db.users.findFirst({
      where: { email },
    });

    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD || "Password123!",
      10
    );

    await db.users.create({
      data: {
        email,
        password: hashedPassword,
        name: "Admin User", // Changed from firstName/lastName to name to match prisma schema
        isActive: true,
        isPasswordChanged: false,
      },
    });

    console.log("Admin user created successfully");
  } catch (error) {
    console.error("Error seeding admin:", error);
  }
}

seedAdmin()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
