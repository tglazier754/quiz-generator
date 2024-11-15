
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { RefObject, useState } from "react";

export type SignInError = {
    message: string;
    code: number;
}

type useUserAuthenticationReturnType = {
    signInWithEmail: () => void;
    signInWithGoogle: () => Promise<void>;
    signUpWithEmail: () => void;
    error: boolean;
    errorMessage: string;
}

//TODO: Rename this
export function useUserAuthentication<useUserAuthenticationReturnType>(emailRef: RefObject<HTMLInputElement>, passwordRef: RefObject<HTMLInputElement>) {

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    async function handleSignInWithEmail() {
        setErrorMessage("");
        setError(false);
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const supabase = createClient();
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email || "",
            password: password || ""
        })
        if (error) {
            setError(true);
            setErrorMessage(error.message);
        }
        else {
            //TODO: Check the user data and either redirect to the library or to the info gathering
            router.push("/library");
        }
    }


    async function handleSignUpWithEmail() {

        setErrorMessage("");
        setError(false);
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const supabase = createClient();
        const { data, error } = await supabase.auth.signUp({
            email: email || "",
            password: password || "",
            options: {
                emailRedirectTo: 'http://localhost:3000/api/auth/callback'
            },
        });
        if (error) {
            setError(true);
            setErrorMessage(error.message);
        }
        else {
            router.push("/verify");
        }
    }

    //redirectTo: 'http://quiz-generator-beta.vercel.app/api/auth/callback'

    async function handleSignInWithGoogle() {

        setErrorMessage("");
        setError(false);
        const supabase = createClient();
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                queryParams: {
                    access_type: '',
                    prompt: 'consent',
                },
                redirectTo: 'http://localhost:3000/api/auth/callback'
            },
        })
    }


    return { signInWithGoogle: handleSignInWithGoogle, signInWithEmail: handleSignInWithEmail, signUpWithEmail: handleSignUpWithEmail, error, errorMessage }

}