import React from "react";
import { render, fireEvent } from "@testing-library/react";
import FavoriteNumber from ".";

test('renders a number input with a label "Favorite Number"', () => {
  const { getByLabelText } = render(<FavoriteNumber />);
  const input = getByLabelText(/favorite number/i);
  expect(input).toHaveAttribute("type", "number");
});

test("entering an invalid value shows an error message", () => {
  const { getByLabelText, getByRole } = render(<FavoriteNumber />);
  const input = getByLabelText(/favorite number/i);
  fireEvent.change(input, { target: { value: "10" } });
  expect(getByRole("alert")).toHaveTextContent(/the number is invalid/i);
});
