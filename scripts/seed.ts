import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { hash } from "bcryptjs";
import * as schema from "../src/lib/db/schema";

async function seed() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("DATABASE_URL is not set");
    process.exit(1);
  }

  const sql = neon(databaseUrl);
  const db = drizzle(sql, { schema });

  console.log("🌱 Seeding database...\n");

  // Create admin user
  const hashedPassword = await hash("LvivAvukat2024!", 12);
  const existingAdmin = await db
    .select()
    .from(schema.adminUsers)
    .limit(1);

  if (existingAdmin.length === 0) {
    await db.insert(schema.adminUsers).values({
      email: "admin@lvivavukat.com",
      passwordHash: hashedPassword,
      name: "Av. Lyudmyla Chubai",
    });
    console.log("✅ Admin user created: admin@lvivavukat.com / LvivAvukat2024!");
  } else {
    console.log("ℹ️  Admin user already exists, skipping.");
  }

  // Default site settings
  const defaultSettings = [
    { key: "site_title", value: "Lviv Avukat" },
    { key: "site_description", value: "Ukrayna'da Türkler İçin Hukuki Danışmanlık" },
    { key: "contact_email", value: "info@lvivavukat.com" },
    { key: "contact_phone", value: "+380 00 000 00 00" },
    { key: "whatsapp_number", value: "+380000000000" },
    { key: "office_address", value: "Svobody Ave, Lviv, Ukrayna 79000" },
  ];

  for (const setting of defaultSettings) {
    await db
      .insert(schema.siteSettings)
      .values(setting)
      .onConflictDoUpdate({
        target: schema.siteSettings.key,
        set: { value: setting.value },
      });
  }
  console.log("✅ Site settings initialized.");

  // Blog categories
  const categories = [
    { name: "Oturum İzni", slug: "oturum-izni" },
    { name: "Çalışma İzni", slug: "calisma-izni" },
    { name: "Evlilik & Aile", slug: "evlilik-aile" },
    { name: "Şirket Kurma", slug: "sirket-kurma" },
    { name: "Gayrimenkul", slug: "gayrimenkul" },
    { name: "Genel Hukuk", slug: "genel-hukuk" },
  ];

  for (const cat of categories) {
    await db
      .insert(schema.blogCategories)
      .values(cat)
      .onConflictDoNothing();
  }
  console.log("✅ Blog categories created.");

  console.log("\n🎉 Seed complete!");
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
