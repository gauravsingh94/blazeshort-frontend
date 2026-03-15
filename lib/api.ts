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
};
