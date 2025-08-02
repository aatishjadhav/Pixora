const SignIn = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${
      import.meta.env.VITE_SERVER_BASE_AUTH_URL
    }/auth/google`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-3xl font-bold">Welcome to Pixora</h1>
      <button
        onClick={handleGoogleLogin}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Sign in with Google
      </button>
    </div>
    // <div
    //   className="flex flex-col items-center justify-center min-h-screen space-y-4 bg-cover bg-center bg-no-repeat relative"
    //   style={{
    //     backgroundImage:
    //       "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80')",
    //   }}
    // >
    //   {/* Overlay */}
    //   <div className="absolute inset-0 bg-opacity-60"></div>

    //   {/* Content */}
    //   <div className="relative z-10 text-center text-white">
    //     <h1 className="text-4xl font-bold mb-4">Welcome to Pixora</h1>
    //     <button
    //       onClick={handleGoogleLogin}
    //       className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded shadow-lg"
    //     >
    //       Sign in with Google
    //     </button>
    //   </div>
    // </div>
  );
};
export default SignIn;
