import { get, post } from "./method";
import { routes } from "./routes";

export type SignupResponse = {
  message: string;
};

export const api = {
  signup: async (
    email: string,
    password: string,
  ): Promise<SignupResponse | null> => {
    try {
      // include role in body
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
};
