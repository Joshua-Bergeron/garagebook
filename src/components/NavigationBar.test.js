import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NavigationBar from "./NavigationBar";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push: () => null,
    };
  },
}));

it("renders without crashing", () => {
  act(() => {
    render(<NavigationBar />);
  });
});

it("renders all fields", async () => {
  await act(async () => {
    render(<NavigationBar />);
  });

  expect(screen.getByTestId("garage-icon")).toBeInTheDocument();
  expect(screen.getByTestId("title-text")).toBeInTheDocument();
  expect(screen.getByTestId("vehicles-link")).toBeInTheDocument();
  expect(screen.getByTestId("avatar-icon")).toBeInTheDocument();

  const profile = screen.getByTestId("avatar-icon");
  await act(async () => {
    userEvent.click(profile);
  });

  expect(await screen.findByTestId("account-link")).toBeInTheDocument();
  expect(await screen.findByTestId("logout-link")).toBeInTheDocument();
});

it("calls function when account link is clicked", async () => {
  console.log = jest.fn();
  await act(async () => {
    render(<NavigationBar />);
  });

  const profile = screen.getByTestId("avatar-icon");
  await act(async () => {
    userEvent.click(profile);
  });

  const button = await screen.findByTestId("account-link");
  expect(button).toBeInTheDocument();
  await act(async () => {
    fireEvent.click(button);
  });

  expect(console.log).toHaveBeenCalledTimes(1);
});

it("calls function when logout link is clicked", async () => {
  console.log = jest.fn();
  await act(async () => {
    render(<NavigationBar />);
  });

  const profile = screen.getByTestId("avatar-icon");
  await act(async () => {
    userEvent.click(profile);
  });

  const button = await screen.findByTestId("logout-link");
  expect(button).toBeInTheDocument();
  await act(async () => {
    fireEvent.click(button);
  });

  expect(console.log).toHaveBeenCalledTimes(1);
});
