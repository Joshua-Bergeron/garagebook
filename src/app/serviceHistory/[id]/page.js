import React from "react";
import ServiceHistoryPage from "@/components/ServiceHistoryPage";
import { fetchVehicle, fetchMaintenance, fetchVehicles } from "@/app/lib/data";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page({ params }) {
  const session = await getServerSession(authOptions);
  const userId = session.user.id;

  if (!session) {
    return <div>You must be logged in to view this page.</div>;
  }

  const { id } = await params;
  const vin = id;

  const userVehicles = await fetchVehicles(userId);

  const isAuthorized = userVehicles.some((vehicle) => vehicle.vin === vin);

  if (!isAuthorized) {
    return (
      <div>You are not authorized to view this vehicle's service history.</div>
    );
  }

  const vehicle = await fetchVehicle(vin);
  const serviceHistory = await fetchMaintenance(vin);

  if (!vehicle) {
    return <div>Vehicle not found</div>;
  }

  return (
    <ServiceHistoryPage vehicle={vehicle} serviceHistory={serviceHistory} />
  );
}
