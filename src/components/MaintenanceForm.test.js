import "@testing-library/jest-dom";
import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MaintenanceForm from "./MaintenanceForm";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { expect } from "@jest/globals";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

it("renders without crashing", () => {
  render(<MaintenanceForm />);
});

it("renders all fields", () => {
  render(<MaintenanceForm />);

  expect(screen.getByTestId("maintenance-type-combo-box")).toBeInTheDocument();
  expect(screen.getByTestId("mileage-field")).toBeInTheDocument();
  expect(
    screen.getByRole("textbox", { name: /service date/i })
  ).toBeInTheDocument();
  expect(screen.getByTestId("city-field")).toBeInTheDocument();
  expect(screen.getByTestId("state-field")).toBeInTheDocument();
  expect(screen.getByTestId("notes-field")).toBeInTheDocument();
});

it("allows user to select from the maintenance type field", async () => {
  render(<MaintenanceForm />);

  expect(screen.queryByText("Oil Change")).not.toBeInTheDocument();
  const autocomplete = screen.getByTestId("maintenance-type-combo-box");
  const input = within(autocomplete).getByRole("combobox");
  userEvent.click(input);
  userEvent.type(input, "Oil Change");
  const option = await screen.findByText("Oil Change");
  userEvent.click(option);
  await userEvent.click(input);
  await delay(1000); // delay for value to be updated
  expect(input).toHaveValue("Oil Change");
});

it("allows user to type in the mileage field", async () => {
  render(<MaintenanceForm />);

  const input = screen.getByTestId("mileage-field").querySelector("input");
  expect(input).toBeInTheDocument();
  fireEvent.change(input, { target: { value: "123456" } });
  expect(input.value).toBe("123456");
});

test("allows user to type a date", async () => {
  render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MaintenanceForm />
    </LocalizationProvider>
  );

  const input = screen.getByRole("textbox", { name: /service date/i });
  fireEvent.mouseDown(input);
  await userEvent.type(input, "01011999");
  fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
  expect(input).toHaveValue("01/01/1999");
});

it("allows user to type in the city field", async () => {
  render(<MaintenanceForm />);

  const input = screen.getByTestId("city-field").querySelector("input");
  expect(input).toBeInTheDocument();
  fireEvent.change(input, { target: { value: "San Diego" } });
  expect(input.value).toBe("San Diego");
});

it("allows user to type in the state field", async () => {
  render(<MaintenanceForm />);

  const input = screen.getByTestId("state-field").querySelector("input");
  expect(input).toBeInTheDocument();
  fireEvent.change(input, { target: { value: "CA" } });
  expect(input.value).toBe("CA");
});

it("allows user to type in the notes field", async () => {
  render(<MaintenanceForm />);

  const input = screen.getByTestId("notes-field");
  expect(input).toBeInTheDocument();
  await userEvent.type(input, "Cost was $40");
  expect(input.value).toBe("Cost was $40");
});

it("disables the submit button when no selections are made", async () => {
  render(<MaintenanceForm handleClose={console.log} />);

  const button = screen.getByTestId("submit-button");
  expect(button).toBeEnabled();
  fireEvent.click(button);
  expect(button).toBeDisabled();
});
