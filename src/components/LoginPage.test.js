import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "./LoginPage";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

it("renders without crashing", () => {
  render(<LoginPage onSubmit={jest.fn()} onCancel={jest.fn()} />);

  expect(screen.getByText("Sign in to GarageBook")).toBeInTheDocument();
  expect(screen.getByTestId("email-input")).toBeInTheDocument();
  expect(screen.getByTestId("password-input")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Log in" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
});

it("calls function on submit button click", () => {
  const mockSubmit = jest.fn();
  render(<LoginPage onSubmit={mockSubmit} onCancel={jest.fn()} />);

  const button = screen.getByRole("button", { name: "Log in" });
  fireEvent.click(button);
  expect(mockSubmit).toHaveBeenCalledTimes(1);
});

it("calls function on cancel button click", () => {
  const mockCancel = jest.fn();
  render(<LoginPage onSubmit={jest.fn()} onCancel={mockCancel} />);

  const button = screen.getByRole("button", { name: "Cancel" });
  fireEvent.click(button);
  expect(mockCancel).toHaveBeenCalledTimes(1);
});
