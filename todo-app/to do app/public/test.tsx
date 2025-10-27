import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import App from "./App";

test("renders welcome message", () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to the App!/i);
  expect(linkElement).toBeInTheDocument();
});     