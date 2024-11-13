
import { createClient } from "@/utils/supabase/client";
import { AuthTokenResponsePassword } from "@supabase/supabase-js";
import { RefObject, useState } from "react";

export type SignInError = {
    message: string;
    code: number;
}

type useUserAuthenticationReturnType = {
    signInWithEmail: () => void;
    signInWithGoogle: () => Promise<void>;
    error: boolean;
    errorMessage: string;
}

//TODO: Rename this
export function useUserAuthentication<useUserAuthenticationReturnType>(emailRef: RefObject<HTMLInputElement>, passwordRef: RefObject<HTMLInputElement>) {

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSignInWithEmail() {
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
    }


    async function handleUserSignUpWithEmail() {
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
    }

    //redirectTo: 'http://quiz-generator-beta.vercel.app/api/auth/callback'

    async function handleSignInWithGoogle() {
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


    return { signInWithGoogle: handleSignInWithGoogle, signInWithEmail: handleSignInWithEmail, error, errorMessage }

}