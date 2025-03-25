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
    FROM dbo.maintenance
    WHERE vehicle_vin = ${vin};
  `;

  return data.rows.map(({ serviceDate, ...record }) => ({
    ...record,
    serviceDate: formatDate(serviceDate),
  }));
}

export async function fetchVehicles(user_id) {
  await initializeClient();
  const data = await client.sql`
    SELECT v.*, 
           (SELECT MAX(serviceDate) 
            FROM dbo.maintenance 
            WHERE vehicle_vin = v.vin) AS lastServiceDate,
           (SELECT type 
            FROM dbo.maintenance 
            WHERE vehicle_vin = v.vin 
            ORDER BY serviceDate DESC 
            LIMIT 1) AS lastServiceType
    FROM dbo.vehicles v
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
            FROM dbo.maintenance 
            WHERE vehicle_vin = v.vin) AS lastServiceDate,
           (SELECT type 
            FROM dbo.maintenance 
            WHERE vehicle_vin = v.vin 
            ORDER BY serviceDate DESC 
            LIMIT 1) AS lastServiceType
    FROM dbo.vehicles v
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
    INSERT INTO dbo.vehicles (user_id, make, model, year, mileage, license, color, vin)
    VALUES (${user_id}, ${vehicleData.make}, ${vehicleData.model}, ${vehicleData.year}, ${vehicleData.mileage}, ${vehicleData.licensePlate}, ${vehicleData.color}, ${vehicleData.vin});
  `;
}
