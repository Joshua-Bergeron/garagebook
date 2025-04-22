import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import GarageHeader from "./GarageHeader";

it("renders without crashing", () => {
  render(<GarageHeader />);

  expect(screen.getByText("MY GARAGE")).toBeInTheDocument();
  expect(screen.getByTestId("export-button")).toBeInTheDocument();
  expect(screen.getByTestId("new-vehicle-button")).toBeInTheDocument();
});

it("calls function on new vehicle button click", () => {
  const handleNewVehicleClick = jest.fn();
  render(<GarageHeader onNewVehicleClick={handleNewVehicleClick} />);

  const newVehicleButton = screen.getByTestId("new-vehicle-button");
  fireEvent.click(newVehicleButton);
  expect(handleNewVehicleClick).toHaveBeenCalledTimes(1);
});
