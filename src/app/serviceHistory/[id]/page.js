import React from "react";
import ServiceHistoryPage from "@/components/ServiceHistoryPage";
import { fetchVehicle, fetchMaintenance } from "@/app/lib/data";

export default async function Page({ params }) {
  const { id } = await params;
  const vin = id;

  const vehicle = await fetchVehicle(vin);
  const serviceHistory = await fetchMaintenance(vin);

  if (!vehicle) {
    return <div>Vehicle not found</div>;
  }

  return (
    <ServiceHistoryPage vehicle={vehicle} serviceHistory={serviceHistory} />
  );
}
