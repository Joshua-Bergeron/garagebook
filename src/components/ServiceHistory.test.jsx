import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ServiceHistory from "./ServiceHistory";
import milesFormatter from "@/utils/milesFormatter";
import { serviceHistoryMock } from "@/mocks/vehicleMocks";
import dayjs from "dayjs";

it("renders without crashing", () => {
  render(<ServiceHistory serviceHistory={serviceHistoryMock} />);
});

it("renders the correct table structure", () => {
  render(<ServiceHistory serviceHistory={serviceHistoryMock} />);

  expect(screen.getByText("Service Type")).toBeInTheDocument();
  expect(screen.getByText("Mileage")).toBeInTheDocument();
  expect(screen.getByText("Date")).toBeInTheDocument();
  expect(screen.getByText("City")).toBeInTheDocument();
  expect(screen.getByText("State")).toBeInTheDocument();
  expect(screen.getByText("Additional Notes")).toBeInTheDocument();
});

it("displays the correct data from the serviceHistory prop", () => {
  render(<ServiceHistory serviceHistory={serviceHistoryMock} />);

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

it("has a sticky header", () => {
  render(<ServiceHistory serviceHistory={serviceHistoryMock} />);
  const headerRow = screen.getByRole("row", {
    name: /service type mileage date city state additional notes/i,
  });

  expect(headerRow).toHaveStyle("position: sticky");
  expect(headerRow).toHaveStyle("top: 0");
  expect(headerRow).toHaveStyle("z-index: 1");
});
