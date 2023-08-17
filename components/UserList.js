import axios from "axios";
import { useState } from "react";

function UserList({ users }) {
    const [userList, setUserList] = useState(users);

  async function deleteUser(user) {
    const nameId = user.nameId;
    try {
      await axios.delete(`/api/createUser?userId=${nameId}`);
      const updatedUserList = userList.filter(u => u.nameId !== nameId);
      setUserList(updatedUserList);
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  }

  return (
    <div className="flex flex-col items-center mt-5">
      <h1 className="bg-white w-full text-center py-2 rounded text-xl font-medium mb-4">
        Usuarios de Tenis
      </h1>
      <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {userList.map((user, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-gray-500">Documento: {user.nameId}</p>
            <p className="text-gray-500">Rol: {user.role}</p>
            <div className="flex flex-row justify-center items-center mt-2">
              <button
                onClick={() => deleteUser(user)}
                className="bg-red-400 hover:bg-red-500 text-white py-1 px-4 rounded transition duration-300 ease-in-out"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
