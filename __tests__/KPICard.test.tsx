import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, jest } from "@jest/globals";

import KPICard from "@/components/dashboard/KPICard";

describe("KPICard", () => {
  it("should render title and value", () => {
    render(
      <KPICard
        title="Total Balance"
        value="$12,450.00"
        trend="8.2%"
        trendUp={true}
      />,
    );

    expect(screen.getByText("Total Balance")).toBeInTheDocument();
    expect(screen.getByText("$12,450.00")).toBeInTheDocument();
  });

  it("should show green color when trendUp is true", () => {
    render(
      <KPICard
        title="Total Balance"
        value="$12,450.00"
        trend="8.2%"
        trendUp={true}
      />,
    );

    const trend = screen.getByText(/8.2%/);
    expect(trend).toHaveClass("text-green-500");
  });

  it("should show red color when trendUp is false", () => {
    render(
      <KPICard
        title="Total Expenses"
        value="$1,890.00"
        trend="1.4%"
        trendUp={false}
      />,
    );

    const trend = screen.getByText(/1.4%/);
    expect(trend).toHaveClass("text-red-500");
  });

  it("should show up arrow when trendUp is true", () => {
    render(
      <KPICard
        title="Total Balance"
        value="$12,450.00"
        trend="8.2%"
        trendUp={true}
      />,
    );

    expect(screen.getByText(/↑/)).toBeInTheDocument();
  });
});
