import Garage from "@/components/Garage";
import { fetchVehicles } from "../lib/data";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const dynamic = "force-dynamic";
export default async function Page() {
  const session = await getServerSession(authOptions);
  const userId = session.user.id;

  const vehicleList = await fetchVehicles(userId);

  return <Garage vehicleList={vehicleList} />;
}
