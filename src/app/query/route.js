import { db } from "@vercel/postgres";
import { fetchMaintenance, fetchVehicles } from "../lib/data";
let client;
(async () => {
  client = await db.connect();
})();

// async function listInvoices() {
//   const data = await client.sql`
//     SELECT maintenance.type
//     FROM dbo.vehicles
//     JOIN dbo.maintenance ON vehicles.vin = maintenance.vehicle_vin
//     WHERE vehicles.vin = '4Y1SL65848Z411439';
//   `;

//   return data.rows;
// }

export async function GET() {
  try {
    //return Response.json(await fetchMaintenance("1HGCM82633A001234"));
    return Response.json(
      await fetchVehicles("410544b2-4001-4271-9855-fec4b6a6442a")
    );
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
