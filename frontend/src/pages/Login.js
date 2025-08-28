import { useState } from "react";
// import { login } from "../src/api/auth";  // Backend abhi nahi hai

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dummy response (Demo Mode)
      const res = {
        token: "demo-token-123",
        user: { name: "Demo User", email },
      };

      localStorage.setItem("token", res.token);
      alert(`Logged in as ${res.user.name} (Demo Mode)`);
    } catch (err) {
      alert("Login failed (demo mode)");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h1 className="text-xl mb-4">Login</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-2 w-full mb-2"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="border p-2 w-full mb-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Login
      </button>
    </form>
  );
}
