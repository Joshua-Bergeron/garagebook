import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import LandingPage from "./LandingPage";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

test("renders welcome message", () => {
  render(<LandingPage />);
  expect(screen.getByText("Welcome to GarageBook")).toBeInTheDocument();
});

test("renders vehicle management card", () => {
  render(<LandingPage />);
  expect(screen.getByText("Vehicle Management")).toBeInTheDocument();
  expect(screen.getByTestId("car-icon")).toBeInTheDocument();
});

test("renders service history card", () => {
  render(<LandingPage />);
  expect(screen.getByText("Service History")).toBeInTheDocument();
  expect(screen.getByTestId("tool-icon")).toBeInTheDocument();
});

test("renders expense tracking card", () => {
  render(<LandingPage />);
  expect(screen.getByText("Expense Tracking")).toBeInTheDocument();
  expect(screen.getByTestId("money-icon")).toBeInTheDocument();
});

test("button click logs to console", () => {
  console.log = jest.fn();
  render(<LandingPage />);
  const button = screen.getByTestId("get-started-button");
  fireEvent.click(button);
  expect(console.log).toHaveBeenCalled();
});
