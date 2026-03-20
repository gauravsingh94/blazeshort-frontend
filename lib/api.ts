import { post } from "./method";
import { routes } from "./routes";

export type SignupResponse = {
  message: string;
};

export type LoginResponse = {
  data: {
    token: string;
  };
  status: number;
};

export type CreateUrlResponse = {
    createdAt: string;
    expiresAt: string;
    originalUrl: string;
    shortCode: string;
    status: string;
};

export const api = {

  signup: async (
    email: string,
    password: string,
  ): Promise<SignupResponse | null> => {
    
    try {
      // @ts-ignore
      const response: SignupResponse = await post(routes.auth.signup, {
        email,
        password,
        role: "USER",
      });
      console.log("Response:", response);
      return response;
    } catch (error: any) {
      console.error("Signup failed:", error.response?.data);
      throw new Error(error.response?.data?.message || 'Signup failed');
    }
  },
  login: async (
    email: string,
    password: string,
  ): Promise<LoginResponse | null> => {
    try {
      // @ts-ignore
      const response: LoginResponse = await post(routes.auth.login, {
        email,
        password,
      });
      console.log("Login Response:", response);
      return response;
    } catch (error: any) {
      console.error("Login failed:", error.response?.data);
      throw new Error(error.response?.data?.message || 'Login failed');
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
      throw new Error(error.response?.data?.message || 'Create URL failed');
    }
  },
};
