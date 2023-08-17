import Layout from "@/components/Layout";
import { useState } from "react";
import axios from "axios";

function UsersPage() {
  const [userName, setUserName] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/createUser", {
        userName,
        documentNumber,
        password,
        userRole,
      });

      setMessage(response.data.message);
      setUserName("");
      setDocumentNumber("");
      setPassword("");
      setUserRole("");
    } catch (error) {
      setMessage("Error al registrar el usuario.");
    }
  };

  return (
    <Layout>
      <div className="listWidth bg-white p-6 rounded-md shadow-md mt-5">
        <h3 className="text-xl font-semibold mb-4">Crear un nuevo usuario</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Nombre:
            </label>
            <input
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              N° de Documento:
            </label>
            <input
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              type="number"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Contraseña:
            </label>
            <input
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Rol del Usuario:
            </label>
            <input
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              type="text"
              placeholder="( tenis, aero, camping )"
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
            />
          </div>
          <button
            className="py-2 px-4 w-full bg-blue-400 text-white rounded-md hover:bg-blue-500 transition duration-300"
            type="submit"
          >
            Guardar
          </button>
        </form>
        {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
      </div>
    </Layout>
  );
}

export default UsersPage;
