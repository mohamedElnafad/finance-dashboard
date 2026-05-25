import { render, screen, fireEvent } from "@testing-library/react";
import AuthInput from "@/components/auth/AuthInput";
import { describe, it, expect, jest } from "@jest/globals";

describe("AuthInput", () => {
  it("should render label and input", () => {
    render(
      <AuthInput
        label="Email"
        type="email"
        placeholder="you@example.com"
        value=""
        onChange={() => {}}
      />,
    );

    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument();
  });

  it("should render correct input type", () => {
    render(
      <AuthInput
        label="Password"
        type="password"
        placeholder="••••••••"
        value=""
        onChange={() => {}}
      />,
    );

    const input = screen.getByPlaceholderText("••••••••");
    expect(input).toHaveAttribute("type", "password");
  });

  it("should call onChange when user types", () => {
    const handleChange = jest.fn();

    render(
      <AuthInput
        label="Email"
        type="email"
        placeholder="you@example.com"
        value=""
        onChange={handleChange}
      />,
    );

    const input = screen.getByPlaceholderText("you@example.com");
    fireEvent.change(input, { target: { value: "test@gmail.com" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("should display the correct value", () => {
    render(
      <AuthInput
        label="Email"
        type="email"
        placeholder="you@example.com"
        value="mohamed@gmail.com"
        onChange={() => {}}
      />,
    );

    const input = screen.getByPlaceholderText("you@example.com");
    expect(input).toHaveValue("mohamed@gmail.com");
  });
});
