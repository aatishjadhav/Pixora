import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-[70vh]">
      <div
        className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
