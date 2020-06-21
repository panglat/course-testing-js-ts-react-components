import React from "react";
import { render } from "@testing-library/react";
import App from ".";

test("renders app text", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/app/i);
  expect(linkElement).toBeInTheDocument();
});
