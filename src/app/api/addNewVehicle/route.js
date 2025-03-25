import { addNewVehicle } from "@/app/lib/data";

export async function POST(req) {
  const { user_id, vehicleData } = await req.json();
  try {
    await addNewVehicle(user_id, vehicleData);
    return new Response(
      JSON.stringify({ message: "Vehicle added successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to add vehicle" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
