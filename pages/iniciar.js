import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "@/components/Spinner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const routerRef = useRef();
  routerRef.current = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      routerRef.current.push("/");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post("/api/auth", { email, password });
      setMessage(response.data.message);

      const token = response.data.token;
      localStorage.setItem("token", token);
      setIsLoading(false);

      routerRef.current.push("/");
    } catch (error) {
      setMessage(error.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-96 mx-auto">
      <div className="bg-white rounded-lg p-6 w-full mx-auto sm:shadow-lg">
        <h1 className="text-3xl font-light text-center mb-4">Iniciar Sesión</h1>
        <div className="h-px bg-gray-400"></div>
        <div className="mb-4 mt-10">
          <label className="block text-gray-600 text-lg font-medium mb-1">
            Email
          </label>
          <input
            type="text"
            className="w-full border-gray-300 py-3 px-2 rounded-md outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-lg font-medium mb-1">
            Contraseña
          </label>
          <input
            type="password"
            className="w-full border-gray-300 py-3 px-2 rounded-md outline-none"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {message && <p className="text-gray-500 mt-2">{message}</p>}
      </div>
      <div className="w-full px-4 py-10 sm:px-2">
        <button
          className="bg-primary w-full text-white text-lg h-11 py-2 px-4 rounded-md hover:bg-cyan-600 transition-all"
          onClick={handleLogin}
        >
          {isLoading ? (
            <div className="flex justify-center items-center w-full h-full">
              <Spinner />
            </div>
          ) : (
            "Iniciar"
          )}
        </button>
      </div>
    </div>
  );
}
