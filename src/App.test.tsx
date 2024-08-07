import App from "./App.tsx";
import { render, screen } from "@testing-library/react";

describe('App', () => {
  it('renders the "Submit" button initially', () => {
    render(<App />);

    const buttonElement = screen.getByRole('button');

    expect(buttonElement).toBeInTheDocument();
  });
});
