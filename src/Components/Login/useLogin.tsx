import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase";

export default function useLogin() {
    async function handleGoogleLogin() {
        const provider = new GoogleAuthProvider();

        try {
            await signInWithPopup(auth, provider);
        } catch (err) {
            console.log(err);
        }
    }
    return {
        handleGoogleLogin,
    };
}
