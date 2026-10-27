import { describe, expect, it } from "vitest";
import { getErrorMessage } from "./errorUtils";
import { AxiosError, type InternalAxiosRequestConfig } from "axios";

describe("getErrorMessage", () => {
  it("returns message from axios error response when present", () => {
    const error = new AxiosError("Request failed");
    error.response = {
      data: { message: "Invalid credentials" },
      status: 401,
      statusText: "Unauthorized",
      headers: {},
      config: {} as InternalAxiosRequestConfig,
    };
    expect(getErrorMessage(error, "Fallback")).toBe("Invalid credentials");
  });

  it("returns fallback when axios error has no response message", () => {
    const error = new AxiosError("Network Error");
    error.response = {
      data: {},
      status: 500,
      statusText: "Error",
      headers: {},
      config: {} as InternalAxiosRequestConfig,
    };
    expect(getErrorMessage(error, "Something went wrong")).toBe(
      "Something went wrong",
    );
  });

  it("returns fallback for non-axios errors", () => {
    expect(getErrorMessage(new Error("boom"), "Fallback")).toBe("Fallback");
    expect(getErrorMessage("string error", "Fallback")).toBe("Fallback");
    expect(getErrorMessage(null, "Fallback")).toBe("Fallback");
  });
});
