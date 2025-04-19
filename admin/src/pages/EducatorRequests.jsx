import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";

const EducatorList = () => {
  const { getToken } = useAuth();

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/admin/all-requests");
      if (response.data.success) {
        setUsers(response.data.users.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const updateRoleToEducator = async (userId) => {
    try {
      const token = await getToken();
      const response = await axios.put(
        // Changed from get to put
        backendUrl + `/api/admin/update-role/${userId}`,
        {}, // empty body since we're not sending data
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("User role updated to educator");
        await fetchUsers();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <p className="text-2xl font-semibold text-gray-800">
          Educators Requests
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr] items-center py-3 px-4 border-b bg-gray-100 text-gray-700 text-base rounded-lg shadow-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Email</b>
          <b className="text-center">Actions</b>
        </div>

        {users.map((user, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr_1fr] items-center gap-4 py-2 px-4 border bg-white rounded-lg shadow-sm hover:shadow-md transition duration-300"
            key={index}
            style={{ backgroundColor: "#E2E9EC" }}
          >
            <img
              className="w-16 h-16 object-cover rounded-lg"
              src={user.imageUrl || "https://via.placeholder.com/150"}
              alt={user.name}
            />
            <p className="text-gray-800">{user.name}</p>
            <p className="text-gray-600">{user.email}</p>

            <div className="flex justify-center">
              <button
                onClick={() => updateRoleToEducator(user.id)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Approve
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EducatorList;
