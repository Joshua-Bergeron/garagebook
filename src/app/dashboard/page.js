import Garage from "@/components/Garage";
import { fetchVehicles } from "../lib/data";

export const dynamic = "force-dynamic";
export default async function Page() {
  const vehicleList = await fetchVehicles(
    "410544b2-4001-4271-9855-fec4b6a6442a",
    { cache: "no-store", timestamp: new Date().getTime() }
  );

  return <Garage vehicleList={vehicleList} />;
}
