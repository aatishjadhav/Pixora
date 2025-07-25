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
  );
};
export default SignIn;
