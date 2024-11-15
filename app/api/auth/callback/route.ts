import { TABLE_USERS } from "@/types/constants";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    const supabase = createClient();

    if (code) {
        const exchangedToken = await supabase.auth.exchangeCodeForSession(code);
    }

    const { data: userAuthData, error: userAuthError } = await supabase.auth.getUser();
    console.log(userAuthData);

    if (userAuthError) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (userAuthData) {
        //get user data from database
        const { data: profile, error: profileError } = await supabase.from(TABLE_USERS).select().eq("id", userAuthData.user.id);
        const currentProfile = profile && profile[0];

        if (currentProfile && currentProfile.complete) {
            //there is an existing user record for this user and their profile is complete
            return NextResponse.redirect(new URL("/library", req.url));
        }
        if ((currentProfile && !currentProfile.complete) || !currentProfile) {
            //user profile not created, redirect the user to the signup page
            return NextResponse.redirect(new URL("/signup", req.url));
        }
        else {
            //there was some sort of error
            return NextResponse.redirect(new URL("/login", req.url));
        }


    }

}