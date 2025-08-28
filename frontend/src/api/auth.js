import { DEMO_MODE } from "../config";

export async function login(data) {
  if (DEMO_MODE) {
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            token: "demo-token-123",
            user: { id: "u_demo", name: "Demo User", email: data.email },
          }),
        400
      )
    );
  }
  throw new Error("Backend not connected");
}

