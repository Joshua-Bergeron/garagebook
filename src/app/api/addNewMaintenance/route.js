import { addNewMaintenance } from "@/app/lib/data";

export async function POST(req) {
  const { vin, maintenanceData } = await req.json();
  try {
    await addNewMaintenance(vin, maintenanceData);
    return new Response(
      JSON.stringify({ message: "Maintenance added successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to add maintenance" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
