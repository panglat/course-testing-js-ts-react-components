import React from "react";
import { render } from "@testing-library/react";
import App from ".";

test("should fail", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/nothing/i);
  expect(linkElement).toBeInTheDocument();
});
