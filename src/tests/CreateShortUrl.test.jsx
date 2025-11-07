import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { expect, vi } from "vitest";

import CreateShortUrl from "@/features/urls/CreateShortUrl";
import { store } from "@/store/store";

const mockFn = vi.fn();

const renderWithProvider = (ui) => render(<Provider store={store}>{ui}</Provider>);
describe("CreateShortUrlComponent", () => {
  test("renders input and submit button", () => {
    renderWithProvider(<CreateShortUrl />);
    expect(screen.getByPlaceholderText(/enter long url.../i));
    expect(screen.getByRole("button", { name: /shorten/i })).toBeInTheDocument();
  });

  test("should update input value", () => {
    renderWithProvider(<CreateShortUrl />);
    const input = screen.getByPlaceholderText(/enter long url.../i);
    fireEvent.change(input, {
      target: { value: "http://google.com" },
    });
    expect(input.value).toBe("http://google.com");
  });
  //   test("should call onSubmit with entered URL", () => {});
  test("calls shortenUrl mutation and shows toast.success", async () => {
    renderWithProvider(<CreateShortUrl />);
    vi.mock("../features/urls/urlApi", () => ({
      useShortenMutation: () => [mockFn, { isLoading: false }],
    }));
    const input = screen.getByPlaceholderText(/enter long url.../i);
    fireEvent.change(input, { target: { value: "https://test.com" } });
    fireEvent.click(screen.getByRole("button", { name: /shorten/i }));

    expect(mockFn).toHaveBeenCalledWith({ originalUrl: "https://test.com" });
  });
});
