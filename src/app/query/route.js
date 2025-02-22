import { db } from "@vercel/postgres";

const client = await db.connect();

async function listInvoices() {
  const data = await client.sql`
    SELECT maintenance.type
    FROM dbo.vehicles
    JOIN dbo.maintenance ON vehicles.vin = maintenance.vehicle_vin
    WHERE vehicles.vin = '4Y1SL65848Z411439';
  `;

  return data.rows;
}

export async function GET() {
  try {
    return Response.json(await listInvoices());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
