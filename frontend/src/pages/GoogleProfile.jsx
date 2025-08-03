import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const GoogleProfile = () => {
  const { user, fetchProfile } = useContext(AuthContext);

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
      {user ? (
        <div className="flex flex-col items-center text-center space-y-5">
          <img
            src={user.picture}
            alt={user.name}
            className="w-28 h-28 rounded-full border-4 border-blue-200 shadow-md"
          />
          <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-gray-500 text-sm">{user.email}</p>

          <div className="bg-blue-50 text-blue-800 p-4 rounded-xl w-full">
            <p className="text-base">
              👋 Hello{" "}
              <span className="font-medium">{user.name || user.email}</span>,
              <br />
              You are logged in with{" "}
              <span className="italic">{user.email}</span>
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-600 text-lg">Loading profile...</p>
        </div>
      )}
    </div>
  );
};
export default GoogleProfile;
