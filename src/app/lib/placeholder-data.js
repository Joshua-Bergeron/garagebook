// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
import { v4 as uuidv4 } from "uuid";
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    name: "User",
    email: "user@nextmail.com",
    password: "123456",
  },
];

const vehicles = [
  {
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    vin: "1HGCM82633A001234",
    make: "Honda",
    model: "Accord",
    year: 2003,
    license: "7JSN910",
    mileage: 178234,
    color: "White",
  },
  {
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    vin: "1HGCM82633A001235",
    make: "Toyota",
    model: "Camry",
    year: 2005,
    license: "8KDN123",
    mileage: 150000,
    color: "Black",
  },
  {
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    vin: "1HGCM82633A001236",
    make: "Ford",
    model: "Focus",
    year: 2010,
    license: "9LDM456",
    mileage: 120000,
    color: "Blue",
  },
  {
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    vin: "1HGCM82633A001237",
    make: "Chevrolet",
    model: "Malibu",
    year: 2012,
    license: "0NCP789",
    mileage: 90000,
    color: "Red",
  },
];

const history = [
  {
    id: uuidv4(),
    vehicle_vin: "1HGCM82633A001237",
    type: "Oil Change",
    mileage: 15000,
    serviceDate: "2023-01-10",
    city: "Indianapolis",
    state: "IN",
    notes: "Changed oil and oil filter.",
  },
  {
    id: uuidv4(),
    vehicle_vin: "1HGCM82633A001237",
    type: "Tire Rotation",
    mileage: 20000,
    serviceDate: "2023-03-15",
    city: "Fort Wayne",
    state: "IN",
    notes: "Rotated all four tires.",
  },
  {
    id: uuidv4(),
    vehicle_vin: "1HGCM82633A001237",
    type: "Brake Inspection",
    mileage: 25000,
    serviceDate: "2023-05-20",
    city: "Evansville",
    state: "IN",
    notes: "Inspected brake pads and rotors.",
  },
  {
    id: uuidv4(),
    vehicle_vin: "1HGCM82633A001237",
    type: "Battery Replacement",
    mileage: 30000,
    serviceDate: "2023-07-25",
    city: "South Bend",
    state: "IN",
    notes: "Replaced battery with a new one.",
  },
];

export { users, customers, invoices, revenue, vehicles, history };
