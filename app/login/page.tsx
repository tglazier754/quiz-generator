"use client"
import { createClient } from "@/utils/supabase/client";
import { Button, Text } from "@chakra-ui/react";

export default function Login() {

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


    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh"
            }}>
            <div>
                <Text> Quiz Generator </Text>
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }} className="p-6">
                    <Text variant="body1">Sign in or Sign up using Google to Continue.</Text>
                    <Button variant="outlined" onClick={handleSignInWithGoogle}>Authenticate with Google</Button>
                </div>
            </div>

        </div>
    );
}