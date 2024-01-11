import useLogin from "./useLogin";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
    const {
        email,
        password,
        setPassword,
        login,
        setLogin,
        showPassword,
        errorMessage,
        isValidEmail,
        handleEmailChange,
        handleEmailSignIn,
        togglePasswordVisibility,
        handleCreateAccount,
        handleGoogleLogin,
    } = useLogin();

    return (
        <div className="flex items-center justify-center dark:bg-gray-900 flex-col max-w-[500px] w-full mx-auto p-8 rounded-lg">
            <h1 className="text-3xl dark:text-white font-bold text-center my-5">
                {login ? "Login to your account" : "Create an account"}
            </h1>
            <div className="flex flex-col mb-4 w-full">
                <label className="text-white">Email</label>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    className={`px-4 py-2 border rounded-lg w-full ${
                        isValidEmail
                            ? "border-slate-200 dark:border-slate-700"
                            : "border-red-500"
                    }`}
                />
            </div>
            <div className="flex flex-col mb-4 w-full">
                <label className="text-white">Password</label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg w-full"
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute top-[20px] right-3 transform -translate-y-1/2 focus:outline-none"
                    >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                    </button>
                </div>
            </div>

            <div className="flex flex-col items-center w-full">
                {login ? (
                    <>
                        {errorMessage && errorMessage.length > 0 && (
                            <div className="text-red-500 mb-2">
                                {errorMessage}
                            </div>
                        )}
                        <button
                            onClick={handleEmailSignIn}
                            disabled={
                                !isValidEmail ||
                                email.length === 0 ||
                                password.length === 0
                            }
                            className="px-4 py-2 mb-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150 w-full"
                        >
                            Login now
                        </button>

                        <button
                            onClick={handleGoogleLogin}
                            className="px-4 py-2 mb-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150 w-full justify-center"
                        >
                            <img
                                className="w-6 h-6"
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                loading="lazy"
                                alt="google logo"
                            />
                            <span>Login with Google</span>
                        </button>
                        <span className="text-white">
                            Don't have an account?{" "}
                            <button
                                className="underline text-blue-500 hover:text-blue-700 cursor-pointer focus:outline-none"
                                onClick={() => setLogin(false)}
                            >
                                Sign Up
                            </button>
                        </span>
                    </>
                ) : (
                    <>
                        {errorMessage && errorMessage.length > 0 && (
                            <div className="text-red-500 mb-2">
                                {errorMessage}
                            </div>
                        )}
                        <button
                            onClick={handleCreateAccount}
                            disabled={
                                !isValidEmail ||
                                email.length === 0 ||
                                password.length === 0
                            }
                            className="px-4 py-2 mb-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150 w-full justify-center"
                        >
                            <span>Create an account</span>
                        </button>

                        <span className="text-white">
                            Already have an account?{" "}
                            <button
                                className="underline text-blue-500 hover:text-blue-700 cursor-pointer focus:outline-none"
                                onClick={() => setLogin(true)}
                            >
                                Log in
                            </button>
                        </span>
                    </>
                )}
            </div>
        </div>
    );
}
