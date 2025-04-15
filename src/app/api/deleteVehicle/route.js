import { deleteVehicle } from "@/app/lib/data";

export async function POST(req) {
  try {
    const { vin } = await req.json();
    await deleteVehicle(vin);
    console.log(`Vehicle with VIN ${vin} deleted successfully`);
    return new Response("Vehicle deleted successfully", {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("Failed to delete vehicle", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
