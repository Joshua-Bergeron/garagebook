import Garage from "@/components/Garage";
import { fetchVehicles } from "../lib/data";

export default async function Page() {
  const vehicleList = await fetchVehicles(
    "410544b2-4001-4271-9855-fec4b6a6442a",
    { cache: "no-store" }
  );

  return <Garage vehicleList={vehicleList} />;
}
