import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import VehicleSummaryItem from "./VehicleSummaryItem";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

useRouter.mockImplementation(() => ({
  push: jest.fn(),
}));

it("renders without crashing", () => {
  render(
    <VehicleSummaryItem
      make={"Toyota"}
      model={"Corolla"}
      year={2003}
      mileage={178234}
      color={"White"}
      lastServiceDate={"05/16/2024"}
      lastServiceType={"Oil Change"}
    />
  );
});

it("renders all data", () => {
  render(
    <VehicleSummaryItem
      make={"Toyota"}
      model={"Corolla"}
      year={2003}
      mileage={178234}
      color={"White"}
      lastServiceDate={"05/16/2024"}
      lastServiceType={"Oil Change"}
    />
  );

  expect(screen.getByText("Toyota Corolla")).toBeInTheDocument();
  expect(screen.getByText("2003 - White")).toBeInTheDocument();
  expect(screen.getByText("Mileage: 178,234 miles")).toBeInTheDocument();
  expect(
    screen.getByText("Last Service: 05/16/2024 - Oil Change")
  ).toBeInTheDocument();
  expect(screen.getByTestId("history-button")).toBeInTheDocument();
  expect(screen.getByTestId("settings-button")).toBeInTheDocument();
});

it("calls function on settings button click", () => {
  console.log = jest.fn();
  render(
    <VehicleSummaryItem
      make={"Toyota"}
      model={"Corolla"}
      year={2003}
      mileage={178234}
      color={"White"}
      lastServiceDate={"05/16/2024"}
      lastServiceType={"Oil Change"}
    />
  );

  const settingsButton = screen.getByTestId("settings-button");
  fireEvent.click(settingsButton);
  expect(console.log).toHaveBeenCalledTimes(1);
});
