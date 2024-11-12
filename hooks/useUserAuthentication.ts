
import { createClient } from "@/utils/supabase/client";
import { RefObject, useState } from "react";

export type SignInError = {
    message: string;
    code: number;
}

type useUserAuthenticationReturnType = {
    signIn: (method: "GOOGLE" | "EMAIL") => void | SignInError;
}

//TODO: Rename this
export function useUserAuthentication<useUserAuthenticationReturnType>(emailRef: RefObject<HTMLInputElement>, passwordRef: RefObject<HTMLInputElement>) {

    async function handleSignInWithEmail() {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        console.log(email);
        console.log(password);
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


    const signIn = async (method: "GOOGLE" | "EMAIL") => {
        console.log(method);

        switch (method) {
            case "GOOGLE":
                await handleSignInWithGoogle();
                break;
            case "EMAIL":
                await handleSignInWithEmail();
                break;
            default:
                console.log("No sign in method specified.");
        }

    }

    return { signIn }

}