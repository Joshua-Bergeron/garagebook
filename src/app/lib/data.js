import { db } from "@vercel/postgres";

let client;

async function initializeClient() {
  if (!client) {
    if (!process.env.POSTGRES_URL) {
      throw new Error("Missing POSTGRES_URL environment variable");
    }
    client = await db.connect();
  }
}

function formatDate(date) {
  if (!date) return null;
  const d = new Date(date);
  const month = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  const year = d.getFullYear();
  return `${month}/${day}/${year}`;
}

export async function fetchMaintenance(vin) {
  await initializeClient();
  const data = await client.sql`
    SELECT *
    FROM public.maintenance
    WHERE vehicle_vin = ${vin};
  `;

  return data.rows;
}

export async function fetchVehicles(user_id) {
  await initializeClient();

  const data = await client.sql`
    SELECT v.*, 
           (SELECT MAX(serviceDate) 
            FROM public.maintenance 
            WHERE vehicle_vin = v.vin) AS lastServiceDate,
           (SELECT type 
            FROM public.maintenance 
            WHERE vehicle_vin = v.vin 
            ORDER BY serviceDate DESC 
            LIMIT 1) AS lastServiceType
    FROM public.vehicles v
    WHERE v.user_id = ${user_id};
  `;

  return data.rows.map((vehicle) => ({
    ...vehicle,
    lastServiceDate: formatDate(vehicle.lastservicedate),
    lastServiceType: vehicle.lastservicetype,
  }));
}

export async function fetchVehicle(vin) {
  await initializeClient();
  const data = await client.sql`
    SELECT v.*,
           (SELECT MAX(serviceDate) 
            FROM public.maintenance 
            WHERE vehicle_vin = v.vin) AS lastServiceDate,
           (SELECT type 
            FROM public.maintenance 
            WHERE vehicle_vin = v.vin 
            ORDER BY serviceDate DESC 
            LIMIT 1) AS lastServiceType
    FROM public.vehicles v
    WHERE v.vin = ${vin};
  `;

  if (data.rows.length === 0) {
    return null;
  }

  const vehicle = data.rows[0];
  return {
    ...vehicle,
    lastServiceDate: formatDate(vehicle.lastservicedate),
    lastServiceType: vehicle.lastservicetype,
    licensePlate: vehicle.license,
  };
}

export async function addNewVehicle(user_id, vehicleData) {
  await initializeClient();
  await client.sql`
    INSERT INTO public.vehicles (user_id, make, model, year, mileage, license, color, vin)
    VALUES (${user_id}, ${vehicleData.make}, ${vehicleData.model}, ${vehicleData.year}, ${vehicleData.mileage}, ${vehicleData.licensePlate}, ${vehicleData.color}, ${vehicleData.vin});
  `;
}

export async function addNewMaintenance(vin, maintenanceData) {
  await initializeClient();
  const uuid = require("uuid").v4();

  const { type, mileage, serviceDate, city, state, notes } = maintenanceData;

  await client.sql`
    INSERT INTO public.maintenance (id, vehicle_vin, type, mileage, servicedate, city, state, notes)
    VALUES (${uuid}, ${vin}, ${type}, ${mileage}, ${serviceDate}, ${city}, ${state}, ${notes});
  `;

  // Update the mileage in the vehicles table if the new mileage is greater
  await client.sql`
    UPDATE public.vehicles
    SET mileage = ${mileage}
    WHERE vin = ${vin} AND mileage < ${mileage};
  `;
}

export async function deleteVehicle(vin) {
  await initializeClient();
  await client.sql`
    DELETE FROM public.vehicles
    WHERE vin = ${vin};
  `;
}
