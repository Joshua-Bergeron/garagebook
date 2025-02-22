import bcrypt from "bcryptjs";
import { db } from "@vercel/postgres";
import { history } from "../lib/placeholder-data";

const client = await db.connect();

async function seedMaintenance() {
  const insertedMaintenance = await Promise.all(
    history.map(
      (record) => client.sql`
        INSERT INTO dbo.maintenance (id, vehicle_vin, type, mileage, serviceDate, city, state, notes)
        VALUES (${record.id}, ${record.vehicle_vin}, ${record.type}, ${record.mileage}, ${record.serviceDate}, ${record.city}, ${record.state}, ${record.notes})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedMaintenance;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedMaintenance();
    await client.sql`COMMIT`;

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
