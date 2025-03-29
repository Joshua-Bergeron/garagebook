import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ServiceHistoryPage from "./ServiceHistoryPage";
import dayjs from "dayjs";
import { serviceHistoryMock } from "@/mocks/vehicleMocks";
import { corolla } from "@/mocks/vehicleMocks";
import milesFormatter from "@/utils/milesFormatter";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

useRouter.mockImplementation(() => ({
  push: jest.fn(),
}));

it("renders without crashing", () => {
  render(
    <ServiceHistoryPage vehicle={corolla} serviceHistory={serviceHistoryMock} />
  );
});

it("renders all fields", () => {
  render(
    <ServiceHistoryPage vehicle={corolla} serviceHistory={serviceHistoryMock} />
  );

  expect(
    screen.getByText("2003 Toyota Corolla - Service History")
  ).toBeInTheDocument();

  expect(screen.getByText("Service Summary")).toBeInTheDocument();
  expect(screen.getByText("Last Service Date: 07/25/2005")).toBeInTheDocument();
  expect(
    screen.getByText("Last Service Type: Wheel Alignment")
  ).toBeInTheDocument();
  expect(screen.getByText("Total Services: 10")).toBeInTheDocument();
  expect(screen.getByText("Current Mileage: 178,234")).toBeInTheDocument();
  expect(screen.getByText("License Plate: 7JSN910")).toBeInTheDocument();

  expect(screen.getByTestId("add-button")).toBeInTheDocument();

  serviceHistoryMock.forEach((entry) => {
    expect(screen.getByText(entry.type)).toBeInTheDocument();
    expect(screen.getByText(milesFormatter(entry.mileage))).toBeInTheDocument();
    expect(
      screen.getByText(dayjs(entry.servicedate).format("MM/DD/YYYY"))
    ).toBeInTheDocument();
    expect(screen.getByText(entry.city)).toBeInTheDocument();
    expect(screen.getByText(entry.state)).toBeInTheDocument();
    expect(screen.getByText(entry.notes)).toBeInTheDocument();
  });
});

it("opens the modal when the add maintenance button is clicked", async () => {
  render(
    <ServiceHistoryPage vehicle={corolla} serviceHistory={serviceHistoryMock} />
  );

  const button = screen.getByTestId("add-button");
  fireEvent.click(button);

  expect(screen.getByTestId("maintenance-form")).toBeInTheDocument();
});
