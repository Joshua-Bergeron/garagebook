import VehicleList from "@/components/VehicleList";
import { vehicleList } from "@/mocks/vehicleMocks";

export default {
  title: "Vehicle List",
  component: VehicleList,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export const WithMultipleVehicles = {
  args: {
    vehicleList: vehicleList,
  },
};

export const WithNoVehicles = {
  args: {
    vehicleList: [],
  },
};
