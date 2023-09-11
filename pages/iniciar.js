import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "@/components/Spinner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true)
      const response = await axios.post("/api/auth", { email, password });
      setMessage(response.data.message);

      const token = response.data.token;
      localStorage.setItem("token", token);
      setIsLoading(false)

      router.push("/");
    } catch (error) {
      setMessage(error.response.data.message);
      setIsLoading(false)
    }
  };

  return (
    <div className="flex flex-col justify-between md:justify-center items-center h-screen md:w-96 md:mx-auto">
      <div className="bg-white rounded-lg p-6 w-full mx-auto md:shadow-lg">
        <h1 className="text-2xl font-light text-center mb-4">Iniciar Sesión</h1>
        <div className="h-px bg-gray-400"></div>
        <div className="mb-4 mt-10">
          <label className="block text-gray-600 text-lg font-medium mb-1">
            Email
          </label>
          <input
            type="text"
            className="w-full border-gray-300 py-2 px-2 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-300"
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
            className="w-full border-gray-300 py-2 px-2 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-300"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {message && <p className="text-gray-500 mt-2">{message}</p>}
      </div>
      <div className="w-full p-6 md:px-2">
        <button
          className="bg-primary w-full text-white text-lg h-11 py-2 px-4 rounded-md hover:bg-cyan-600 transition-all"
          onClick={handleLogin}
        >
          {isLoading ? (
            <div className="flex justify-center items-center w-full h-full">
               <Spinner />
            </div>
          ) : (
            'Iniciar'
          )}
        </button>
      </div>
    </div>
  );
}
