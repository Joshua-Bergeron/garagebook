export const serviceHistoryMock = [
  {
    type: "Oil Change",
    mileage: 123456,
    serviceDate: "2003-03-20",
    city: "San Marcos",
    state: "TX",
    notes:
      "This is a long note that should wrap to the next line if it exceeds the width of the cell. Make sure the text is visible and easy to read.",
  },
  {
    type: "Tire Rotation",
    mileage: 125000,
    serviceDate: "2003-06-15",
    city: "Los Angeles",
    state: "CA",
    notes: "Rotated all four tires to ensure even wear and extend tire life.",
  },
  {
    type: "Brake Inspection",
    mileage: 128000,
    serviceDate: "2003-09-10",
    city: "New York City",
    state: "NY",
    notes:
      "Checked brake pads and rotors. No issues found, but pads are wearing thin.",
  },
  {
    type: "Battery Replacement",
    mileage: 130500,
    serviceDate: "2004-01-22",
    city: "Chicago",
    state: "IL",
    notes:
      "Replaced the battery due to starting issues. Installed a new battery with a 3-year warranty.",
  },
  {
    type: "Air Filter Change",
    mileage: 132000,
    serviceDate: "2004-04-05",
    city: "Miami",
    state: "FL",
    notes:
      "Replaced the engine air filter to improve fuel efficiency and performance.",
  },
  {
    type: "Coolant Flush",
    mileage: 135000,
    serviceDate: "2004-07-19",
    city: "Atlanta",
    state: "GA",
    notes:
      "Performed a coolant flush and replaced with new coolant to maintain engine temperature regulation.",
  },
  {
    type: "Transmission Service",
    mileage: 137500,
    serviceDate: "2004-10-30",
    city: "Phoenix",
    state: "AZ",
    notes:
      "Replaced the transmission fluid and filter to ensure smooth gear shifts.",
  },
  {
    type: "Spark Plug Replacement",
    mileage: 140000,
    serviceDate: "2005-01-15",
    city: "Denver",
    state: "CO",
    notes:
      "Replaced all spark plugs to maintain optimal engine performance and fuel efficiency.",
  },
  {
    type: "Wiper Blade Replacement",
    mileage: 142000,
    serviceDate: "2005-04-10",
    city: "Albuquerque",
    state: "NM",
    notes:
      "Replaced front and rear wiper blades for clear visibility during rain.",
  },
  {
    type: "Wheel Alignment",
    mileage: 145000,
    serviceDate: "2005-07-25",
    city: "Seattle",
    state: "WA",
    notes:
      "Performed wheel alignment to correct uneven tire wear and improve vehicle handling.",
  },
];

export const corolla = {
  id: 1,
  make: "Toyota",
  model: "Corolla",
  year: 2003,
  mileage: 178234,
  color: "White",
  lastServiceDate: "05/16/2024",
  lastServiceType: "Oil Change",
  licensePlate: "7JSN910",
  vin: "00000000000000000",
};

export const corollaDetails = {
  make: "Toyota",
  model: "Corolla",
  year: 2003,
  color: "White",
};

export const camry = {
  id: 4,
  make: "Toyota",
  model: "Camry",
  year: 2017,
  mileage: 78910,
  color: "Silver",
  lastServiceType: "",
  vin: "00000000000000000",
};

export const vehicleList = [
  {
    id: 0,
    make: "BMW",
    model: "Z4",
    year: "2008",
    mileage: 84772,
    color: "Black",
    vin: "00000000000000001",
    licensePlate: "91HM210",
  },
  {
    id: 1,
    make: "Toyota",
    model: "Corolla",
    year: "2003",
    mileage: 178234,
    color: "White",
    lastServiceDate: "05/16/2024",
    lastServiceType: "Oil Change",
    vin: "00000000000000002",
    licensePlate: "7JSN910",
  },
  {
    id: 2,
    make: "Honda",
    model: "Civic",
    year: "2023",
    mileage: 2102,
    color: "Blue",
    lastServiceDate: "07/22/2024",
    lastServiceType: "New Air Filter",
    vin: "00000000000000003",
    licensePlate: "KJHJ123",
  },
];
