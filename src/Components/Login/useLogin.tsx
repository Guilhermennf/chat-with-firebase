// useLogin.js
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../firebase";
import { useState } from "react";

export default function useLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [isValidEmail, setIsValidEmail] = useState(true);

    const validateEmail = (inputEmail: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(inputEmail);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        validateEmail(newEmail);
    };

    const handleEmailSignIn = () => {
        handleEmailLogin(email, password);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    async function handleEmailLogin(email: string, password: string) {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setErrorMessage(
                "Invalid credentials. Check your email and password."
            );

            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
        }
    }

    async function handleCreateAccount() {
        if (!validateEmail(email)) {
            setIsValidEmail(false);
            setErrorMessage("Please enter a valid email.");

            setTimeout(() => {
                setErrorMessage("");
                setIsValidEmail(true);
            }, 5000);

            return;
        }

        if (password.length <= 5) {
            setErrorMessage("Password must be at least 6 characters long.");

            setTimeout(() => {
                setErrorMessage("");
            }, 5000);

            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setErrorMessage(
                "An error occurred while creating the account. Try again later."
            );

            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
        }
    }

    async function handleGoogleLogin() {
        const provider = new GoogleAuthProvider();

        try {
            await signInWithPopup(auth, provider);
        } catch (err) {
            return;
        }
    }

    return {
        email,
        setEmail,
        password,
        setPassword,
        login,
        setLogin,
        showPassword,
        setShowPassword,
        errorMessage,
        setErrorMessage,
        isValidEmail,
        setIsValidEmail,
        handleEmailChange,
        handleEmailSignIn,
        togglePasswordVisibility,
        handleEmailLogin,
        handleCreateAccount,
        handleGoogleLogin,
    };
}
