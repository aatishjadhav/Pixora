import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const GoogleProfile = () => {
  const { user, fetchProfile } = useContext(AuthContext);

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      {user ? (
        <div className="text-center space-y-4">
          <img
            src={user.picture}
            alt={user.name}
            className="w-24 h-24 rounded-full mx-auto border"
          />
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <div className="flex flex-col justify-center">
            <p className="text-xl mb-4 text-center">
              Hello {user?.name || user?.email} you&apos;ve
              <br /> logged in with{" "}
              <span className="italic text-neutral-400">{user?.email}</span>
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center">Loading profile...</p>
      )}
    </div>
  );
};
export default GoogleProfile;
