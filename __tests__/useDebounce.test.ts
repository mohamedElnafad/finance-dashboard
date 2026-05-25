import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "@/hooks/useDebounce";
import { describe, it, expect, jest } from "@jest/globals";

jest.useFakeTimers();

describe("useDebounce", () => {
  it("should return initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));
    expect(result.current).toBe("initial");
  });

  it("should not update value before delay", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: "initial" } },
    );

    rerender({ value: "updated" });
    expect(result.current).toBe("initial");
  });

  it("should update value after delay", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: "initial" } },
    );

    rerender({ value: "updated" });
    act(() => jest.advanceTimersByTime(500));
    expect(result.current).toBe("updated");
  });

  it("should only use latest value when updated multiple times", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: "initial" } },
    );

    rerender({ value: "first" });
    rerender({ value: "second" });
    rerender({ value: "third" });

    act(() => jest.advanceTimersByTime(500));
    expect(result.current).toBe("third");
  });
});
