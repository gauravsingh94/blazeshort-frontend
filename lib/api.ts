import { get, patch, post } from "./method";
import { routes } from "./routes";

export type SignupResponse = {
  message: string;
};
export type ToggleStatus = "ACTIVE" | "DISABLED";

export type LoginResponse = {
    token: string;
  status: number;
};

export type CreateUrlResponse = {
  createdAt: string;
  expiresAt: string;
  originalUrl: string;
  shortCode: string;
  status: ToggleStatus;
};

export const api = {
  signup: async (
    email: string,
    password: string,
  ): Promise<SignupResponse | null> => {
    try {
      const response = await post(routes.auth.signup, {
        email,
        password,
        role: "USER",
      });
      console.log("Response:", response);
      return response.data;
    } catch (error: any) {
      console.error("Signup failed:", error.response?.data);
      throw new Error(
        error.response?.data?.message ||
          "Unable to create account. Please try again.",
      );
    }
  },
  login: async (
    email: string,
    password: string,
  ): Promise<LoginResponse | null> => {
    try {
      const response = await post(routes.auth.login, {
        email,
        password,
      });
      console.log("Login Response:", response);
      return response.data;
    } catch (error: any) {
      console.error("Login failed:", error.response?.data);
      throw new Error(
        error.response?.data?.message ||
          "Authentication failed. Please check your credentials and try again.",
      );
    }
  },
  createUrl: async (
    originalUrl: string,
    expiresAt: string,
  ): Promise<CreateUrlResponse> => {
    try {
      const response = await post(routes.url.create, {
        originalUrl,
        expiresAt,
      });
      return response.data;
    } catch (error: any) {
      console.error("Create URL failed:", error.response?.data);
      throw new Error(
        error.response?.data?.message ||
          "Failed to create shortened URL. Please try again.",
      );
    }
  },
  getAllUrls: async () => {
    try {
      const response = await get(routes.url.myUrls);
      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch URLs:", error.response?.data);
      throw new Error("Unable to retrieve your URLs. Please try again.");
    }
  },
  toggleUrl: async (id: string, status: ToggleStatus) => {
    try {
      const response = await (status === "ACTIVE"
        ? patch(routes.url.enable(id))
        : patch(routes.url.disable(id)));
      return response.data;
    } catch (error: any) {
      console.error("Toggle URL failed:", error.response?.data);
      throw new Error(
        `Failed to ${status.toLowerCase()} URL. Please try again.`,
      );
    }
  },
};
