import VehicleSummaryItem from "../components/VehicleSummaryItem";
import { corolla, camry } from "@/mocks/vehicleMocks";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "Vehicle Summary Item",
  component: VehicleSummaryItem,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const WithAllInformation = {
  args: corolla,
};

export const WithNoLastServiceDate = {
  args: camry,
};
