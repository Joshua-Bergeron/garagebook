import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "./LoginForm";

it("renders without crashing", () => {
  render(<LoginForm />);

  expect(
    screen.getByText("Please log in to your account to access your garage.")
  ).toBeInTheDocument();
  expect(screen.getByTestId("email-input")).toBeInTheDocument();
  expect(screen.getByTestId("password-input")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Log in" })).toBeInTheDocument();
  expect(screen.getByTestId("cancel-button")).toBeInTheDocument();
});

it("calls function on submit button click", () => {
  const mockFunction = jest.fn();
  render(<LoginForm onSubmit={mockFunction} />);

  const button = screen.getByRole("button", { name: "Log in" });
  fireEvent.click(button);
  expect(mockFunction).toHaveBeenCalledTimes(1);
});

it("calls function on cancel button click", () => {
  const mockFunction = jest.fn();
  render(<LoginForm onCancel={mockFunction} />);

  const button = screen.getByRole("button", { name: "Cancel" });
  fireEvent.click(button);
  expect(mockFunction).toHaveBeenCalledTimes(1);
});
