import { fetchVehicles } from "@/app/lib/data";

export async function GET(req) {
  try {
    // const user_id = req.nextUrl.searchParams.get("user_id");
    const vehicles = await fetchVehicles(
      "410544b2-4001-4271-9855-fec4b6a6442a"
    );

    return new Response(JSON.stringify(vehicles), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store", // Disable caching
      },
    });
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch vehicles" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store", // Disable caching
      },
    });
  }
}
